# Shopify API credentials
API_VERSION = "2025-10"

import shopify
import os
from dotenv import load_dotenv
import csv
import requests
from pathlib import Path

env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.local')
load_dotenv(env_path)

# CSV file path
CSV_FILE = "variant_images.csv"  # Expected columns: handle, sku, image_url


def setup_shopify_session():
    """Initialize Shopify API session"""
    shop_url = f"https://{os.getenv('SHOP_URL')}"
    shopify.ShopifyResource.set_site(shop_url)
    shopify.ShopifyResource.set_user(os.getenv('ACCESS_TOKEN'))
    shopify.ShopifyResource.activate_session(
        shopify.Session(shop_url, API_VERSION, os.getenv('ACCESS_TOKEN'))
    )


def download_image(url):
    """Download image from URL and return binary content"""
    response = requests.get(url)
    response.raise_for_status()
    return response.content


def find_variant_by_sku(product_handle, sku):
    """Find variant by product handle and SKU"""
    products = shopify.Product.find(handle=product_handle)
    
    if not products:
        print(f"Product not found: {product_handle}")
        return None
    
    product = products[0]
    
    for variant in product.variants:
        if variant.sku == sku:
            return variant
    
    print(f"Variant not found for SKU: {sku}")
    return None


def add_image_metafield(variant, image_url):
    """Add image metafield to variant"""
    # Download image
    image_data = download_image(image_url)
    
    # Create metafield with file reference
    metafield = shopify.Metafield()
    metafield.namespace = "custom"
    metafield.key = "variant_image_2"
    metafield.type = "file_reference"
    metafield.value = image_url  # This will be staged file ID after upload
    
    # Note: Direct file upload requires GraphQL API
    # For REST API, you need to use staged uploads
    
    variant.add_metafield(metafield)
    return variant.save()


def process_csv():
    """Process CSV file and add metafields"""
    setup_shopify_session()
    
    with open(CSV_FILE, 'r') as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            handle = row['handle']
            sku = row['sku']
            image_url = row['image_url']
            
            print(f"Processing: {handle} - {sku}")
            
            variant = find_variant_by_sku(handle, sku)
            
            if variant:
                try:
                    success = add_image_metafield(variant, image_url)
                    if success:
                        print(f"✓ Successfully added metafield for {sku}")
                    else:
                        print(f"✗ Failed to add metafield for {sku}")
                except Exception as e:
                    print(f"✗ Error processing {sku}: {str(e)}")
            
            print("-" * 50)


if __name__ == "__main__":
    process_csv()