if (!customElements.get('product-media')) {
  class ProductMedia extends HTMLElement {
    constructor() {
      super();
      this.handleVariantChange = this.handleVariantChange.bind(this);
      this.debounceTimer = null;
    }

    handleVariantChange(variantId) {
      // Debounce to prevent rapid updates
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        this.updateMediaForVariant(variantId);
      }, 100);
    }

    updateMediaForVariant(variantId) {
      const mainSlides = this.querySelectorAll('[data-slider-main] .swiper-slide');
      let variantData = null;
      
      mainSlides.forEach(slide => {
        const slideVariantId = slide.getAttribute('data-variant-id');
        if (slideVariantId === variantId.toString()) {
          variantData = {
            id: variantId,
            hasMetafieldImages: true
          };
        }
      });

      if (!variantData || !variantData.hasMetafieldImages) {
        return;
      }

      // Update thumbnails visibility
      const thumbnailSlides = this.querySelectorAll('[data-media-thumbnails] .swiper-slide');
      
      thumbnailSlides.forEach(slide => {
        const slideVariantId = slide.getAttribute('data-variant-id');
        
        if (slideVariantId === variantId.toString()) {
          slide.style.display = '';
          slide.style.visibility = 'visible';
        } else if (slideVariantId) {
          slide.style.display = 'none';
        }
      });

      // Update swipers with RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        if (this.swiperThumbs) {
          this.swiperThumbs.update();
          this.swiperThumbs.slideTo(0);
        }

        if (this.swiperMain) {
          this.swiperMain.update();
          this.swiperMain.slideTo(0);
        }

        // Allow app embeds to re-query after DOM updates
        requestAnimationFrame(() => {
          document.dispatchEvent(new CustomEvent('product-media:updated'));
        });
      });
    }

    connectedCallback() {
      // Listen for variant changes
      if (window.eventBus) {
        window.eventBus.on('variant:change', (data) => {
          if (data && data.variant) {
            this.handleVariantChange(data.variant.id);
          }
        });
      }

      // Fallback to document event listener
      document.addEventListener('variant:change', (event) => {
        if (event.detail && event.detail.variant) {
          this.handleVariantChange(event.detail.variant.id);
        }
      });
    }

    disconnectedCallback() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
    }
  }

  customElements.define('product-media', ProductMedia);
}