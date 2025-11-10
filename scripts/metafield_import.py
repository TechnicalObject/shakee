import csv
import requests
from pathlib import Path
import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local')
load_dotenv(env_path)

# Shopify credentials
API_VERSION = "2025-01"

CSV_FILE = "variant_images.csv"  # handle, sku, image_url

GRAPHQL_URL = f"https://{os.getenv('SHOP_URL')}/admin/api/{API_VERSION}/graphql.json"


def graphql_query(query, variables=None):
    """Send GraphQL query to Shopify"""
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": os.getenv('ACCESS_TOKEN'),
    }
    response = requests.post(GRAPHQL_URL, json={"query": query, "variables": variables or {}}, headers=headers)
    response.raise_for_status()
    return response.json()


def get_mime_type_from_url(url):
    """Determine MIME type from file extension"""
    extension = Path(url).suffix.lower()
    mime_types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp',
        '.tiff': 'image/tiff',
        '.tif': 'image/tiff'
    }
    return mime_types.get(extension, 'image/jpeg')


def get_staged_upload(filename, mime_type=None):
    """Request staged upload URL for file"""
    if mime_type is None:
        mime_type = get_mime_type_from_url(filename)
    
    query = """
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    variables = {
        "input": [
            {
                "filename": filename,
                "mimeType": mime_type,
                "resource": "IMAGE",
            }
        ]
    }
    result = graphql_query(query, variables)
    
    # Debug: Print the full response
    print("Staged upload response:", result)
    
    # Check for errors
    if "errors" in result:
        raise Exception(f"GraphQL errors: {result['errors']}")
    
    staged_uploads = result["data"]["stagedUploadsCreate"]
    
    # Check for user errors
    if staged_uploads.get("userErrors"):
        raise Exception(f"User errors: {staged_uploads['userErrors']}")
    
    # Check if stagedTargets exists and has items
    if not staged_uploads.get("stagedTargets") or len(staged_uploads["stagedTargets"]) == 0:
        raise Exception("No staged targets returned from Shopify")
    
    return staged_uploads["stagedTargets"][0]


def upload_to_staged_target(staged_target, file_content):
    """Upload file binary to Shopify's staged GCS bucket"""
    url = staged_target["url"]
    params = {p["name"]: p["value"] for p in staged_target["parameters"]}
    
    print(f"Upload URL: {url}")
    print(f"Parameters: {params}")
    
    # For Google Cloud Storage, we need to send the file as binary data
    # with the content-type header, not as multipart form data
    headers = {
        'Content-Type': params.get('content_type', 'image/png')
    }
    
    # Send as binary data, not form data
    response = requests.put(url, data=file_content, headers=headers)
    
    print(f"Response status: {response.status_code}")
    if response.status_code not in [200, 204]:
        print(f"Response text: {response.text}")
    
    response.raise_for_status()
    return staged_target["resourceUrl"]


def create_file_reference(resource_url):
    """Register uploaded file in Shopify as a file reference"""
    query = """
    mutation fileCreate($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files {
          id
          alt
          createdAt
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    variables = {
        "files": [
            {
                "alt": "Uploaded variant image",
                "contentType": "IMAGE",
                "originalSource": resource_url,
            }
        ]
    }
    result = graphql_query(query, variables)
    files = result["data"]["fileCreate"]["files"]
    if not files:
        raise Exception(result["data"]["fileCreate"]["userErrors"])
    return files[0]["id"]


def find_variant_id_by_sku(handle, sku):
    """Retrieve variant ID using handle and SKU"""
    query = """
    query($handle: String!) {
      productByHandle(handle: $handle) {
        variants(first: 100) {
          edges {
            node {
              id
              sku
            }
          }
        }
      }
    }
    """
    variables = {"handle": handle}
    result = graphql_query(query, variables)
    product = result["data"]["productByHandle"]
    if not product:
        print(f"Product not found: {handle}")
        return None

    for v in product["variants"]["edges"]:
        if v["node"]["sku"] == sku:
            return v["node"]["id"]
    print(f"Variant not found for SKU: {sku}")
    return None


def add_image_metafield(variant_id, file_id):
    """Attach uploaded image file as a metafield to the variant"""
    query = """
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
    """
    variables = {
        "metafields": [
            {
                "ownerId": variant_id,
                "namespace": "custom",
                "key": "variant_image_2",
                "type": "file_reference",
                "value": file_id,
            }
        ]
    }
    result = graphql_query(query, variables)
    errors = result["data"]["metafieldsSet"]["userErrors"]
    if errors:
        print("Error:", errors)
    else:
        print("✓ Metafield added successfully")


def process_csv():
    with open(CSV_FILE, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            handle = row["handle"]
            sku = row["sku"]
            image_url = row["image_url"]

            print(f"Processing {handle} - {sku} ...")
            variant_id = find_variant_id_by_sku(handle, sku)
            if not variant_id:
                continue

            # Download and upload image
            image_content = requests.get(image_url).content
            staged = get_staged_upload(Path(image_url).name)
            resource_url = upload_to_staged_target(staged, image_content)
            file_id = create_file_reference(resource_url)

            # Add metafield
            add_image_metafield(variant_id, file_id)
            print("-" * 40)


if __name__ == "__main__":
    process_csv()