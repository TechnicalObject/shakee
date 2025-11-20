/******/ (() => { // webpackBootstrap
/* eslint-disable */
class ProductForm extends HTMLElement {
  constructor() {
    super();

    this.cacheDOMElements();
    /* ===== Bind the event handlers in order to maintain the correct context of 'this' ===== */
    this.onSubmitBound = this.onSubmit.bind(this);
    this.handleQuickViewModal = this.handleQuickViewModal.bind(this);
  }

  cacheDOMElements() {
    /* ===== Cache the DOM elements ===== */
    this.form = this.querySelector('form');
    this.sectionId = this.getAttribute('data-section-id');
    this.productInformation = this.closest('product-information');
    this.cartAction = document.getElementById('PageContainer').dataset.cartAction;
    this.cartType = document.getElementById('PageContainer').dataset.cartType;
    this.cartCountIndicator = document.querySelector('[data-cart-count-indicator]');
    this.giftWrapProductId = this.getAttribute('data-gift-wrap-product-id');
    this.wethemeGlobal = document.querySelector('script#wetheme-global');
    this.translationsObject = JSON.parse(this.wethemeGlobal.textContent);
    this.qtyErrorMessage = this.querySelector('[data-qty-error-message]');
  }

  connectedCallback() {
    /* ===== Set the initial state of the add to cart button ===== */
    if (!this.form) return;
    this.attachEventListeners();
  }

  attachEventListeners() {
    /* ===== Attach the event listeners to the DOM elements ===== */
    this.form.addEventListener('submit', this.onSubmitBound);
  }

  onSubmit(event) {
    /* ===== Handle the form submission ===== */
    event.preventDefault();
    this.prepareForSubmission();
  }

  prepareForSubmission() {
    /* ===== Prepare the form for submission ===== */
    this.cacheSubmissionElements();
    if (!this.checkRequiredInputs()) return;
    this.disableBlankInputs();
    // If the form is valid, proceed with the submission
    this.showLoadingState();
    this.addItemsToCart();
  }

  cacheSubmissionElements() {
    /* ===== Cache the elements needed for form submission ===== */
    this.loadingIcon = this.form.querySelector('[data-loading-icon]');
    this.addToCartText = this.form.querySelector('[data-add-to-cart-text]');
    this.addedText = this.form.querySelector('[data-cart-added-text]');
    this.quantityInput = this.form.querySelector('[name="quantity"]');
    this.quantity = this.quantityInput ? parseInt(this.quantityInput.value, 10) || 1 : 1;
  }

  disableBlankInputs() {
    // Select all input and textarea elements
    const elements = this.productInformation.querySelectorAll('input, textarea');
    this.blankElements = [];

    elements.forEach((element) => {
      // Check if the element has no value
      if (!element.value) {
        // Temporarily disable the element so that it is not included in the form submission
        element.disabled = true;
        this.blankElements.push(element);
      }
    });
  }

  enableBlankInputs() {
    // Enable the blank elements that were disabled
    this.blankElements.forEach((element) => {
      element.disabled = false;
    });
    this.blankElements = [];
  }

  fetchConfig(type = 'json') {
    /* ===== Create the fetch configuration object ===== */
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: `application/${type}` },
    };
  }

  checkRequiredInputs() {
    /* ===== Check if the required inputs have been filled out ===== */
    const requiredInputs = Array.from(this.productInformation.querySelectorAll('[required]:not(:disabled)'));
    this.clearErrorMessages();
  
    const invalidInputs = requiredInputs.filter(input => {
      if (input.type === 'checkbox') {
        return !input.checked;
      } else {
        return !input.value.trim();
      }
    });
  
    invalidInputs.forEach(input => this.applyErrorMessage(input));
    return invalidInputs.length === 0;
  }  

  clearErrorMessages() {
    /* ===== Clear the error messages from the form ===== */
    this.productInformation.querySelectorAll('.required-field-error').forEach(error => error.remove());
  }

  applyErrorMessage(input) {
    /* ===== Apply the error message to the input element if the required input is empty ===== */
    if (!input) return;
    const inputId = input.id;
    const buttonWrapper = this.querySelector('.paymentButtonsWrapper');
    const errorContainer = input.closest('.input-wrapper')?.querySelector('.input-error-container');
    const errorMessage = input.hasAttribute('custom-dropdown-input') ? this.translationsObject.translations.required_dropdown_error : input.type === 'file' ? this.translationsObject.translations.required_upload_error : input.type === 'checkbox' ? this.translationsObject.translations.required_checkbox_error : this.translationsObject.translations.required_input_error;
    const errorElement = `<span id="${inputId}" class="required-field-error errors" style="display: block;">${errorMessage}</span>`;
    const submitErrorMessage = input.type == 'file' ? input.closest('file-upload')?.dataset.errorMessage : input.dataset.errorMessage;
    const submitErrorElement = `<span id="${inputId}Submit" class="required-field-error errors" style="display: block;" role="alert">${submitErrorMessage}</span>`;
    errorContainer ? errorContainer.innerHTML = errorElement : input.insertAdjacentHTML('beforebegin', errorElement);
    if (buttonWrapper) buttonWrapper.insertAdjacentHTML('beforebegin', submitErrorElement);
    input.focus();

    // If the input has an error message, add an 'input' event listener to remove the error message
    if (input.type == 'file') return;
    input.addEventListener('input', () => {
      this.productInformation.querySelector(`#${inputId}.required-field-error`)?.remove();
      this.querySelector(`#${inputId}Submit.required-field-error`)?.remove();
    }, { once: true });
  }

  giftWrapEnabled() {
    /* ===== Determine if the gift wrap product is enabled ===== */
    return !!this.productInformation.querySelector('[name="properties[Gift wrap]"]')?.checked && this.giftWrapProductId !== '';
  }

  async addItemsToCart() {
    /* ===== Add the item(s) to the cart ===== */
    try {
      // Add the main product to the cart
      const mainProductAdded = await this.addProductToCart(routes.cart_add_url, this.fetchConfigWithBody());
      if (mainProductAdded && this.giftWrapEnabled()) {
        // Add the gift wrap product to the cart
        await this.addProductToCart(routes.cart_add_url, this.additionalProductConfig(this.giftWrapProductId, this.quantity));
      }
      // Process the response
      this.processResponse(mainProductAdded);
    } catch (error) {
      console.error(`Error adding item(s) to cart: ${error.description || error.message}`);
    }
  }

  async addProductToCart(url, config) {
    /* ===== Add the product to the cart ===== */
    const response = await fetch(url, config);
    if (response.ok) {
      // Update cart drawer
      if (this.cartType === 'drawer') {
        const responseJson = await response.json();
        this.updateCartDrawer(responseJson);
      }
    } else {
      console.error(`Error adding item to cart: ${response.description || response.statusText}`);
    }
    return response;
  }

  additionalProductConfig(productId, quantity) {
    /* ===== Create the configuration object for the additional product(s) to be added to the cart ===== */
    const additionalItemPayload = { items: [{ id: productId, quantity: quantity }] };
    if (this.cartType === 'drawer') {
      additionalItemPayload['sections'] = 'cart-drawer';
    }
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(additionalItemPayload)
    };
  }

  updateCartDrawer(responseJson) {
    eventBus.emit('update:cart:drawer', responseJson);
  }

  async getCart() {
    /* ===== Fetch the cart information ===== */
    try {
      const response = await fetch(`${routes.cart_url}?view=compare`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching cart: ${error.description || error.message}`);
    }
  }

  updateCartCountIndicator() {
    /* ===== Update the cart count indicator ===== */
    if (!this.cartCountIndicator) return;
    this.getCart().then(cart => window.wetheme.updateCartCount(cart));
  }

  fetchConfigWithBody() {
    /* ===== Create the fetch configuration object with the form data as the body ===== */
    const config = this.fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    config.body = this.addSectionsParam(new FormData(this.form));
    return config;
  }

  addSectionsParam(formData) {
    /* ===== Add the sections parameter to the form data for cart drawer rendering ===== */
    if (this.cartType === 'drawer') {
      formData.append('sections', 'cart-drawer');
    }
    return formData;
  }

  processResponse(response) {
    /* ===== Process the response from the server ===== */
    if (response.ok) {
      this.hideLoadingState();
    }

    // Handle the case where the product is out of stock
    if (response.status === 422) {
      window.eventBus.emit('render:cart:drawer');
      this.hideLoadingState();
      if (this.qtyErrorMessage) this.qtyErrorMessage.classList.remove('hidden');
    }

    // Emit the cart:added event
    eventBus.emit('cart:added', { sectionId: this.sectionId });
    
    // Handle quick view modal if we're in one
    this.handleQuickViewModal();
    
    // Re-enable the blank inputs
    this.enableBlankInputs();
  }

  openCartDrawer() {
    /* ===== Open the cart drawer ===== */
    eventBus.emit('open:cart:drawer', { scrollToTop: true });
  }

  handleQuickViewModal() {
    /* ===== Close the quick view modal if product was added from quick view ===== */
    if (this.closest('[data-quick-view-product]')) {
      const closeModal = () => {
        const isModalOpen = document.body.classList.contains('theme-modal-open');
        if (isModalOpen) {
          eventBus.emit('theme:modal:hide');
        }
      };

      if (this.cartAction === 'show_added_message' && this.addedText) {
        setTimeout(closeModal, 1500); // Allows the 'added' message to display before closing the modal
      } else {
        closeModal();
      }
    }
  }

  showLoadingState() {
    /* ===== Show the loading state of the add to cart button ===== */
    this.toggleElements(this.addToCartText, false);
    this.toggleElements(this.loadingIcon, true, 'hidden');
    this.toggleAddButton(true);
  }

  hideLoadingState() {
    /* ===== Hide the loading state of the add to cart button ===== */
    this.toggleElements(this.loadingIcon, false, 'hidden');
    this.toggleCartActionDisplay();
  }

  toggleCartActionDisplay() {
    /* ===== Toggle the cart action display based on the selected action ===== */
    if (this.cartAction === 'show_added_message' && this.addedText) {
      // Show the added text message and update the cart count indicator
      this.addedText.style.display = 'block';
      setTimeout(() => {
        this.toggleAddToCartText(true);
        this.toggleAddButton(false); 
        this.updateCartCountIndicator();
      }, 2000);
    } else if (this.cartType === 'drawer' && this.cartAction === 'go_to_or_open_cart') {
      // Open the cart drawer 
      this.toggleAddToCartText(true);
      this.openCartDrawer();
      this.toggleAddButton(false);
      this.updateCartCountIndicator();
    } else {
      // Redirect to the cart page
      this.toggleAddToCartText(true);
      this.toggleAddButton(false);
      window.location = window.routes.cart_url;
    }
  }

  toggleAddToCartText(show) {
    /* ===== Toggle the add to cart text and the added text message ===== */
    // Show the added text message and hide the add to cart text
    if (this.addedText) this.addedText.style.display = show ? 'none' : 'block';
    // Show the add to cart text and hide the added text message
    if (this.addToCartText) this.addToCartText.style.display = show ? 'block' : 'none';
  }

  toggleElements(element, show, className) {
    /* ===== Toggle the display of the element based on the show value ===== */
    if (!element) return;
    if (className) {
      show ? element.classList.remove(className) : element.classList.add(className);
    } else {
      element.style.display = show ? 'block' : 'none';
    }
  }

  toggleAddButton(disable = true) {
    /* ===== Toggle the state of the add to cart button ===== */
    const addButton = this.querySelector('[name="add"]');
    if (!addButton) return;

    addButton.disabled = disable;
  }

  disconnectedCallback() {
    /* ===== Remove the event listeners when the element is removed from the DOM ===== */
    this.form.removeEventListener('submit', this.onSubmitBound);
  }
}

if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}

/******/ })()
;