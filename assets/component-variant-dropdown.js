/******/ (() => { // webpackBootstrap
/* eslint-disable */
if (!customElements.get('variant-dropdown')) {
  customElements.define('variant-dropdown',
  class VariantDropdown extends HTMLElement {
    constructor() {
      super();

      /* ===== Bind the event handlers in order to maintain the correct context of 'this' ===== */
      ['onDocumentClick', 'handleOptionKeyDown', 'closeDropdownOnFocusOut'].forEach((fn) => {
        this[fn] = this[fn].bind(this);
      });
    }

    connectedCallback() {
      /* ===== Cache the DOM elements and attach the event listeners ===== */
      this.cacheDOMElements();
      this.addEventListeners();
    }

    cacheDOMElements() {
      this.dropdownButton = this.querySelector('[data-dropdown-button]');
      this.dropdownList = this.querySelector('[data-dropdown-list]');
      this.selectedOptionDisplay = this.querySelector('[data-selected-option]');
      this.options = this.dropdownList.querySelectorAll('li');
      this.productForm = this.closest('product-information');
      this.sectionId = this.getAttribute('data-section-id');
    }

    addEventListeners() {
      /* ===== Attach the event listeners to the DOM elements ===== */
      this.dropdownButton.addEventListener('click', () => this.toggleDropdown());
      this.options.forEach(option => {
        option.addEventListener('click', () => this.handleOptionClick(option));
        option.addEventListener('keydown', this.handleOptionKeyDown);
      });

      this.dropdownList.addEventListener('focusout', this.closeDropdownOnFocusOut);
      document.addEventListener('click', this.onDocumentClick);
    }

    handleOptionKeyDown(event) {
      /* ===== Handle the keydown event on the dropdown options ===== */
      if (event.key === 'Enter') {
        this.handleOptionClick(event.target);
      }
    }

    closeDropdownOnFocusOut() {
      /* ===== Use setTimeout to delay the check because the new focus target is not yet focused ===== */
      setTimeout(() => {
        if (!this.contains(document.activeElement)) {
          this.updateButtonStates();
          this.updateDropdownClasses(true);
          this.closeDropdown();
        }
      }, 0);
    }

    handleOptionClick(option) {
      /* ===== Handle the click event on the dropdown options ===== */
      this.updateOptionLabel(this.selectedOptionDisplay, option); // Update the display area with this option's text
      this.markOptionAsSelected(option); // Update the 'selected' state 
      this.toggleDropdown(); // Close the dropdown
      this.onOptionChange(option); // Dispatch a custom event to notify the parent component that the selected option has changed
    }

    toggleDropdown() {
      /* ===== Toggle the dropdown open and closed ===== */
      const isOpen = this.dropdownList.style.display === 'block';
      this.updateButtonStates();
      
      if (isOpen) {
        this.dropdownButton.focus();
        this.updateDropdownClasses(isOpen);
        this.closeDropdown(); 
      } else {
        this.dropdownList.querySelector('li').focus();
        this.dropdownList.style.display = 'block';
        setTimeout(() => this.updateDropdownClasses(isOpen), 50); // Toggle the open state classes with a short delay to allow the dropdown to animate
      }
    }

    onOptionChange(option) {
      const dropdownId = option.getAttribute('data-dropdown-id');
      const productUrl = option.getAttribute('data-product-url');
      const productFetchUrl = option.getAttribute('data-product-fetch-url');
      const currentVariant = this.getVariantData(dropdownId);
      const isCombinedListing = option.getAttribute('data-is-combined-listing') === 'true';

      this.emitVariantChangeEvent(currentVariant, productFetchUrl, productUrl, isCombinedListing);
    }

    emitVariantChangeEvent(variant, productFetchUrl, productUrl, isCombinedListing = false) {
      /* ===== Emit the variant:change event ===== */
      eventBus.emit('variant:change', {
        sectionId: this.sectionId,
        variant: variant,
        fetchURL: productFetchUrl,
        productURL: productUrl,
        isCombinedListing: isCombinedListing
      });
    } 

    updateOptionLabel(currentLabelElement, newLabelElement) {
      /* ===== Update the display area with the new option's text ===== */
      const newLabel = newLabelElement.querySelector('.option-label').textContent;
      currentLabelElement.textContent = newLabel;
    }

    updateDropdownClasses(isOpen) {
      /* ===== Update the dropdown classes to open or close the dropdown ===== */
      const action = isOpen ? 'remove' : 'add';
      this.classList[action]('variant-dropdown--open');
      this.dropdownList.classList[action]('variant-dropdown-fade-enter-active', 'variant-dropdown-fade-enter-to', 'variant-dropdown-fade-enter');
      this.dropdownList.classList[action === 'add' ? 'remove' : 'add']('variant-dropdown-fade-leave-active', 'variant-dropdown-fade-leave-to', 'variant-dropdown-fade-enter');
    }

    updateButtonStates() {
      /* ===== Update the button states based on the dropdown open or closed state ===== */
      const isOpen = this.dropdownList.style.display === 'block';
      const ariaExpanded = isOpen ? 'false' : 'true';
      this.dropdownButton.setAttribute('aria-expanded', ariaExpanded);
    }

    markOptionAsSelected(option) {
      /* ===== Mark the selected option as 'selected' and remove the 'selected' state from all other options ===== */
      this.options.forEach(opt => {
        opt.removeAttribute('selected');
        opt.classList.remove('selected');
      });
      option.setAttribute('selected', '');
      option.classList.add('selected');
    }

    onDocumentClick(event) {
      /* ===== Close the dropdown when the user clicks outside of the dropdown ===== */
      if (!this.contains(event.target)) {
        this.updateButtonStates();
        this.updateDropdownClasses(true);
        this.closeDropdown();
      }
    }

    closeDropdown() {
      /* ===== Close the dropdown by hiding the dropdown list ===== */
      setTimeout(() => {this.dropdownList.style.display = 'none'}, 150);
    }

    getVariantData(dropdownId) {
      return JSON.parse(this.getVariantDataElement(dropdownId).textContent);
    }

    getVariantDataElement(dropdownId) {
      return this.querySelector(`script[type="application/json"][data-resource="${dropdownId}"]`);
    }

    disconnectedCallback() {
      /* ===== Remove the event listeners when the component is removed from the DOM ===== */
      this.dropdownButton.removeEventListener('click', this.toggleDropdown);
      this.options.forEach(option => {
        option.removeEventListener('click', this.handleOptionClick);
        option.removeEventListener('keydown', this.handleOptionKeyDown);
      });

      this.dropdownList.removeEventListener('focusout', this.closeDropdownOnFocusOut);
      document.removeEventListener('click', this.onDocumentClick);
    }
  });
}

/******/ })()
;