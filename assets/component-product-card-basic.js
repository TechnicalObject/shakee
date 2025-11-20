/******/ (() => { // webpackBootstrap
class ProductCardBasic extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('#ProductCardBasicAtcForm');
    this.quickViewLink = this.querySelector('[data-quick-view-link]');
    this.errorElement = this.querySelector('[data-add-to-cart-error]');
    this.quickAddEnabled = this.getAttribute('data-enable-quick-add') === 'true';
    this.cartType = this.getAttribute('data-cart-type') || 'drawer';
    this.cartAction = this.getAttribute('data-cart-action') || 'show_added_message';
    this.buttonInitialContent = '';
    this.cartCountIndicator = document.querySelector('[data-cart-count-indicator]');
    this.attachEvents = this.attachEvents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCartCountIndicator = this.updateCartCountIndicator.bind(this);
    this.handleQuickView = this.handleQuickView.bind(this);
    this.handleCartAction = this.handleCartAction.bind(this);
    this.handleCartErrors = this.handleCartErrors.bind(this);
    this.setButtonLoadingState = this.setButtonLoadingState.bind(this);
    this.setButtonText = this.setButtonText.bind(this);
    this.wethemeGlobal = document.querySelector('script#wetheme-global');
    this.translationsObject = JSON.parse(this.wethemeGlobal.textContent);
  }

  connectedCallback() {
    window.wetheme.webcomponentRegistry.register({key: 'component-product-card-basic'});
    this.attachEvents();
  }

  attachEvents() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit);
    }

    if (this.quickViewLink) {
      this.quickViewLink.addEventListener('click', this.handleQuickView);
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const addButton = e.currentTarget.querySelector('button');
    this.setButtonLoadingState(addButton);
    
    try {
      /* ===== Add item to the cart ===== */
      const response = await fetch(window.routes.cart_add_url, this.fetchConfigWithBody());
      if (!response) return;

      /* ===== Re-render cart drawer ===== */
      const responseJson = await response.json();
      window.eventBus.emit('update:cart:drawer', responseJson);

      if (responseJson.status == '422') {
        this.handleCartErrors(addButton, responseJson.description);
        return;
      }

      /* ===== Update cart count ===== */
      this.updateCartCountIndicator();

      /* ===== If quick add is enabled, handle the add to cart action ===== */
      if (this.quickAddEnabled) {
        this.handleCartAction(addButton);
      }
    } catch (e) {
      console.error('Unable to add to cart: ', e);
    }
  }

  fetchConfigWithBody() {
    /* ===== Create the fetch configuration object with the form data as the body ===== */
    const config = this.fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    config.body = new FormData(this.form);
    return config;
  }

  fetchConfig(type = 'json') {
    /* ===== Create the fetch configuration object ===== */
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: `application/${type}` },
    };
  }

  async getCart() {
    /* ===== Fetch the cart information ===== */
    try {
      const response = await fetch(`${window.routes.cart_url}?view=compare`);
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

  setButtonLoadingState(addButton) {
    if (!addButton) return;
    /* ===== Store the initial button content for later if needed ===== */
    this.buttonInitialContent = addButton.innerHTML;
    /* ===== Set the loading state (spinner) - fix button size to prevent content shift ===== */
    addButton.style.width = `${addButton.getBoundingClientRect().width}px`;
    addButton.style.height = `${addButton.getBoundingClientRect().height}px`;
    addButton.innerHTML = `<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" class="spin flex-full"><g clip-path="url(#clip0_3605_47041)"><path d="M12.5 23C6.42487 23 1.5 18.0751 1.5 12C1.5 5.92487 6.42487 1 12.5 1C18.5751 1 23.5 5.92487 23.5 12C23.5 15.1767 22.1534 18.0388 20 20.0468" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g><defs><clipPath id="clip0_3605_47041"><rect width="24" height="24" fill="none" transform="translate(0.5)"/></clipPath></defs>${ this.translationsObject.translations.loading }</svg>`;
    addButton.classList.add('is-loading');
  }

  setButtonText(addButton, text) {
    if (!addButton) return;
    addButton.style.width = '';
    addButton.style.height = '';
    addButton.innerHTML = text;
    addButton.classList.remove('is-loading');
    addButton.blur();
  }

  handleQuickView(e) {
    e.preventDefault();
    /* ===== Close cart drawer/offers drawer ===== */
    window.eventBus.emit('close:all:drawers');
    /* ===== Navigate to product page ===== */
    window.location.href = e.currentTarget.href;
  }

  handleCartAction(addButton) {
    if (this.cartAction == 'show_added_message') {
      /* ===== Show added message ===== */
      this.setButtonText(addButton, this.translationsObject.translations.productAdded);
      /* ===== Reset the button text after a delay ===== */
      setTimeout(() => {
        this.setButtonText(addButton, this.buttonInitialContent);
      }, 2000);
    } else if (this.cartType == 'drawer') {
      /* ===== Open cart drawer ===== */
      window.eventBus.emit('open:cart:drawer');
      /* ===== Reset the button text ===== */
      this.setButtonText(addButton, this.buttonInitialContent);
    } else {
      /* ===== Close offers drawer ===== */
      window.eventBus.emit('close:all:drawers');
      /* ===== Navigate to cart page ===== */
      window.location.href = window.routes.cart_url;
    }
  }

  handleCartErrors(addButton, errorMessage) {
    /* ===== Reset the loading state ===== */
    this.setButtonText(addButton, this.buttonInitialContent);
    /* ===== Display the error message ===== */
    if (!errorMessage || !this.errorElement) return;
    this.errorElement.innerHTML = errorMessage;
    this.errorElement.setAttribute('aria-hidden', false);
  }

  detachEvents() {
    if (this.form) {
      this.form.removeEventListener('submit', this.handleSubmit);
    }

    if (this.quickViewLink) {
      this.quickViewLink.removeEventListener('click', this.handleQuickView);
    }
  }

  disconnectedCallback() {
    this.detachEvents();
  }
}

customElements.define('product-card-basic', ProductCardBasic);
/******/ })()
;