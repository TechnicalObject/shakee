/******/ (() => { // webpackBootstrap
/* eslint-disable */
class ProductSwatch extends HTMLElement {
  constructor() {
    super();

    /* ===== Bind the event handlers in order to maintain the correct context of 'this' ===== */
    this.onSwatchChangeBound = this.onSwatchChange.bind(this);
    this.onColorSwatchMouseEnterBound = this.onColorSwatchMouseEnter.bind(this);
    this.onSwatchMouseLeaveBound = this.onSwatchMouseLeave.bind(this);
  }

  connectedCallback() {
    this.colorLabelContainer = this.querySelector('[data-color-swatch-name-container]');
    this.colorLabel = this.querySelector('[data-color-swatch-name]');
    this.colorLabelState = this.querySelector('[data-color-swatch-state]');
    this.soldOutString = this.getAttribute('data-swatch-sold-out-string');
    this.colorSwatches = this.querySelectorAll('.swatch-element.color');
    this.sectionId = this.getAttribute('data-section-id');
    this.setEventListeners();
    this.setColorLabelState();
  }

  setEventListeners() {
    /* ===== Attach the event listeners to the DOM elements ===== */
    this.colorSwatches.forEach(swatch => {
      swatch.addEventListener('mouseenter', this.onColorSwatchMouseEnterBound);
      swatch.addEventListener('mouseleave', this.onSwatchMouseLeaveBound);
    });

    this.addEventListener('change', this.onSwatchChangeBound);
  }

  setColorLabelState() {
    /* ===== Set the color label state based on the active swatch ===== */
    const activeSwatch = this.querySelector('.swatch-element.color.active');
    if (!activeSwatch) return;

    const activeSwatchAvailable = activeSwatch.getAttribute('data-swatch-option-available');
    if (!this.soldOutString || !this.colorLabelState) return;

    // Set color label state (sold out or not)
    this.updateColorLabelState(activeSwatchAvailable);

    /* ===== Keep track of the current label ===== */
    this.currentLabel = '';
    if (this.colorLabel) this.currentLabel = this.colorLabel.textContent;
  }

  updateColorLabelState(available) {
    /* ===== Set the color label state (sold out or not) ===== */
    if (this.colorLabelState) {
      this.colorLabelState.innerText = available === 'false' ? `(${this.soldOutString})` : '';
    }
  }

  onSwatchChange(event) {
    const input = event.target;
    const currentVariant = this.getVariantData(input.id);
    const productUrl = input.getAttribute('data-product-url');
    const productFetchUrl = input.getAttribute('data-product-fetch-url');
    const isCombinedListing = input.getAttribute('data-is-combined-listing') === 'true';

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

  onColorSwatchMouseEnter(event) {
    /* ===== Update the color label on mouse enter ===== */
    this.updateColorLabel(event.currentTarget);
    
    // Add sibling hover active class
    const activeSwatch = this.querySelector('.swatch-element.color.active');
    if (activeSwatch && !event.currentTarget.classList.contains('active')) activeSwatch.classList.add('sibling-hover-active');
  }

  onSwatchMouseLeave() {
    /* ===== Reset the color label on mouse leave ===== */
    // Remove sibling hover active class
    const siblingHoverActiveSwatch = this.querySelector('.swatch-element.sibling-hover-active');
    if (siblingHoverActiveSwatch) siblingHoverActiveSwatch.classList.remove('sibling-hover-active');

    // Reset color label
    this.resetColorLabel();
  }

  updateColorLabel = (swatch) => {
    /* ===== Update the color label based on the swatch value ===== */
    if (!swatch) return;
    const label = swatch.getAttribute('data-value');
    const swatchAvailable = swatch.getAttribute('data-swatch-option-available');

    if (!label || !this.colorLabel) return;
    // Set color label text
    this.colorLabel.textContent = label;
    this.animateColorLabel(label);
    // Set color label state (sold out or not)
    this.updateColorLabelState(swatchAvailable);
  }

  resetColorLabel = () => {
    /* ===== Reset the color label to the active swatch value ===== */
    const activeSwatch = this.querySelector('.swatch-element.color.active');
    if (!activeSwatch || !this.colorLabel) return;

    const activeSwatchValue = activeSwatch.getAttribute('data-value');
    const swatchAvailable = activeSwatch.getAttribute('data-swatch-option-available');
    if (!activeSwatchValue) return;

    // Reset color label text
    this.colorLabel.textContent = activeSwatchValue;
    this.animateColorLabel(activeSwatchValue);
    // Reset color label state (sold out or not)
    this.updateColorLabelState(swatchAvailable);
  }

  animateColorLabel(label) {
    if (label === this.currentLabel) return;

    /* ===== Animate the color label if label has changed ===== */
    this.colorLabelContainer.classList.remove('fade-in-label');
    void this.colorLabelContainer.offsetWidth; // Force reflow to reset the animation
    this.colorLabelContainer.classList.add('fade-in-label');

    /* ===== Keep track of the current label ===== */
    this.currentLabel = label;
  }

  removeEventListeners() {
    /* ===== Remove the event listeners from the DOM elements ===== */
    this.colorSwatches.forEach(swatch => {
      swatch.removeEventListener('mouseenter', this.onColorSwatchMouseEnterBound);
      swatch.removeEventListener('mouseleave', this.onSwatchMouseLeaveBound);
    });

    this.removeEventListener('change', this.onSwatchChangeBound);
  }

  getVariantData(inputId) {
    return JSON.parse(this.getVariantDataElement(inputId).textContent);
  }

  getVariantDataElement(inputId) {
    return this.querySelector(`script[type="application/json"][data-resource="${inputId}"]`);
  }

  disconnectedCallback() {
    /* ===== Remove the event listeners when the element is removed from the DOM ===== */
    this.removeEventListeners();
  }
}

if (!window.customElements.get('product-swatch')) {
  window.customElements.define('product-swatch', ProductSwatch);
}

/******/ })()
;