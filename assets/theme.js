/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 263:
/***/ ((module) => {



module.exports = function(el, onOver, onOut) {
  var x, y, pX, pY;
  var mouseOver = false;
  var focused = false;
  var h = {},
    state = 0,
    timer = 0;

  var options = {
    sensitivity: 7,
    interval: 100,
    timeout: 0,
    handleFocus: false
  };

  function delay(el, e) {
    if (timer) timer = clearTimeout(timer);
    state = 0;
    return focused ? undefined : onOut.call(el, e);
  }

  function tracker(e) {
    x = e.clientX;
    y = e.clientY;
  }

  function compare(el, e) {
    if (timer) timer = clearTimeout(timer);
    if ((Math.abs(pX - x) + Math.abs(pY - y)) < options.sensitivity) {
      state = 1;
      return focused ? undefined : onOver.call(el, e);
    } else {
      pX = x;
      pY = y;
      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }
  }

  // Public methods
  h.options = function(opt) {
    var focusOptionChanged = opt.handleFocus !== options.handleFocus;
    options = Object.assign({}, options, opt);
    if (focusOptionChanged) {
      options.handleFocus ? addFocus() : removeFocus();
    }
    return h;
  };

  function dispatchOver(e) {
    mouseOver = true;
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);

    if (state !== 1) {
      pX = e.clientX;
      pY = e.clientY;

      el.addEventListener('mousemove', tracker, false);

      timer = setTimeout(function() {
        compare(el, e);
      }, options.interval);
    }

    return this;
  }

  function dispatchOut(e) {
    mouseOver = false;
    if (timer) timer = clearTimeout(timer);
    el.removeEventListener('mousemove', tracker, false);

    if (state === 1) {
      timer = setTimeout(function() {
        delay(el, e);
      }, options.timeout);
    }

    return this;
  }

  function dispatchFocus(e) {
    if (!mouseOver) {
      focused = true;
      onOver.call(el, e);
    }
  }

  function dispatchBlur(e) {
    if (!mouseOver && focused) {
      focused = false;
      onOut.call(el, e);
    }
  }

  function addFocus() {
    el.addEventListener('focus', dispatchFocus, false);
    el.addEventListener('blur', dispatchBlur, false);
  }

  function removeFocus() {
    el.removeEventListener('focus', dispatchFocus, false);
    el.removeEventListener('blur', dispatchBlur, false);
  }

  h.remove = function() {
    if (!el) return;
    el.removeEventListener('mouseover', dispatchOver, false);
    el.removeEventListener('mouseout', dispatchOut, false);
    removeFocus();
  };

  if (el) {
    el.addEventListener('mouseover', dispatchOver, false);
    el.addEventListener('mouseout', dispatchOut, false);
  }

  return h;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/javascripts/constants.js
/**
  * @typedef {Object} Breakpoint
  * @param {number} min
  * @param {number} max
  * @param {string} name
  * @param {number} order
  */

/** @enum {Breakpoint} */
const Breakpoints = {
  xs: {
    min: 0,
    max: 480,
    name: 'xs',
    order: 1
  },
  // Extra small devices (portrait phones, less than 576px)
  sm: {
    min: 481,
    max: 767,
    name: 'sm',
    order: 2
  },
  // Small devices (landscape phones, 576px and up)
  md: {
    min: 768,
    max: 991,
    name: 'md',
    order: 3
  },
  // Medium devices (tablets, 768px and up)
  lg: {
    min: 992,
    max: 1199,
    name: 'lg',
    order: 4
  },
  // Large devices (desktops, 992px and up)
  xl: {
    min: 1200,
    max: Number.POSITIVE_INFINITY,
    name: 'xl',
    order: 5
  } // Extra large devices (large desktops, 1200px and up)
};
;// ./src/javascripts/ThemeBase.js
/* eslint-disable no-unused-vars */


const TOGGLE_LEFT_DRAWER_EVENT = 'wetheme-toggle-left-drawer';
const CART_UPDATE_EVENT = 'wetheme-cart-update';
class ThemeBase {
  constructor() {
    /** @type {Object.<string, string>} */
    this.translations = void 0;
    /** @type {string} */
    this.moneyFormat = void 0;
    /** @type {string | null} */
    this.giftwrapProduct = void 0;
    /** @type {boolean} */
    this.giftwrapEnabled = void 0;
    /** @type {Breakpoint} */
    this.breakpoint = void 0;
    /**
     * Take monetary value and format it as money in
     *
     * @param {number | string} cents Price in cents (hundreds of base unit)
     * @param {string} [format] Format for money, store format will be used if undefined
     * @return {string} HTML with the formatted money value
     */
    this.formatMoney = (cents, format) => {
      var moneyFormat = this.moneyFormat;
      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }
      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = format || moneyFormat;
      function formatWithDelimiters(number, precision, thousands, decimal) {
        if (precision === null || precision === undefined) {
          precision = 2;
        }
        thousands = thousands || ',';
        decimal = decimal || '.';
        if (isNaN(number) || number == null) {
          return 0;
        }
        number = (number / 100.0).toFixed(precision);
        var parts = number.split('.');
        var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        var centsAmount = parts[1] ? decimal + parts[1] : '';
        return dollarsAmount + centsAmount;
      }
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_with_space_separator':
          value = formatWithDelimiters(cents, 2, ' ', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
        case 'amount_no_decimals_with_space_separator':
          value = formatWithDelimiters(cents, 0, ' ');
          break;
      }
      return '<span class="money">' + formatString.replace(placeholderRegex, value) + '</span>';
    };
    /**
     * Return current width of the window including scrollbar
     *
     * @returns {number} width of the window
     */
    this.getWindowWidth = () => {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    };
    /**
     * Get breakpoint for given width or window if null not defined
     *
     * @param {number} width Width for which we want breakpoint
     * @returns {import('./constants').Breakpoint} Name of matching breakpoint
     */
    this.getBreakpoint = (width = undefined) => {
      const w = width === null || width === undefined ? this.getWindowWidth() : width;
      let breakpoint;
      Object.values(Breakpoints).forEach(b => {
        if (w >= b.min && w <= b.max) {
          breakpoint = b;
        }
      });
      return breakpoint;
    };
    /**
     * Open/close left drawer
     *
     * @param {boolean | undefined} forceOpen
     */
    this.toggleLeftDrawer = (forceOpen = undefined) => {};
    /**
     * Update cart count after cart content was changed
     *
     * @param {import('theme-checker/dist/shopify').Cart} cart
     */
    this.updateCartCount = cart => {};
    /**
     * Load Google Maps javascript API
     *
     * @param {string} apiKey Google Maps API key
     * @return {Promise<import('./window').GoogleMapsApi>} Promise to be resolved when the API is loaded
     */
    this.loadGoogleMapApi = apiKey => {
      return;
    };
    /**
     * Make sure a `<script>` tag with given `id` and `src` exist, create one if not
     *
     * @param {string} id
     * @param {string} src
     * @return {HTMLScriptElement}
     */
    this.createScript = (id, src) => {
      return;
    };
    /**
     * Register a component to receive global events (like onResize)
     *
     * @param {Object} component
     */
    this.registerComponent = component => {};
    /**
     * Add element that contains product images with (sales, etc) badges
     * to enable autopositioning them to image corner
     *
     * @param {HTMLElement} root container that contains badges
     * @param {number | undefined} timeout rerun initialization after X milliseconds
     */
    this.addBadges = (root, timeout) => {};
  }
}
;// ./src/javascripts/Component.js
class Component {
  /**
   * Generic component, inherited class will be called to receive things like resize events.
   *
   * @param {import('./ThemeBase').default} theme
   * @param {HTMLElement} element
   */
  constructor(theme, element) {
    /**
     * This will be called immediatelly when window resizes.
     *
     * NOTE: prefer using onWindowResize as it's already debounced.
     *
     * @param {Object} params
     * @param {number} params.width Width of the window
     */
    this.onWindowResizeRaw = ({
      width
    }) => {};
    /**
     * This will be called regularly (throttled) when window is being resized.
     *
     * @param {Object} params
     * @param {number} params.width New width of the window
     * @param {number} params.oldWidth Width of the window last time this was called
     * @param {import("./constants").Breakpoint} params.breakpoint Current width breakpoint
     */
    this.onWindowResize = ({
      width,
      oldWidth,
      breakpoint
    }) => {};
    /**
     * This will be called when window is being resized and it changes current breakpoint.
     *
     * @param {Object} params
     * @param {number} params.width New width of the window
     * @param {import("./constants").Breakpoint} params.breakpoint Current width breakpoint
     * @param {import("./constants").Breakpoint} params.oldBreakpoint Breakpoint last time this was called
     */
    this.onWindowResizeBreakpoint = ({
      width,
      breakpoint,
      oldBreakpoint
    }) => {};
    /**
     * This will be called regularly (throttled) when window is scrolled
     */
    this.onWindowScroll = () => {};
    this.theme = theme;
    this.element = element;
    theme.registerComponent(this);
  }
}
;// ./src/javascripts/Section.js


/**
 * Base class for all the section components
 *
 * All components should inherit this class and implement what method they need
 */
class Section_Section extends Component {
  /**
   *
   * @param {import("./ThemeBase").default} theme Global theme object
   * @param {HTMLElement} element Toplevel element for the section
   * @param {boolean} pageLoad True on initial page load, False when this section reloads
   */
  constructor(theme, element, pageLoad) {
    super(theme, element);
    /**
     * This will be called when section gets selected in Shopify Theme Editor
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the section
     * @param {string} params.sectionId Identification of the section
     * @param {boolean} params.load True if block was loaded, False if user just openeded previously selected block
     * */
    this.onSectionSelect = ({
      element,
      sectionId,
      load
    }) => {};
    /**
     * This will be called when section gets deselected in Shopify Theme Editor
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the section
     * @param {string} params.sectionId Identification of the section
     */
    this.onSectionDeselect = ({
      element,
      sectionId
    }) => {};
    /**
     * This will be called when section user reorders this section in Shopify Theme Editor
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the section
     * @param {string} params.sectionId Identification of the section
     */
    this.onSectionReorder = ({
      element,
      sectionId
    }) => {};
    /**
     * This will be called when block gets selected in Shopify Theme Editor
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the block
     * @param {string} params.sectionId Identification of the section
     * @param {string} params.blockId Identification of the block
     * @param {boolean} params.load True if block was loaded, False if user just openeded previously selected block
     * */
    this.onBlockSelect = ({
      element,
      sectionId,
      blockId,
      load
    }) => {};
    /**
     * This will be called when block gets deselected in Shopify Theme Editor
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the block
     * @param {string} params.sectionId Identification of the section
     * @param {string} params.blockId Identification of the block
     * */
    this.onBlockDeselect = ({
      element,
      sectionId,
      blockId
    }) => {};
    /**
     * This will be called when section is detached from DOM (usually when removed/reconfigured in Theme Editor)
     *
     * @param {Object} params
     * @param {HTMLElement} params.element Toplevel element for the section that's being destroyed
     */
    this.destroy = ({
      element
    }) => {};
    this.theme = theme;
    this.element = element;
  }
}
;// ./src/javascripts/utils.js
/**
 * Throttle execution of function
 *
 * @param {Function} callback function to be throttled
 * @param {number} interval milliseconds
 * @returns {Function}
 */
function throttle(callback, interval) {
  let enableCall = true;
  let calledWhenDisabled = false;
  return (...args) => {
    const onTimeout = () => {
      if (calledWhenDisabled) {
        callback.apply(this, args);
        setTimeout(onTimeout, interval);
      } else {
        enableCall = true;
      }
      calledWhenDisabled = false;
    };
    if (!enableCall) {
      calledWhenDisabled = true;
      return;
    }
    enableCall = false;
    callback.apply(this, args);
    setTimeout(onTimeout, interval);
  };
}

/**
 * Take monetary value and format it as money
 *
 * @param {number | string} cents - Price in cents (hundreds of base unit)
 * @param {string} [format] - Format for money; store format will be used if undefined
 * @return {string} - HTML string with the formatted money value
 */
function formatMoney(cents, format) {
  var moneyFormat = format || '${{amount}}';
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = moneyFormat;
  function formatWithDelimiters(number, precision, thousands, decimal) {
    if (precision === null || precision === undefined) {
      precision = 2;
    }
    thousands = thousands || ',';
    decimal = decimal || '.';
    if (isNaN(number) || number == null) {
      return '0';
    }
    number = (number / 100.0).toFixed(precision);
    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands);
    var centsAmount = parts[1] ? decimal + parts[1] : '';
    return dollarsAmount + centsAmount;
  }
  var match = formatString.match(placeholderRegex);
  if (!match) {
    throw new Error(`Invalid format string: '${formatString}'. Expected '{{amount}}' or similar placeholders.`);
  }
  switch (match[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_with_space_separator':
      value = formatWithDelimiters(cents, 2, ' ', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
    default:
      throw new Error(`Unknown format type: ${match[1]}`);
  }
  return formatString.replace(placeholderRegex, value);
}

// FocusTrap class for managing focus within a container
class FocusTrap {
  /**
   * @param {HTMLElement} container - The container within which to trap focus.
   * @param {HTMLElement} [initialElement=null] - The element to focus initially. If not provided, the first focusable element is focused.
   * @param {Function} [onEscape=null] - Optional callback to execute when the Escape key is pressed.
   */
  constructor(container, initialElement = null, onEscape = null) {
    this.container = container;
    this.initialElement = initialElement;
    this.onEscape = onEscape;
    this.focusableElements = [];
    this.firstElement = null;
    this.lastElement = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateFocusableElements = this.updateFocusableElements.bind(this);
    this.observer = new MutationObserver(this.updateFocusableElements);
    this.init();
  }

  /**
   * Initializes the focus trap by removing the 'inert' attribute,
   * updating focusable elements, setting initial focus, and attaching necessary event listeners.
   */
  init() {
    if (!this.container) return;

    // Remove the 'inert' attribute from the container
    this.container.removeAttribute('inert');
    this.updateFocusableElements();
    if (this.initialElement && this.isFocusable(this.initialElement)) {
      this.initialElement.focus();
    } else if (this.firstElement) {
      this.firstElement.focus();
    }
    this.container.addEventListener('keydown', this.handleKeyDown);
    this.observer.observe(this.container, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  /**
   * Determines if an element is focusable.
   * @param {HTMLElement} el - The element to check.
   * @returns {boolean} - True if the element is focusable, else false.
   */
  isFocusable(el) {
    if (!el) return false;
    return el.offsetParent !== null && el.getAttribute('tabindex') !== '-1' && !this.isInsideClosedDetails(el);
  }

  /**
   * Determines if an element is inside a closed <details> element.
   * Allows <summary> elements to remain focusable even if their parent <details> is closed.
   * @param {HTMLElement} el - The element to check.
   * @returns {boolean} - True if inside a closed <details> and not a <summary>, else false.
   */
  isInsideClosedDetails(el) {
    let parent = el.parentElement;
    while (parent) {
      if (parent.tagName.toLowerCase() === 'details') {
        if (!parent.hasAttribute('open')) {
          // Allow the <summary> element itself to be focusable
          if (el.tagName.toLowerCase() === 'summary' && parent.querySelector('summary') === el) {
            return false;
          }
          return true;
        }
      }
      parent = parent.parentElement;
    }
    return false;
  }

  /**
   * Updates the list of focusable elements, excluding those inside closed <details> (except <summary>).
   */
  updateFocusableElements() {
    this.focusableElements = Array.from(this.container.querySelectorAll('a[href], area[href], input:not([type=hidden]), select, textarea, button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], summary')).filter(el => this.isFocusable(el));
    if (this.focusableElements.length > 0) {
      this.firstElement = this.focusableElements[0];
      this.lastElement = this.focusableElements[this.focusableElements.length - 1];
    } else {
      this.firstElement = null;
      this.lastElement = null;
      console.warn('No focusable elements found within the container.');
    }
  }

  /**
   * Handles the keydown event to trap focus within the container.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  handleKeyDown(e) {
    if (e.key === 'Tab') {
      if (this.focusableElements.length === 0) {
        e.preventDefault();
        return;
      }
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === this.firstElement) {
          e.preventDefault();
          this.lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === this.lastElement) {
          e.preventDefault();
          this.firstElement.focus();
        }
      }
    } else if (e.key === 'Escape') {
      if (this.onEscape) {
        this.onEscape();
      }
    }
  }

  /**
   * Destroys the focus trap by removing event listeners and disconnecting observers.
   */
  destroy() {
    this.container.setAttribute('inert', '');
    this.container.removeEventListener('keydown', this.handleKeyDown);
    this.observer.disconnect();
  }
}
;// ./src/javascripts/global/MobileMenu.js


class MobileMenu {
  constructor(theme, element) {
    this.handleToggle = e => {
      this.toggle(e.detail.forceOpen);
    };
    this.close = () => {
      document.body.classList.remove('js-drawer-open');
      document.body.classList.remove('js-drawer-open-left');
      this.isOpen = false;
      if (this.focusTrap) {
        this.focusTrap.destroy();
        this.focusTrap = null;
      }
    };
    this.open = () => {
      document.body.classList.add('js-drawer-open');
      document.body.classList.add('js-drawer-open-left');
      this.isOpen = true;
      const container = document.querySelector('#NavDrawer');
      this.focusTrap = new FocusTrap(container);
    };
    this.toggle = (forceOpen = undefined) => {
      if (forceOpen === true) {
        this.open();
      } else if (forceOpen === false) {
        this.close();
      } else if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    };
    this.theme = theme;
    this.element = element;
    this.isOpen = false;
    this.focusTrap = null;
    document.documentElement.addEventListener(TOGGLE_LEFT_DRAWER_EVENT, this.handleToggle);
    const toggleButtons = document.querySelectorAll('.mobile-nav__toggle');
    toggleButtons.forEach(button => {
      button.addEventListener('click', function (evt) {
        evt.currentTarget.parentElement.classList.toggle('mobile-nav--expanded');
      });
    });
    this.element.querySelector('.mobile-menu--close-btn').addEventListener('click', e => {
      e.preventDefault();
      this.close();
    });
  }
}
// EXTERNAL MODULE: ./node_modules/hoverintent/index.js
var hoverintent = __webpack_require__(263);
var hoverintent_default = /*#__PURE__*/__webpack_require__.n(hoverintent);
;// ./src/javascripts/global/fadeInUpAnimation.js
// fadeInUpAnimation.js

// Selects all children elements within a parent element and initiates a fade in up animation
// Child elements have an opacity of 0 and a transform of translateY() applied to them initially
// See _global-sections.scss for the animation

function initiateFadeInUpAnimation(elements) {
  if (elements.length) {
    elements.forEach((child, index) => {
      child.style.animation = `fade-in-up 0.15s ease-in-out forwards, fade-in-up-opacity 0.35s ease-in-out forwards`;
      child.style.animationDelay = `${(index + 1) * 0.05}s`;
    });
  }
}

// Selects all children elements within a parent element and removes the fade in up animation

function removeFadeInUpAnimation(elements) {
  if (elements.length) {
    elements.forEach(child => {
      child.style.animation = 'none';
    });
  }
}
;// ./src/javascripts/global/Menu.js


class Menu {
  constructor(theme, element) {
    this.theme = theme;
    this.element = element;
    this.activeClass = 'nav-hover';
    this.sectionId = this.element.getAttribute('data-wetheme-section-id');
    this.megaMenuDropdowns = document.querySelectorAll('.site-nav__dropdown.mega-menu-dropdown');
    this.megaMenu = document.querySelector('.mega-menu-block');
    this.megaMenuChildren = document.querySelectorAll('.mega-menu-block .dropdown-submenu');
    this.resizeTimeout = null;
    this.hideTimeout = null;
    this.nav = document.getElementById('AccessibleNav');
    this.allLinks = this.nav.querySelectorAll('a');
    this.topLevel = this.nav.querySelectorAll('li > a');
    this.parents = this.nav.querySelectorAll('.site-nav--has-dropdown');
    this.mainLinks = this.nav.querySelectorAll('.site-nav--has-dropdown.first-level-dropdown');
    this.subMenus = this.nav.querySelectorAll('.site-nav__dropdown');
    this.subMenuLinks = this.nav.querySelectorAll('.site-nav__dropdown a');
    this.overlayHeader = document.querySelector('header.overlay-header');
    this.parents.forEach(el => {
      this.setDropdownOffset(el);
    });
    this.subMenus.forEach(el => {
      this.initScrollHandler(el);
      if (el.classList.contains('mega-menu-dropdown')) {
        // Delay the hide of the mega menu dropdown
        el.addEventListener('mouseleave', () => this.scheduleHideDropdown(el));
        el.addEventListener('focusout', () => this.scheduleHideDropdown(el));
      } else {
        // Close the dropdown immediately
        el.addEventListener('mouseleave', () => this.hideDropdown(el));
        el.addEventListener('focusout', () => this.hideDropdown(el));
      }

      // Add mouseover event to handle child dropdowns
      el.querySelectorAll('li').forEach(childEl => {
        childEl.addEventListener('mouseover', evt => this.handleChildHover(evt, childEl));
      });
    });
    this.adjustMegaMenuPosition();
    window.addEventListener('resize', () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        this.parents.forEach(el => {
          this.setDropdownOffset(el);
          this.adjustMegaMenuPosition();
        });
      }, 300);
    });
    if (window.Shopify.designMode) {
      document.addEventListener('shopify:section:select', e => {
        if (e.detail.sectionId === this.sectionId) {
          this.element.classList.add('section-selected');
        } else {
          this.element.classList.remove('section-selected');
        }
      });
      document.addEventListener('shopify:section:deselect', e => {
        if (e.detail.sectionId === this.sectionId) {
          this.element.classList.remove('section-selected');
        }
      });
      document.addEventListener('shopify:section:load', e => {
        if (e.detail.sectionId === this.sectionId) {
          this.adjustMegaMenuPosition();
        }
      });
    }
    this.parents.forEach(el => {
      el.addEventListener('mouseover', evt => this.handleParentEvent(evt, el));
      el.addEventListener('touchstart', evt => this.handleParentEvent(evt, el));
      el.addEventListener('focusin', evt => this.handleParentEvent(evt, el));
    });
    this.parents.forEach(el => {
      hoverintent_default()(el, evt => {
        document.querySelectorAll(`.${this.activeClass}`).forEach(activeEl => {
          if (!activeEl.contains(evt.target)) {
            activeEl.classList.remove(this.activeClass);
          }
        });
      }, () => {
        // Avoid using hideDropdown() here.
      });
    });
    this.mainLinks.forEach(el => {
      if (el.classList.contains('mega-menu')) {
        // Delay the hide of the mega menu dropdown
        el.addEventListener('mouseleave', () => this.scheduleHideDropdown(el));
      } else {
        // Close the dropdown immediately
        el.addEventListener('mouseleave', () => this.hideDropdown(el));
      }
    });
    document.querySelector('.site-header').addEventListener('mouseleave', () => {
      // Replace direct hideDropdown calls with scheduleHideDropdown
      this.scheduleHideDropdown();
    });
    this.subMenus.forEach(el => {
      if (el.classList.contains('mega-menu-dropdown')) {
        // Delay the hide of the mega menu dropdown
        el.addEventListener('mouseleave', () => this.scheduleHideDropdown(el));
        el.addEventListener('focusout', () => this.scheduleHideDropdown(el));
      } else {
        // Close the dropdown immediately
        el.addEventListener('mouseleave', () => this.hideDropdown(el));
        el.addEventListener('focusout', () => this.hideDropdown(el));
      }
    });
    if (this.megaMenu) {
      // Replace direct hideDropdown calls with scheduleHideDropdown
      this.megaMenu.addEventListener('mouseleave', () => this.scheduleHideDropdown());
    }
    this.subMenuLinks.forEach(link => {
      link.addEventListener('touchstart', evt => {
        evt.stopImmediatePropagation();
      });
    });
    this.allLinks.forEach(link => {
      link.addEventListener('focusin', evt => {
        const parentEl = link.parentElement;
        this.closeSiblings(parentEl, evt);
      });
    });
    document.querySelectorAll('.site-header a, .site-header button, .site-header select').forEach(el => {
      el.addEventListener('focusin', () => {
        let closeAllMenus = true;
        this.allLinks.forEach(link => {
          if (link === el) {
            closeAllMenus = false;
          }
        });
        if (closeAllMenus) {
          this.parents.forEach(parent => {
            this.hideDropdown(parent);
          });
        }
      });
    });

    // Bind the event handler
    this.handleBodyTouchStart = this.handleBodyTouchStart.bind(this);
  }

  // Named event handler for touchstart
  handleBodyTouchStart(evt) {
    if (!evt.target.closest('.site-nav__link, .dropdown-submenu')) {
      this.hideDropdown();
    }
  }
  handleChildHover(evt, childEl) {
    // Close all sibling dropdowns
    const siblings = Array.from(childEl.parentElement.children).filter(sibling => sibling !== childEl);
    this.hideDropdown(siblings);

    // Show the current dropdown if it has one
    if (childEl.classList.contains('site-nav--has-dropdown')) {
      this.showDropdown(childEl);
    }
  }
  handleParentEvent(evt, el) {
    let ret = true;
    if (!el.classList.contains(this.activeClass)) {
      evt.preventDefault();
      const siblings = Array.from(el.parentElement.children).filter(sibling => sibling !== el);
      this.hideDropdown(siblings);
      ret = false;
    }
    this.showDropdown(el);
    return ret;
  }
  initScrollHandler(el) {
    let scrolling;
    el.addEventListener('scroll', () => {
      clearTimeout(scrolling);
      el.classList.add('scrolling');
      scrolling = setTimeout(() => {
        el.classList.remove('scrolling');
      }, 800);
    });
  }
  closeSiblings(el, evt) {
    if (!el.classList.contains(this.activeClass)) {
      evt.preventDefault();
      this.hideDropdown(Array.from(el.parentElement.children).filter(sibling => sibling !== el));
    }
  }
  adjustMegaMenuPosition() {
    this.megaMenuDropdowns.forEach(item => {
      const menuItem = item.closest('.site-nav--has-dropdown');
      const menuItemRect = menuItem.getBoundingClientRect();
      item.style.left = `-${menuItemRect.left}px`;
    });

    // Need the scrollbar width in order to set the menu width to 100vw
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.element.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }
  showDropdown(el) {
    // Clear any existing hide timeout to prevent accidental hiding
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    if (!el) return;
    el.classList.add(this.activeClass);
    const megaMenuChildrenArray = Array.from(el.querySelectorAll('.mega-menu-block .dropdown-submenu'));
    initiateFadeInUpAnimation(megaMenuChildrenArray);
    document.querySelector('.sticky-header')?.classList.remove('sticky-header-transformed');
    if (el.classList.contains('mega-menu')) {
      // Add force-hover class to the overlay header when the mega menu dropdown is hovered
      if (this.overlayHeader) {
        this.overlayHeader.classList.add('force-hover');
      }
    } else {
      // Remove force-hover class from the overlay header if it exists
      if (this.overlayHeader && this.overlayHeader.classList.contains('force-hover')) {
        this.overlayHeader.classList.remove('force-hover');
      }
    }
    setTimeout(() => {
      document.body.addEventListener('touchstart', this.handleBodyTouchStart);
    }, 250);
  }

  /**
   * Schedule hiding the dropdown with a delay.
   * @param {HTMLElement} el - The dropdown element to hide.
  */
  scheduleHideDropdown(el) {
    // Clear any existing hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    // Set a new timeout to hide the dropdown after 300ms
    this.hideTimeout = setTimeout(() => {
      // Remove force-hover class from the overlay header when the mega menu dropdown is hidden
      if (this.overlayHeader) {
        this.overlayHeader.classList.remove('force-hover');
      }
      this.hideDropdown(el);
      this.hideTimeout = null;
    }, 500); // Delay in milliseconds
  }
  hideDropdown(elements) {
    // Clear any existing hide timeout to avoid multiple executions
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    if (elements) {
      // Ensure elements is an array or NodeList
      if (!Array.isArray(elements) && !(elements instanceof NodeList)) {
        elements = [elements]; // Convert single element to array
      }
      elements.forEach(el => {
        el.classList.remove(this.activeClass);
        const megaMenuChildrenArray = Array.from(el.querySelectorAll('.mega-menu-block .dropdown-submenu'));
        if (!this.element.classList.contains('section-selected') && !Array.from(this.parents).some(parent => parent.classList.contains('nav-hover'))) {
          removeFadeInUpAnimation(megaMenuChildrenArray);
        }
      });
    } else {
      document.querySelectorAll('.site-nav--has-dropdown').forEach(dropdown => {
        dropdown.classList.remove(this.activeClass);
      });
      if (!this.element.classList.contains('section-selected') && !Array.from(this.parents).some(parent => parent.classList.contains('nav-hover'))) {
        removeFadeInUpAnimation(this.megaMenuChildren);
      }
    }
    document.body.removeEventListener('touchstart', this.handleBodyTouchStart);
    if (!document.querySelector('.nav-hover')) {
      const stickyHeader = document.querySelector('.sticky-header');
      if (stickyHeader) {
        stickyHeader.classList.add('sticky-header-transformed');
      }
    }
  }
  setDropdownOffset(el) {
    const dropdown = el.querySelector('.site-nav__dropdown.standard-dropdown');
    if (!dropdown) return;
    const navPosition = dropdown.getAttribute('data-logo-placement');
    const dropdownRight = window.innerWidth - (dropdown.getBoundingClientRect().left + dropdown.offsetWidth);
    if (dropdownRight < 15) {
      dropdown.style.right = '0';
      dropdown.style.left = 'auto';
    }

    // Get all subdropdown elements and apply the same logic to each one.
    const subDropdowns = dropdown.querySelectorAll('.site-nav__subdropdown');
    subDropdowns.forEach(subDropdown => {
      const subDropdownRight = window.innerWidth - (subDropdown.getBoundingClientRect().left + subDropdown.offsetWidth);
      if (subDropdownRight < 15) {
        if (navPosition === 'left' || navPosition === 'above') {
          subDropdown.style.left = 'auto';
          subDropdown.style.right = '100%';
        } else {
          subDropdown.style.left = '100%';
          subDropdown.style.right = 'auto';
        }
      }
    });
  }
}
;// ./src/javascripts/sections/Header.js





class Header extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   * @param {boolean} pageLoad
   */
  constructor(theme, _element, pageLoad) {
    super(theme, _element, pageLoad);
    this.handleStickyHeaderVars = () => {
      const isStickyHeader = this.element.dataset.headerSticky === 'true';
      if (isStickyHeader) {
        this.setStickyHeaderVar('.mobile-nav-bar-wrapper', '--sticky-header-mobile-height');
        this.setStickyHeaderVar('.site-header', '--sticky-header-desktop-height');
      } else {
        this.resetStickyHeaderVar('--sticky-header-mobile-height');
        this.resetStickyHeaderVar('--sticky-header-desktop-height');
      }
      this.setStickyHeaderVar('.mobile-nav-bar-wrapper', '--header-height-mobile');
      this.setStickyHeaderVar('.site-header', '--header-height-desktop');
    };
    this.setStickyHeaderVar = (selector, varName) => {
      const header = this.element.querySelector(selector);
      const headerHeight = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(varName, `${headerHeight}px`);
    };
    this.resetStickyHeaderVar = varName => {
      document.documentElement.style.setProperty(varName, `0px`);
    };
    this.onCartUpdate = e => {
      Array.prototype.forEach.call(document.querySelectorAll('.cart-item-count-header--quantity'), el => {
        el.classList.add('hide');
        const cartHasItems = e.detail.cart.item_count > 0;
        el.textContent = e.detail.cart.item_count;
        if (cartHasItems) el.classList.remove('hide');
      });
    };
    this.onCartButtonClick = e => {
      e.preventDefault();
      window.eventBus.emit('open:cart:drawer', {
        scrollToTop: false
      });
    };
    this.onOffersLinkClick = e => {
      e.preventDefault();
      window.eventBus.emit('open:offers:drawer');
    };
    this.onMobileMenuButtonClick = e => {
      e.preventDefault();
      this.mobileMenu.toggle();
    };
    this.loadSearchDrawer = () => {
      document.querySelectorAll('.search-button').forEach(item => {
        item.addEventListener('click', this.onSearch);
      });
    };
    this.onSearch = e => {
      e.preventDefault();
      window.eventBus.emit('toggle:search:dropdown', e);
    };
    this.loadAccessibleMenu = () => {
      const siteNav = this.element.querySelector('.site-nav');
      if (siteNav) {
        siteNav.classList.add('js');
      }
      this.element.querySelectorAll('.site-nav li a').forEach(anchor => {
        anchor.addEventListener('focus', function () {
          const parent = this.parentElement;
          if (parent) {
            const ul = parent.querySelector('ul');
            if (ul) {
              ul.style.display = 'block';
            }
          }
        });
      });
      this.element.querySelectorAll('.site-nav li li a').forEach(anchor => {
        anchor.removeEventListener('focus', () => {});
      });
      this.element.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', e => {
          const a = /** @type {HTMLAnchorElement} */e.currentTarget;
          if (a.href && a.href.split('#')[0] === window.location.href.split('#')[0]) {
            // Anchor on same page - just close the drawer
            this.theme.toggleLeftDrawer(false);
          }
        });
      });
      this.tabindexMobileNav();
    };
    this.tabindexMobileNav = () => {
      // Mobile menu should not be keyboard-navigable while viewing on desktop.
      const navDrawerLinks = this.element.querySelectorAll('#NavDrawer a, #NavDrawer button');
      if (window.innerWidth > 767) {
        navDrawerLinks.forEach(link => link.setAttribute('tabindex', '-1'));
      } else {
        navDrawerLinks.forEach(link => link.removeAttribute('tabindex'));
      }
    };
    this.onWindowResize = () => {
      this.tabindexMobileNav();
      this.handleStickyHeaderVars();
    };
    // Sticky page header
    this.loadStickyHeader = () => {
      if ('IntersectionObserver' in window) {
        // We need to apply sticky to child of element that is being scrolled, in
        // this case it's the whole `shopify-section`
        const headerWrapper = this.element.closest('.shopify-section.header-section');
        headerWrapper.classList.add('sticky-header');
        const observer = new IntersectionObserver(([e]) => {
          if (e.intersectionRatio < 1) {
            e.target.classList.add('sticked');
            // Dispatch a custom event when the header becomes 'sticked'
            const stickedEvent = new CustomEvent('headerSticked', {
              detail: e.target
            });
            document.dispatchEvent(stickedEvent);
          } else {
            e.target.classList.remove('sticked');
            // Dispatch a custom event when the header becomes 'unstuck'
            const unstuckEvent = new CustomEvent('headerUnstuck', {
              detail: e.target
            });
            document.dispatchEvent(unstuckEvent);
          }
        }, {
          threshold: [1]
        });
        observer.observe(headerWrapper);
      }
    };
    this.loadHeaderObserver = () => {
      if ('IntersectionObserver' in window) {
        const headerWrapper = this.element.closest('.shopify-section.header-section');
        const observer = new IntersectionObserver(([e]) => {
          if (e.intersectionRatio > 0) {
            e.target.classList.remove('is-off-screen');
          } else {
            e.target.classList.add('is-off-screen');
          }
        }, {
          threshold: [0]
        });
        observer.observe(headerWrapper);
      }
    };
    this.onBlockSelect = ({
      element
    }) => {
      // Prevent menu reopening on deselect due to editor event bug where select event is fired on deselect after editing a text input setting
      if (document.body.hasAttribute('data-mega-menu-deselected')) return;

      // Open mega menu and make overlay force-hovered
      if (element.dataset.megaMenuBlockId) {
        const megaMenu = this.element.querySelector(`[data-mega-menu-block-id='${element.dataset.megaMenuBlockId}']`);
        if (megaMenu) {
          const li = megaMenu.closest('li.mega-menu');
          if (li) {
            li.classList.add('force-open');
          }
        }
        const overlayHeader = this.element.querySelector('.overlay-header');
        if (overlayHeader) {
          overlayHeader.classList.add('force-hover');
        }
        const megaMenuChildrenArray = Array.from(this.element.querySelectorAll('li.mega-menu.force-open .mega-menu-block .dropdown-submenu'));
        initiateFadeInUpAnimation(megaMenuChildrenArray); // Initiate mega menu animation
      }
    };
    this.onBlockDeselect = () => {
      // Needed to prevent menu reopening on deselect due to editor event bug where select event is fired on deselect after editing a text input setting
      document.body.setAttribute('data-mega-menu-deselected', 'true');
      setTimeout(() => {
        document.body.removeAttribute('data-mega-menu-deselected');
      }, 500);

      // Close mega menu and make overlay non-hovered
      this.element.querySelectorAll('li.mega-menu.force-open').forEach(li => li.classList.remove('force-open'));
      this.element.querySelectorAll('.overlay-header').forEach(header => header.classList.remove('force-hover'));
      const megaMenuChildrenArray = Array.from(this.element.querySelectorAll('li.mega-menu .mega-menu-block .dropdown-submenu'));
      removeFadeInUpAnimation(megaMenuChildrenArray); // Remove mega menu animation
    };
    this.handleExternalLinks = () => {
      const links = this.element.querySelectorAll('a');
      links.forEach(link => {
        if (link.hostname !== window.location.hostname) {
          link.target = '_blank';
          link.rel = 'noreferrer noopener';
        }
      });
    };
    this.element = _element;

    // Define named functions for event handlers
    this.handleCartButtonClick = this.onCartButtonClick.bind(this);
    this.handleMobileMenuButtonClick = this.onMobileMenuButtonClick.bind(this);
    this.handleNavDrawerOverlayClick = this.onNavDrawerOverlayClick.bind(this);
    this.handleCartUpdate = this.onCartUpdate.bind(this);
    this.handleOffersLinkClick = this.onOffersLinkClick.bind(this);
    Array.prototype.forEach.call(this.element.querySelectorAll('.js-drawer-open-right-link'), el => el.addEventListener('click', this.handleCartButtonClick));
    this.element.querySelector('.js-drawer-open-left-link').addEventListener('click', this.handleMobileMenuButtonClick);
    this.mobileMenu = new MobileMenu(theme, this.element.querySelector('.drawer--left'));

    // Offers drawer
    const offersLinks = this.element.querySelectorAll('.js-drawer-open-offers-link');
    if (offersLinks.length > 0) {
      offersLinks.forEach(el => el.addEventListener('click', this.handleOffersLinkClick));

      // If the icon setting is changed, need to inject the new icon in the drawer
      if (window.Shopify.designMode) {
        window.eventBus.emit('injectIcon:offers:drawer');
      }
    } else if (window.Shopify.designMode) {
      // If no offers icon and the drawer is open in the editor, close it
      window.eventBus.emit('close:offers:drawer');
    }
    document.documentElement.addEventListener(CART_UPDATE_EVENT, this.handleCartUpdate);
    this.handleStickyHeaderVars();

    // Close mobile menu on overlay click
    this.element.querySelector('#NavDrawerOverlay').addEventListener('click', this.handleNavDrawerOverlayClick);
    this.loadAccessibleMenu();
    if (this.element.dataset.headerSticky === 'true' && (this.element.dataset.inspectorActive == 'false' || !this.element.dataset.inspectorActive)) {
      this.loadStickyHeader();
    } else {
      this.loadHeaderObserver();
    }
    this.loadSearchDrawer();
    this.menu = new Menu(this, _element);
    this.handleExternalLinks();

    // Initialize ResizeObserver
    this.initResizeObserver();

    // Fallback: Add window resize listener in case ResizeObserver is not supported
    if (!('ResizeObserver' in window)) {
      window.addEventListener('resize', this.onWindowResize);
    }
  }
  initResizeObserver() {
    if ('ResizeObserver' in window) {
      // Create a new ResizeObserver instance
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target.classList.contains('mobile-nav-bar-wrapper') || entry.target.classList.contains('site-header')) {
            this.updateHeaderHeightVariables();
          }
        }
      });

      // Select the elements to observe
      const mobileNavBar = this.element.querySelector('.mobile-nav-bar-wrapper');
      const siteHeader = this.element.querySelector('.site-header');

      // Observe the elements if they exist
      if (mobileNavBar) this.resizeObserver.observe(mobileNavBar);
      if (siteHeader) this.resizeObserver.observe(siteHeader);
    }
  }
  updateHeaderHeightVariables() {
    this.handleStickyHeaderVars();
  }
  onNavDrawerOverlayClick() {
    this.theme.toggleLeftDrawer(false);
  }
  disconnectedCallback() {
    if (!('ResizeObserver' in window)) {
      window.removeEventListener('resize', this.onWindowResize);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
;// ./src/javascripts/sections/Footer.js

class Footer extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.fixFooterToBottom = () => {
      let heightOfContent = this.pageContainer.offsetHeight + this.footerWrapper.offsetHeight;
      this.footerWrapper.classList.remove('fix-to-bottom');

      // If the viewport is higher than the content.
      if (window.innerHeight > heightOfContent) {
        this.footerWrapper.classList.add('fix-to-bottom');
      }
    };
    this.onBlockSelect = () => {
      this.fixFooterToBottom();
    };
    this.footerWrapper = /** @type {HTMLElement} */document.querySelector('.footer-wrapper');
    this.footer = /** @type {HTMLElement} */document.querySelector('footer');
    this.pageContainer = /** @type {HTMLElement} */document.querySelector('#PageContainer');
    this.fixFooterToBottom();
    let self = this;
    document.addEventListener('shopify:section:load', this.fixFooterToBottom);
    document.addEventListener('shopify:section:unload', this.fixFooterToBottom);
    document.addEventListener('shopify:section:select', this.fixFooterToBottom);
    document.addEventListener('shopify:section:deselect', this.fixFooterToBottom);
    document.addEventListener('shopify:section:reorder', this.fixFooterToBottom);
  }
}
;// ./src/javascripts/sections/AnnouncementBar.js

class AnnouncementBar extends Section_Section {}
;// ./src/javascripts/global/KenBurns.js
class KenBurns {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   */
  constructor(theme, element) {
    this.load = () => {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              this.apply();
            }
          });
        }, {
          threshold: [0.1]
        });
        this.observer.observe(this.element);
      }
    };
    this.apply = () => {
      Array.prototype.forEach.call(this.element.querySelectorAll('.kb-enabled'), (el, index) => {
        setTimeout(() => {
          el.classList.add('in-viewport');
        }, 150 * index);
      });
    };
    this.reapply = () => {
      Array.prototype.forEach.call(this.element.querySelectorAll('.kb-enabled'), el => {
        if (el.classList.contains('in-viewport')) {
          // Reapply ken burns with a slight delay.
          el.classList.add('no-anim');
          el.classList.remove('in-viewport');
          setTimeout(() => {
            el.classList.remove('no-anim');
            el.classList.add('in-viewport');
          }, 150);
        }
      });
    };
    this.theme = theme;
    this.element = element;
    this.load();
  }
}
;// ./src/javascripts/sections/AnimatedText.js


class AnimatedText extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.kenBurns = new KenBurns(theme, element);
  }
}
;// ./src/javascripts/sections/CustomHtml.js

class CustomHtml extends Section_Section {}
;// ./src/javascripts/sections/Hero.js


class Hero extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.hoverEffect = link => {
      const overlayId = link.getAttribute('data-overlay-id');
      const overlay = document.getElementById(overlayId);
      if (!overlay) return;
      link.addEventListener('mouseenter', () => {
        overlay.classList.add("active");
      });
      link.addEventListener('mouseleave', () => {
        overlay.classList.remove("active");
      });

      // Apply hover on page load
      if (link.matches(':hover')) {
        overlay.classList.add("active");
      }
    };
    this.kenBurns = new KenBurns(theme, element);
    document.querySelectorAll('.homepage-hero-menu li').forEach(link => {
      this.hoverEffect(link);
    });
  }
}
;// ./node_modules/swiper/shared/ssr-window.esm.mjs
/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
}
function extend(target, src) {
  if (target === void 0) {
    target = {};
  }
  if (src === void 0) {
    src = {};
  }
  Object.keys(src).forEach(key => {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ''
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
function getDocument() {
  const doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return '';
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}



;// ./node_modules/swiper/shared/utils.mjs


function classesToTokens(classes) {
  if (classes === void 0) {
    classes = '';
  }
  return classes.trim().split(' ').filter(c => !!c.trim());
}

function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach(key => {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function utils_getComputedStyle(el) {
  const window = getWindow();
  let style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis) {
  if (axis === void 0) {
    axis = 'x';
  }
  const window = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = utils_getComputedStyle(el);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(a => a.replace(',', '.')).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }
  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function utils_isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function utils_extend() {
  const to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  for (let i = 1; i < arguments.length; i += 1) {
    const nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              utils_extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              utils_extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  let {
    swiper,
    targetPosition,
    side
  } = _ref;
  const window = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? 'next' : 'prev';
  const isOutOfBound = (current, target) => {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowRoot && slideEl.shadowRoot.querySelector('.swiper-slide-transform') || slideEl;
}
function elementChildren(element, selector) {
  if (selector === void 0) {
    selector = '';
  }
  const window = getWindow();
  const children = [...element.children];
  if (window.HTMLSlotElement && element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter(el => el.matches(selector));
}
function elementIsChildOfSlot(el, slot) {
  // Breadth-first search through all parent's children and assigned elements
  const elementsQueue = [slot];
  while (elementsQueue.length > 0) {
    const elementToCheck = elementsQueue.shift();
    if (el === elementToCheck) {
      return true;
    }
    elementsQueue.push(...elementToCheck.children, ...(elementToCheck.shadowRoot?.children || []), ...(elementToCheck.assignedElements?.() || []));
  }
}
function elementIsChildOf(el, parent) {
  const window = getWindow();
  let isChild = parent.contains(el);
  if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    isChild = children.includes(el);
    if (!isChild) {
      isChild = elementIsChildOfSlot(el, parent);
    }
  }
  return isChild;
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
    // err
  }
}
function createElement(tag, classes) {
  if (classes === void 0) {
    classes = [];
  }
  const el = document.createElement(tag);
  el.classList.add(...(Array.isArray(classes) ? classes : classesToTokens(classes)));
  return el;
}
function elementOffset(el) {
  const window = getWindow();
  const document = getDocument();
  const box = el.getBoundingClientRect();
  const body = document.body;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = el === window ? window.scrollY : el.scrollTop;
  const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window = getWindow();
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return undefined;
}
function elementParents(el, selector) {
  const parents = []; // eslint-disable-line
  let parent = el.parentElement; // eslint-disable-line
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener('transitionend', fireCallBack);
  }
  if (callback) {
    el.addEventListener('transitionend', fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window = getWindow();
  if (includeMargins) {
    return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
  }
  return el.offsetWidth;
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter(e => !!e);
}
function getRotateFix(swiper) {
  return v => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 0.001;
    }
    return v;
  };
}



;// ./node_modules/swiper/shared/swiper-core.mjs



let support;
function calcSupport() {
  const window = getWindow();
  const document = getDocument();
  return {
    smoothScroll: document.documentElement && document.documentElement.style && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

let deviceCached;
function calcDevice(_temp) {
  let {
    userAgent
  } = _temp === void 0 ? {} : _temp;
  const support = getSupport();
  const window = getWindow();
  const platform = window.navigator.platform;
  const ua = userAgent || window.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === 'Win32';
  let macos = platform === 'MacIntel';

  // iPadOs 13 fix
  const iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  }

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }

  // Export object
  return device;
}
function getDevice(overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

let browser;
function calcBrowser() {
  const window = getWindow();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    const ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      const [major, minor] = ua.split('Version/')[1].split(' ')[0].split('.').map(num => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

function Resize(_ref) {
  let {
    swiper,
    on,
    emit
  } = _ref;
  const window = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(entries => {
      animationFrame = window.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(_ref2 => {
          let {
            contentBoxSize,
            contentRect,
            target
          } = _ref2;
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };
  on('init', () => {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

function Observer(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const observers = [];
  const window = getWindow();
  const attach = function (target, options) {
    if (options === void 0) {
      options = {};
    }
    const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    const observer = new ObserverFunc(mutations => {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: swiper.isElement || (typeof options.childList === 'undefined' ? true : options).childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    // Observe container
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });

    // Observe wrapper
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach(observer => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

/* eslint-disable no-underscore-dangle */

var eventsEmitter = {
  on(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(event => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    function onceHandler() {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    const method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(event => {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit() {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events;
    let data;
    let context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(event => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(eventHandler => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(eventHandler => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};

function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }

  // Subtract paddings
  width = width - parseInt(elementStyle(el, 'padding-left') || 0, 10) - parseInt(elementStyle(el, 'padding-right') || 0, 10);
  height = height - parseInt(elementStyle(el, 'padding-top') || 0, 10) - parseInt(elementStyle(el, 'padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}

function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween;

  // reset margins
  slides.forEach(slideEl => {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, '--swiper-centered-offset-before', '');
    setCSSProperty(wrapperEl, '--swiper-centered-offset-after', '');
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }

  // Calc slides
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(key => {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    let slide;
    if (slides[i]) slide = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide, slides);
    }
    if (slides[i] && elementStyle(slide, 'display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slides[i].style[swiper.getDirectionLabel('width')] = ``;
      }
      const slideStyles = getComputedStyle(slide);
      const currentTransform = slide.style.transform;
      const currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide, 'width', true) : elementOuterSize(slide, 'height', true);
      } else {
        // eslint-disable-next-line
        const width = getDirectionPropertyValue(slideStyles, 'width');
        const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        const boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[swiper.getDirectionLabel('width')] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel('width')] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? 'marginLeft' : swiper.getDirectionLabel('marginRight');
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(slideEl => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map(snap => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach(slideSizeValue => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, '--swiper-centered-offset-after', `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit('slidesUpdated');
  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}

function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = index => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach(slide => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}

function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  // eslint-disable-next-line
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate) {
  if (translate === void 0) {
    translate = this && this.translate || 0;
  }
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiper.size;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i];
    let slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

function updateProgress(translate) {
  const swiper = this;
  if (typeof translate === 'undefined') {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

const toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = selector => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.find(slideEl => slideEl.column === activeIndex);
      nextSlide = slides.find(slideEl => slideEl.column === activeIndex + 1);
      prevSlide = slides.find(slideEl => slideEl.column === activeIndex - 1);
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      // Next Slide
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }

      // Prev Slide
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach(slideEl => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}

const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        // init later
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl) lazyEl.remove();
  }
};
const unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};
const preload = swiper => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};

function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = aIndex => {
    let realIndex = aIndex - swiper.virtual.slidesBefore;
    if (realIndex < 0) {
      realIndex = swiper.virtual.slides.length + realIndex;
    }
    if (realIndex >= swiper.virtual.slides.length) {
      realIndex -= swiper.virtual.slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;

  // Get real index
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find(slideEl => slideEl.column === activeIndex);
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute('data-swiper-slide-index'), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute('data-swiper-slide-index');
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    swiper.emit('slideChange');
  }
}

function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach(pathEl => {
      if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};

function getSwiperTranslate(axis) {
  if (axis === void 0) {
    axis = this.isHorizontal() ? 'x' : 'y';
  }
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

function setTranslate(translate, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }

  // Check if we need to update progress
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

function minTranslate() {
  return -this.snapGrid[0];
}

function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
  if (translate === void 0) {
    translate = 0;
  }
  if (speed === void 0) {
    speed = this.params.speed;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (translateBounds === void 0) {
    translateBounds = true;
  }
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate = swiper.minTranslate();
  const maxTranslate = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: -newTranslate,
        behavior: 'smooth'
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}

var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};

function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : '';
  }
  swiper.emit('setTransition', duration, byController);
}

function transitionEmit(_ref) {
  let {
    swiper,
    runCallbacks,
    direction,
    step
  } = _ref;
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit(`slideResetTransition${step}`);
      return;
    }
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === 'next') {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}

function transitionStart(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'Start'
  });
}

function transitionEnd(runCallbacks, direction) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: 'End'
  });
}

var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};

function slideTo(index, speed, runCallbacks, internal, initial) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate = -snapGrid[snapIndex];
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);
  let direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset';

  // initial virtual
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  // Update Index
  if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate : -translate;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? 'left' : 'top']: t,
        behavior: 'smooth'
      });
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}

function slideToLoop(index, speed, runCallbacks, internal) {
  if (index === void 0) {
    index = 0;
  }
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides
      } = swiper.params;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (centeredSlides && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (centeredSlides) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && centeredSlides && swiper.params.slidesPerView !== 'auto' && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? 'prev' : 'next' : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? 'next' : 'prev';
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === 'next' ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === 'next' ? swiper.realIndex : undefined
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === slideIndex).column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}

/* eslint no-unused-vars: "off" */
function slideNext(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'next'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slidePrev(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'prev'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate);
  const normalizedSnapGrid = snapGrid.map(val => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideReset(speed, runCallbacks, internal) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/* eslint no-unused-vars: "off" */
function slideToClosest(speed, runCallbacks, internal, threshold) {
  if (runCallbacks === void 0) {
    runCallbacks = true;
  }
  if (threshold === void 0) {
    threshold = 0.5;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.clickedIndex;
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};

function loopCreate(slideRealIndex) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute('data-swiper-slide-index', index);
    });
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = amountOfSlides => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? createElement('swiper-slide', [params.slideBlankClass]) : createElement('div', [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning('Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning('Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)');
    }
    initSlides();
  } else {
    initSlides();
  }
  swiper.loopFix({
    slideRealIndex,
    direction: params.centeredSlides ? undefined : 'next'
  });
}

function loopFix(_temp) {
  let {
    slideRealIndex,
    slideTo = true,
    direction,
    setTranslate,
    activeSlideIndex,
    byController,
    byMousewheel
  } = _temp === void 0 ? {} : _temp;
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides
  } = params;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === 'auto') {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (centeredSlides && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides) {
    showWarning('Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters');
  } else if (gridEnabled && params.grid.fill === 'row') {
    showWarning('Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`');
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  let activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(slides.find(el => el.classList.contains(params.slideActiveClass)));
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === 'next' || !direction;
  const isPrev = direction === 'prev' || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === 'undefined' ? -slidesPerView / 2 + 0.5 : 0);
  // prepend last slides before start
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i = slides.length - 1; i >= 0; i -= 1) {
          if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
        }
        // slides.forEach((slide, slideIndex) => {
        //   if (slide.column === colIndexToPrepend) prependSlidesIndexes.push(slideIndex);
        // });
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide, slideIndex) => {
          if (slide.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (isPrev) {
    prependSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach(index => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach(c => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
      });
    }
  }
  swiper.emit('loopFix');
}

function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach(slideEl => {
    const index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach(slideEl => {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach(slideEl => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}

var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};

function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}

var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};

// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector, base) {
  if (base === void 0) {
    base = this;
  }
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event, startX) {
  const window = getWindow();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart(event) {
  const swiper = this;
  const document = getDocument();
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === 'pointerdown') {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === 'touchstart' && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === 'touchstart') {
    // don't proceed touch event
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === 'wrapper') {
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
  }
  if ('which' in e && e.which === 3) return;
  if ('button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === 'mouse' || e.pointerType !== 'mouse' && !targetEl.matches(data.focusableElements))) {
    document.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}

function onTouchMove(event) {
  const document = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === 'pointermove') {
    if (data.touchId !== null) return; // return from pointer if we use touch
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === 'touchmove') {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== 'mouse') {
    document.activeElement.blur();
  }
  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === 'touchmove' && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === 'next' && swiper.allowSlideNext || swiper.touchesDirection === 'prev' && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  let loopFixed;
  new Date().getTime();
  if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
      swiper.loopFix({
        direction: 'prev',
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== 'auto' && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === 'touchend' || e.type === 'touchcancel';
  if (!isTouchEvent) {
    if (data.touchId !== null) return; // return from pointer if we use touch
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].find(t => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (['pointercancel', 'pointerout', 'pointerleave', 'contextmenu'].includes(e.type)) {
    const proceed = ['pointercancel', 'contextmenu'].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === 'mouse') return;
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }

  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }

  // Find current slide
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment] !== 'undefined') {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}

function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = 'auto';
  }
}

const events = (swiper, method) => {
  const document = getDocument();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  const swiperMethod = method;
  if (!el || typeof el === 'string') return;

  // Touch Events
  document[domMethod]('touchstart', swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]('touchstart', swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]('pointerdown', swiper.onTouchStart, {
    passive: false
  });
  document[domMethod]('touchmove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('pointermove', swiper.onTouchMove, {
    passive: false,
    capture
  });
  document[domMethod]('touchend', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerup', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointercancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('touchcancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerout', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerleave', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('contextmenu', swiper.onTouchEnd, {
    passive: true
  });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
  } else {
    swiper[swiperMethod]('observerUpdate', onResize, true);
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  events(swiper, 'on');
}
function detachEvents() {
  const swiper = this;
  events(swiper, 'off');
}
var events$1 = {
  attachEvents,
  detachEvents
};

const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
  const document = getDocument();

  // Get breakpoint for window/container width and update parameters
  const breakpointsBase = params.breakpointsBase === 'window' || !params.breakpointsBase ? params.breakpointsBase : 'container';
  const breakpointContainer = ['window', 'container'].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
  const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(prop => {
    if (typeof breakpointParams[prop] === 'undefined') return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  utils_extend(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit('breakpoint', breakpointParams);
}

function getBreakpoint(breakpoints, base, containerEl) {
  if (base === void 0) {
    base = 'window';
  }
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  let breakpoint = false;
  const window = getWindow();
  const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints).map(point => {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

var breakpoints = {
  setBreakpoint,
  getBreakpoint
};

function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach(item => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(classNames => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper;
  // prettier-ignore
  const suffixes = prepareClasses(['initialized', params.direction, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}

function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === 'string') return;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}

var classes = {
  addClasses,
  removeClasses
};

function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var checkOverflow$1 = {
  checkOverflow
};

var defaults = {
  init: true,
  direction: 'horizontal',
  oneWayMovement: false,
  swiperElementNodeName: 'SWIPER-CONTAINER',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: 'swiper',
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-blank',
  slideActiveClass: 'swiper-slide-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideFullyVisibleClass: 'swiper-slide-fully-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  wrapperClass: 'swiper-wrapper',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};

function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj) {
    if (obj === void 0) {
      obj = {};
    }
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== 'object' || moduleParams === null) {
      utils_extend(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === 'navigation' && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (['pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      utils_extend(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    utils_extend(allModulesParams, obj);
  };
}

/* eslint no-param-reassign: "off" */
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
class Swiper {
  constructor() {
    let el;
    let params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = utils_extend({}, params);
    if (el && !params.el) params.el = el;
    const document = getDocument();
    if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document.querySelectorAll(params.el).forEach(containerEl => {
        const newParams = utils_extend({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers;
    }

    // Swiper Instance
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach(mod => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });

    // Extend defaults with modules params
    const swiperParams = utils_extend({}, defaults, allModulesParams);

    // Extend defaults with passed params
    swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = utils_extend({}, swiper.params);
    swiper.passedParams = utils_extend({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(eventName => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.find(slideEl => slideEl.getAttribute('data-swiper-slide-index') * 1 === index));
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit('enable');
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit('disable');
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(' ').filter(className => {
      return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit('_containerClasses', cls.join(' '));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return '';
    return slideEl.className.split(' ').filter(className => {
      return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(' ');
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach(slideEl => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit('_slideClass', slideEl, classNames);
    });
    swiper.emit('_slideClasses', updates);
  }
  slidesPerViewDynamic(view, exact) {
    if (view === void 0) {
      view = 'current';
    }
    if (exact === void 0) {
      exact = false;
    }
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === 'number') return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      // eslint-disable-next-line
      if (view === 'current') {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        // previous
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit('update');
  }
  changeDirection(newDirection, needUpdate) {
    if (needUpdate === void 0) {
      needUpdate = true;
    }
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach(slideEl => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });
    swiper.emit('changeDirection');
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
    swiper.rtl = direction === 'rtl';
    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'rtl';
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'ltr';
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;

    // Find el
    let el = element || swiper.params.el;
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        // Children needs to return slot items
        return res;
      }
      return elementChildren(el, getWrapperSelector())[0];
    };
    // Find Wrapper
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement('div', swiper.params.wrapperClass);
      el.append(wrapperEl);
      elementChildren(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl',
      rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || elementStyle(el, 'direction') === 'rtl'),
      wrongRTL: elementStyle(wrapperEl, 'display') === '-webkit-box'
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }

    // Slide To Initial Slide
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Attach events
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach(imageEl => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener('load', e => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);

    // Init Flag
    swiper.initialized = true;
    preload(swiper);

    // Emit
    swiper.emit('init');
    swiper.emit('afterInit');
    return swiper;
  }
  destroy(deleteInstance, cleanStyles) {
    if (deleteInstance === void 0) {
      deleteInstance = true;
    }
    if (cleanStyles === void 0) {
      cleanStyles = true;
    }
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
      return null;
    }
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== 'string') {
        el.removeAttribute('style');
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute('style');
      }
      if (slides && slides.length) {
        slides.forEach(slideEl => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute('style');
          slideEl.removeAttribute('data-swiper-slide-index');
        });
      }
    }
    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(eventName => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== 'string') {
        swiper.el.swiper = null;
      }
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    utils_extend(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach(m => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach(prototypeGroup => {
  Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);



;// ./node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes) {
  if (classes === void 0) {
    classes = '';
  }
  return `.${classes.trim().replace(/([\.:!+\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.')}`;
}



;// ./node_modules/swiper/modules/a11y.mjs




function A11y(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      containerRole: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null,
      scrollOnFocus: true
    }
  });
  swiper.a11y = {
    clicked: false
  };
  let liveRegion = null;
  let preventFocusHandler;
  let focusTargetSlideEl;
  let visibilityChangedTimestamp = new Date().getTime();
  function notify(message) {
    const notification = liveRegion;
    if (notification.length === 0) return;
    notification.innerHTML = '';
    notification.innerHTML = message;
  }
  function getRandomNumber(size) {
    if (size === void 0) {
      size = 16;
    }
    const randomChar = () => Math.round(16 * Math.random()).toString(16);
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el, role) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el, description) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElControls(el, controls) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-controls', controls);
    });
  }
  function addElLabel(el, label) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el, id) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el, live) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', true);
    });
  }
  function enableEl(el) {
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.setAttribute('aria-disabled', false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    const params = swiper.params.a11y;
    const targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
      const prevEls = makeElementsArray(swiper.navigation.prevEl);
      const nextEls = makeElementsArray(swiper.navigation.nextEl);
      if (nextEls.includes(targetEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          notify(params.lastSlideMessage);
        } else {
          notify(params.nextSlideMessage);
        }
      }
      if (prevEls.includes(targetEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          notify(params.firstSlideMessage);
        } else {
          notify(params.prevSlideMessage);
        }
      }
    }
    if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    const params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach(bulletEl => {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
        }
      }
      if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }
  const initNavEl = (el, wrapperId, message) => {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  const handlePointerDown = e => {
    if (focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target)) {
      preventFocusHandler = true;
    }
    swiper.a11y.clicked = true;
  };
  const handlePointerUp = () => {
    preventFocusHandler = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  const onVisibilityChange = e => {
    visibilityChangedTimestamp = new Date().getTime();
  };
  const handleFocus = e => {
    if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus) return;
    if (new Date().getTime() - visibilityChangedTimestamp < 100) return;
    const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    focusTargetSlideEl = slideEl;
    const isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    requestAnimationFrame(() => {
      if (preventFocusHandler) return;
      if (swiper.params.loop) {
        swiper.slideToLoop(parseInt(slideEl.getAttribute('data-swiper-slide-index')), 0);
      } else {
        swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
      }
      preventFocusHandler = false;
    });
  };
  const initSlides = () => {
    const params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    const slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach((slideEl, index) => {
        const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
        const ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  const init = () => {
    const params = swiper.params.a11y;
    swiper.el.append(liveRegion);

    // Container
    const containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }
    if (params.containerRole) {
      addElRole(containerEl, params.containerRole);
    }

    // Wrapper
    const wrapperEl = swiper.wrapperEl;
    const wrapperId = params.id || wrapperEl.getAttribute('id') || `swiper-wrapper-${getRandomNumber(16)}`;
    const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
    addElId(wrapperEl, wrapperId);
    addElLive(wrapperEl, live);

    // Slide
    initSlides();

    // Navigation
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(el => initNavEl(el, wrapperId, params.nextSlideMessage));
    }
    if (prevEl) {
      prevEl.forEach(el => initNavEl(el, wrapperId, params.prevSlideMessage));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    const document = getDocument();
    document.addEventListener('visibilitychange', onVisibilityChange);
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion) liveRegion.remove();
    let {
      nextEl,
      prevEl
    } = swiper.navigation ? swiper.navigation : {};
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }
    if (prevEl) {
      prevEl.forEach(el => el.removeEventListener('keydown', onEnterOrSpaceKey));
    }

    // Pagination
    if (hasClickablePagination()) {
      const paginationEl = makeElementsArray(swiper.pagination.el);
      paginationEl.forEach(el => {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }
    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    // Tab focus
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('focus', handleFocus, true);
      swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
      swiper.el.removeEventListener('pointerup', handlePointerUp, true);
    }
  }
  on('beforeInit', () => {
    liveRegion = createElement('span', swiper.params.a11y.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
  });
  on('afterInit', () => {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', () => {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', () => {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', () => {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', () => {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}



;// ./node_modules/swiper/shared/create-element-if-not-defined.mjs


function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(key => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement('div', checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}



;// ./node_modules/swiper/modules/pagination.mjs




function Pagination(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: number => number,
      formatFractionTotal: number => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper.params.pagination;
    if (!bulletEl) return;
    bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
    if (bulletEl) {
      bulletEl.classList.add(`${bulletActiveClass}-${position}`);
      bulletEl = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
      }
    }
  }
  function getMoveDirection(prevIndex, nextIndex, length) {
    prevIndex = prevIndex % length;
    nextIndex = nextIndex % length;
    if (nextIndex === prevIndex + 1) {
      return 'next';
    } else if (nextIndex === prevIndex - 1) {
      return 'previous';
    }
    return;
  }
  function onBulletClick(e) {
    const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
      if (moveDirection === 'next') {
        swiper.slideNext();
      } else if (moveDirection === 'previous') {
        swiper.slidePrev();
      } else {
        swiper.slideToLoop(index);
      }
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    const rtl = swiper.rtl;
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    // Current/Total
    let current;
    let previousIndex;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const bullets = swiper.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
        el.forEach(subEl => {
          subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(bulletEl => {
        const classesToRemove = [...['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(suffix => `${params.bulletActiveClass}${suffix}`)].map(s => typeof s === 'string' && s.includes(' ') ? s.split(' ') : s).flat();
        bulletEl.classList.remove(...classesToRemove);
      });
      if (el.length > 1) {
        bullets.forEach(bullet => {
          const bulletIndex = elementIndex(bullet);
          if (bulletIndex === current) {
            bullet.classList.add(...params.bulletActiveClass.split(' '));
          } else if (swiper.isElement) {
            bullet.setAttribute('part', 'bullet');
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        const bullet = bullets[current];
        if (bullet) {
          bullet.classList.add(...params.bulletActiveClass.split(' '));
        }
        if (swiper.isElement) {
          bullets.forEach((bulletEl, bulletIndex) => {
            bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
          });
        }
        if (params.dynamicBullets) {
          const firstDisplayedBullet = bullets[firstIndex];
          const lastDisplayedBullet = bullets[lastIndex];
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
            }
          }
          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(bullet => {
          bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = `${bulletsOffset}px`;
        });
      }
    }
    el.forEach((subEl, subElIndex) => {
      if (params.type === 'fraction') {
        subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach(fractionEl => {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach(totalEl => {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === 'progressbar') {
        let progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        const scale = (current + 1) / total;
        let scaleX = 1;
        let scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach(progressEl => {
          progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
          progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
        });
      }
      if (params.type === 'custom' && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render() {
    // Render Container
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
    let el = swiper.pagination.el;
    el = makeElementsArray(el);
    let paginationHTML = '';
    if (params.type === 'bullets') {
      let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          // prettier-ignore
          paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
    }
    swiper.pagination.bullets = [];
    el.forEach(subEl => {
      if (params.type !== 'custom') {
        subEl.innerHTML = paginationHTML || '';
      }
      if (params.type === 'bullets') {
        swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', el[0]);
    }
  }
  function init() {
    swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    const params = swiper.params.pagination;
    if (!params.el) return;
    let el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = [...document.querySelectorAll(params.el)];
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
      el = [...swiper.el.querySelectorAll(params.el)];
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        el = el.find(subEl => {
          if (elementParents(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        });
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el
    });
    el = makeElementsArray(el);
    el.forEach(subEl => {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(...(params.clickableClass || '').split(' '));
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    const params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    let el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(subEl => {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.classList.remove(...(params.clickableClass || '').split(' '));
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
  }
  on('changeDirection', () => {
    if (!swiper.pagination || !swiper.pagination.el) return;
    const params = swiper.params.pagination;
    let {
      el
    } = swiper.pagination;
    el = makeElementsArray(el);
    el.forEach(subEl => {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', () => {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', () => {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', () => {
    update();
  });
  on('snapGridLengthChange', () => {
    render();
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(subEl => subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass));
    }
  });
  on('lock unlock', () => {
    update();
  });
  on('click', (_s, e) => {
    const targetEl = e.target;
    const el = makeElementsArray(swiper.pagination.el);
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
    }
    init();
    render();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    let {
      el
    } = swiper.pagination;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable,
    disable,
    render,
    update,
    init,
    destroy
  });
}



;// ./src/javascripts/sections/BlogPosts.js




class BlogPosts extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.kenBurns = new KenBurns(theme, element);
    const swiperContainer = this.element.querySelector('.swiper');
    this.swiper = new Swiper(swiperContainer, {
      modules: [A11y, Pagination],
      slidesPerView: 1,
      watchOverflow: true,
      autoHeight: true,
      spaceBetween: 16,
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
        clickable: true
      }
    });
  }
}
;// ./src/javascripts/sections/CollectionList.js

class CollectionList extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.theme.addBadges(this.element, 1000);
  }
}
;// ./src/javascripts/sections/EventsCalendar.js


class EventsCalendar extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.kenBurns = new KenBurns(theme, element);
  }
}
;// ./src/javascripts/global/QuickAdd.js

class QuickAdd extends Component {
  constructor(theme, element) {
    super(theme, element);
    this.theme = theme;
    this.element = element;
    this.onSubmit = this.onSubmit.bind(this);
    this.cartAction = document.getElementById('PageContainer').dataset.cartAction;
    this.cartType = document.getElementById('PageContainer').dataset.cartType;
    this.languageUrl = document.getElementById('PageContainer').dataset.languageUrl;
    this.formWrappers = /** @type {NodeListOf<HTMLElement>} */this.element.querySelectorAll('.quick-add-wrapper.is-singular');
    this.wethemeGlobal = document.querySelector('script#wetheme-global');
    this.translationsObject = JSON.parse(this.wethemeGlobal.textContent);
    if (!this.formWrappers.length) {
      return;
    }
    this.formWrappers.forEach(wrapper => {
      const form = wrapper.querySelector('.shopify-product-form');
      if (form) {
        form.addEventListener('submit', this.onSubmit);
      }
    });
  }
  async onSubmit(e) {
    // Go straight to cart page, use html form submit event.
    if (this.cartType == 'page' && this.cartAction != 'show_added_message') {
      return;
    }
    e.preventDefault();
    const currentForm = e.currentTarget;
    const currentButton = currentForm.querySelector('.quick-add-button');
    const productWrapper = currentForm.closest('.quick-add-wrapper.is-singular');
    if (!productWrapper) {
      console.error('Product wrapper not found.');
      return false;
    }

    // Retrieve liveRegion
    const liveRegion = currentForm.querySelector('.sr-only[aria-live="polite"]');
    this.isDesktopQuickAdd = currentButton.classList.contains('quick-add-button-desktop');

    // Loading spinner.
    if (this.isDesktopQuickAdd) {
      currentButton.classList.add('is-loading');
      currentButton.innerHTML = `<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" class="spin flex-full"><g clip-path="url(#clip0_3605_47041)"><path d="M12.5 23C6.42487 23 1.5 18.0751 1.5 12C1.5 5.92487 6.42487 1 12.5 1C18.5751 1 23.5 5.92487 23.5 12C23.5 15.1767 22.1534 18.0388 20 20.0468" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g><defs><clipPath id="clip0_3605_47041"><rect width="24" height="24" fill="none" transform="translate(0.5)"/></clipPath></defs>${this.translationsObject.translations.loading}</svg>`;
    }
    try {
      const formData = new FormData(currentForm);
      const data = new URLSearchParams(formData).toString();
      const response = await window.fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      });
      if (!response.ok) {
        // FIXME: error handling
        return false;
      }

      // Update cart drawer
      if (this.cartType == 'drawer') {
        const responseJson = await response.json();
        window.eventBus.emit('update:cart:drawer', responseJson);
      }
      const languageParam = !this.languageUrl || this.languageUrl == '/' ? '' : this.languageUrl;
      const response2 = await window.fetch(`${languageParam}/cart?view=compare`);
      if (!response2.ok) {
        // FIXME: error handling
        return false;
      }
      const cart = await response2.json();
      if (this.cartType == 'drawer' && this.cartAction == 'go_to_or_open_cart') {
        window.eventBus.emit('open:cart:drawer', {
          scrollToTop: true
        });
      } else {
        if (this.isDesktopQuickAdd) {
          currentButton.classList.remove('is-loading');
          currentButton.innerHTML = this.translationsObject.translations.productAdded;
        }
      }
      if (this.cartType == 'drawer') {
        const successMessage = productWrapper.getAttribute('data-product-added');
        if (liveRegion && successMessage) {
          liveRegion.textContent = successMessage;
        }
      }
      this.theme.updateCartCount(cart);
      if (this.isDesktopQuickAdd) {
        setTimeout(() => {
          const translationKey = currentButton.dataset.addToCartTranslationKey || 'addToCart';
          currentButton.classList.remove('is-loading');
          currentButton.innerHTML = this.translationsObject.translations[translationKey];
        }, 2000);
      }
    } catch (e) {
      console.error('Unable to add to cart: ', e);
      // FIXME error handling
    }
    return false;
  }
}
;// ./src/javascripts/sections/FeaturedCollection.js


class FeaturedCollection extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   * @param {boolean} pageLoad
   */

  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    // check if we're on mobile
    this.isMobile = () => {
      return window.matchMedia('(max-width: 1023px)').matches;
    };
    this.quickAddButtons = new QuickAdd(theme, element);
    this.theme.addBadges(this.element, 1000);
  }
}
;// ./src/javascripts/sections/InteractiveMenu.js

class InteractiveMenu extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
  }
}
;// ./src/javascripts/sections/ShopTheLook.js



class ShopTheLook extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.onSectionSelect = () => {
      this.kenBurns.reapply();
    };
    this.attachEvents();
    this.quickAddButtons = new QuickAdd(window.wetheme, element);
    this.kenBurns = new KenBurns(theme, element);
    this.theme.addBadges(this.element, 1000);
  }
  attachEvents() {
    // The css transform applied by the global fadeInUp animation breaks the fixed positioning of the section modal, so we need to remove it once the animation is complete
    this.element.addEventListener('animationend', e => {
      if (e.animationName === 'fadeIn') {
        this.element.classList.remove('fadeIn');
      }
    });
  }
}
;// ./src/javascripts/sections/ImageWithTextSlideshow.js

class ImageWithTextSlideshow extends Section_Section {}
;// ./src/javascripts/sections/FooterNewsletter.js

class FooterNewsletter extends (/* unused pure expression or super */ null && (Section)) {}
;// ./src/javascripts/sections/ImageGallery.js


class ImageGallery extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.kenBurns = new KenBurns(theme, element);

    // For reveal button on hover animation
    this.hiddenButton = this.element.querySelector('.content-grid-item__text--reveal-btn-on-hover .content-grid-item__button');
    this.setButtonHeightVar();
  }
  setButtonHeightVar() {
    if (!this.hiddenButton) return;
    const buttonHeight = Math.max(30, this.hiddenButton.offsetHeight || 0);
    this.element.style.setProperty('--gallery-item-height', `${buttonHeight}px`);
  }
}
;// ./src/javascripts/sections/ImageWithTextOverlay.js


class ImageWithTextOverlay extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   * @param {boolean} pageLoad
   */
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.onSectionSelect = () => {
      this.kenBurns.reapply();
    };
    this.kenBurns = new KenBurns(theme, element);
  }
}
;// ./src/javascripts/sections/ImageWithText.js


class ImageWithText extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.onSectionSelect = () => {
      this.kenBurns.reapply();
    };
    this.kenBurns = new KenBurns(theme, element);
  }
}
;// ./src/javascripts/sections/CollectionHeader.js

class CollectionHeader extends ImageWithText {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   * @param {boolean} pageLoad
   */
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
  }
}
;// ./src/javascripts/sections/LogoList.js

class LogoList extends Section_Section {}
;// ./node_modules/swiper/modules/navigation.mjs



function Navigation(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  function getEl(el) {
    let res;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === 'string' && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    // if (Array.isArray(res) && res.length === 1) res = res[0];
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach(subEl => {
      if (subEl) {
        subEl.classList[disabled ? 'add' : 'remove'](...params.disabledClass.split(' '));
        if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update() {
    // Update Navigation Buttons
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el, dir) => {
      if (el) {
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(' '));
      }
    };
    nextEl.forEach(el => initButton(el, 'next'));
    prevEl.forEach(el => initButton(el, 'prev'));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(' '));
    };
    nextEl.forEach(el => destroyButton(el, 'next'));
    prevEl.forEach(el => destroyButton(el, 'prev'));
  }
  on('init', () => {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', () => {
    update();
  });
  on('destroy', () => {
    destroy();
  });
  on('enable disable', () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (swiper.enabled) {
      update();
      return;
    }
    [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.add(swiper.params.navigation.lockClass));
  });
  on('click', (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find(pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [...nextEl, ...prevEl].filter(el => !!el).forEach(el => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(' '));
    init();
    update();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(' '));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update,
    init,
    destroy
  });
}



;// ./node_modules/swiper/modules/autoplay.mjs


/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit,
    params
  } = _ref;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
  let autoplayTimeLeft;
  let autoplayStartTime = new Date().getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.find(slideEl => slideEl.classList.contains('swiper-slide-active'));
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
    return currentSlideDelay;
  };
  const run = delayForce => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };
  const start = () => {
    autoplayStartTime = new Date().getTime();
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit('autoplayStop');
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit('autoplayPause');
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document = getDocument();
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };
  const onPointerEnter = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = e => {
    if (e.pointerType !== 'mouse') return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== 'string') {
      swiper.el.removeEventListener('pointerenter', onPointerEnter);
      swiper.el.removeEventListener('pointerleave', onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document = getDocument();
    document.addEventListener('visibilitychange', onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on('destroy', () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on('_freeModeStaticRelease', () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on('_freeModeNoMomentumRelease', () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on('touchEnd', () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on('slideChange', () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}



;// ./node_modules/swiper/shared/effect-init.mjs
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on('beforeInit', () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', () => {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      swiper.slides.forEach(slideEl => {
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(shadowEl => shadowEl.remove());
      });
      // create new one
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on('virtualUpdate', () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}



;// ./node_modules/swiper/shared/effect-target.mjs


function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style['-webkit-backface-visibility'] = 'hidden';
  }
  return transformEl;
}



;// ./node_modules/swiper/shared/effect-virtual-transition-end.mjs


function effectVirtualTransitionEnd(_ref) {
  let {
    swiper,
    duration,
    transformElements,
    allSlides
  } = _ref;
  const {
    activeIndex
  } = swiper;
  const getSlide = el => {
    if (!el.parentElement) {
      // assume shadow root
      const slide = swiper.slides.find(slideEl => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode);
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter(transformEl => {
        const el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach(el => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}



;// ./node_modules/swiper/modules/effect-fade.mjs





function EffectFade(_ref) {
  let {
    swiper,
    extendParams,
    on
  } = _ref;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition = duration => {
    const transformElements = swiper.slides.map(slideEl => getSlideTransformEl(slideEl));
    transformElements.forEach(el => {
      el.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: 'fade',
    swiper,
    on,
    setTranslate,
    setTransition,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}



;// ./node_modules/swiper/modules/keyboard.mjs



/* eslint-disable consistent-return */
function Keyboard(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  const document = getDocument();
  const window = getWindow();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });
  function handle(event) {
    if (!swiper.enabled) return;
    const {
      rtlTranslate: rtl
    } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
        return undefined;
      }
      const el = swiper.el;
      const swiperWidth = el.clientWidth;
      const swiperHeight = el.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = elementOffset(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }
  on('init', () => {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable,
    disable
  });
}



;// ./src/javascripts/global/Slider.js


class Slider {
  constructor(theme, element, options) {
    this.stop = () => {
      if (this.element.querySelectorAll('.swiper-slide').length <= 1) {
        return;
      }
      this.swiper.autoplay.stop();
    };
    this.start = () => {
      if (this.element.querySelectorAll('.swiper-slide').length <= 1) {
        return;
      }
      this.swiper.autoplay.start();
    };
    this.isRunning = () => {
      return this.swiper.autoplay.running;
    };
    /**
     * @param {number} index
     */
    this.slideTo = (index, skipAnimation = false) => {
      this.swiper.slideTo(index, skipAnimation ? 0 : 200);
    };
    /**
     * @param {number} index
     */
    this.slideToLoop = (index, skipAnimation = false) => {
      this.swiper.slideToLoop(index, skipAnimation ? 0 : 200);
    };
    this.onSlideChange = () => {
      if (this.slideChangeCallback) {
        this.slideChangeCallback();
      }
    };
    this.setAutoHeight = () => {
      this.autoHeightEnabled = false;
      if (this.desktopHeight && this.mobileHeight) {
        if (!this.isMobile() && this.desktopHeight == 'original') {
          this.autoHeightEnabled = true;
        } else if (this.isMobile() && this.mobileHeight == 'original') {
          this.autoHeightEnabled = true;
        }
      }
      return this.autoHeightEnabled;
    };
    this.configure = () => {
      let paginationStyle = this.paginationType;
      let paginationElement = this.element.querySelector('.swiper-pagination');
      if (this.element.querySelectorAll('.swiper-slide').length <= 1) {
        return;
      }
      const swiper = new Swiper(this.element, {
        modules: this.swiperModules,
        allowTouchMove: this.isDraggable == 'true' ? true : false,
        autoHeight: this.autoHeightEnabled,
        loop: true,
        loopedSlides: this.effect === 'fade' ? 0 : 2,
        autoplay: this.speed > 0 ? {
          delay: this.speed,
          disableOnInteraction: false
        } : false,
        effect: this.effect,
        slidesPerView: 1,
        speed: this.transitionSpeed,
        watchOverflow: true,
        keyboard: {
          enabled: true,
          onlyInViewport: false
        },
        fadeEffect: {
          crossFade: true
        },
        navigation: {
          nextEl: this.element.querySelector('.flex-next'),
          prevEl: this.element.querySelector('.flex-prev')
        },
        pagination: {
          el: this.element.querySelector('.swiper-pagination'),
          type: paginationStyle,
          renderBullet: function (index, className) {
            const paginationOption = paginationElement.dataset.paginationStyle;
            if (paginationOption == 'bars') {
              return '<span class="' + className + ' progress-bar">' + '<i></i>' + '<b></b>' + '</span>';
            } else if (paginationOption == 'dots') {
              return '<span class="' + className + '">' + '<i></i>' + '<b></b>' + '</span>';
            }
          },
          clickable: true
        }
      });
      swiper.on('realIndexChange', () => {
        // realIndexChange is more reliable than slideChange for loop mode
        const event = new CustomEvent('slider:slide:change');
        document.dispatchEvent(event);
        this.onSlideChange();
      });
      return swiper;
    };
    // check if we're on mobile
    this.isMobile = () => {
      return window.matchMedia('(max-width: 1023px)').matches;
    };
    this.theme = theme;
    this.element = element;
    this.restartTimer = null;
    this.running = true;
    this.speed = options.speed !== undefined ? options.speed : 200;
    this.transitionSpeed = options.transitionSpeed !== undefined ? options.transitionSpeed : 300;
    this.paginationType = options.paginationType;
    this.effect = options.animation || 'slide';
    this.slideChangeCallback = options.onSlideChange;
    this.desktopHeight = options.desktopHeight;
    this.mobileHeight = options.mobileHeight;
    this.isDraggable = options.isDraggable;
    this.blockIsActive = false;
    this.swiperModules = [A11y, Navigation, Pagination, Autoplay, EffectFade, Keyboard];
    if (window.Shopify.designMode) {
      document.addEventListener('shopify:block:select', () => {
        this.blockIsActive = true;
      });
      document.addEventListener('shopify:block:deselect', () => {
        this.blockIsActive = false;
      });
    }

    // Determine if we should use autoHeight
    this.setAutoHeight();
    this.swiper = this.configure();

    // Handle window resize - we'll only ever see a significant resize when in editor (mobile => desktop or vice versa)
    if (window.Shopify.designMode) {
      window.addEventListener('resize', () => {
        const index_currentSlide = this.swiper?.activeIndex;
        this.setAutoHeight();
        this.swiper?.destroy();
        this.swiper = this.configure();
        this.swiper?.slideTo(index_currentSlide, 0);

        // stop autoplay when in editor
        if (this.blockIsActive) this.stop();
      });
    }
  }
}
;// ./src/javascripts/modules/sectionLink.js
function createClickableSection(element) {
  const mainLink = element.querySelector('[data-section-main-link]');
  if (!mainLink) return;
  const buttonHidden = mainLink.ariaHidden == 'true';
  const handleSectionClick = () => {
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) mainLink.click();
  };
  if (buttonHidden && mainLink) element.addEventListener('click', handleSectionClick);
}
;// ./src/javascripts/sections/Slideshow.js




class Slideshow extends Section_Section {
  // ms

  constructor(theme, _element, pageLoad) {
    super(theme, _element, pageLoad);
    this.SLIDER_SELECTOR = '.swiper';
    this.SLIDER_REENABLE_INTERVAL = 6000;
    this.initPaginationColor = () => {
      if (this.slideCount == 1) return;
      const paginationEl = this.paginationType == 'fraction' ? this.sliderElement.querySelector('.image--slideshow__navigation') : this.sliderElement.querySelector('.swiper-pagination');
      const activeSlide = this.sliderElement.querySelector('.swiper-slide-active');
      if (!paginationEl || !activeSlide) return;
      const captionColor = activeSlide.dataset.captionColor;
      if (captionColor) {
        paginationEl.style.color = captionColor;
      }
    };
    this.changePaginationColor = () => {
      if (this.slideCount == 1) return;
      const paginationElement = this.paginationType == 'fraction' ? this.sliderElement.querySelector('.image--slideshow__navigation') : this.slider.element.querySelector('.swiper-pagination');
      if (!paginationElement) return;
      const index_currentSlide = this.slider.swiper.activeIndex;
      const currentSlide = this.slider.swiper.slides[index_currentSlide];
      if (!currentSlide) return;
      const color = currentSlide.dataset.captionColor;
      if (color) {
        paginationElement.style.color = color;
      }
    };
    this.setTabIndex = () => {
      // Return if there's only one slide
      if (this.slideCount == 1) return;
      const slideshowBtns = this.slider.element.querySelectorAll('.homepage-section-btn');
      const slideshowLinks = this.slider.element.querySelectorAll('.slideshow__link');
      const index_currentSlide = this.slider.swiper.activeIndex;
      const currentSlide = this.slider.swiper.slides[index_currentSlide];
      if (!currentSlide) return;
      const currentSlideBtns = currentSlide.querySelectorAll('.homepage-section-btn');
      const currentSlideLinks = currentSlide.querySelectorAll('.slideshow__link');

      // Links
      if (slideshowLinks.length > 0) {
        slideshowLinks.forEach(link => {
          link.setAttribute('tabindex', '-1');
        });
      }
      if (currentSlideLinks.length > 0) {
        currentSlideLinks.forEach(link => {
          link.removeAttribute('tabindex');
        });
      }

      // Buttons
      if (slideshowBtns.length > 0) {
        slideshowBtns.forEach(btn => {
          btn.setAttribute('tabindex', '-1');
        });
      }
      if (currentSlideBtns.length > 0) {
        currentSlideBtns.forEach(btn => {
          btn.removeAttribute('tabindex');
        });
      }
    };
    this.initSlideFadeTransition = () => {
      if (this.slideCount == 1) return;

      // Handle slide transition
      const swiper = this.slider.swiper;
      const currentSlide = swiper.slides[swiper.activeIndex];
      const currentSlideInner = currentSlide.querySelector('.swiper-slide--inner');
      if (currentSlideInner) {
        // 'slide-fade-to-left' adds the 'fadeInMove' animation, the class is added dynamically
        if (!currentSlideInner.classList.contains('slide-fade-to-left')) {
          currentSlideInner.classList.add('slide-fade-to-left');
        }

        // We need to remove the class so that the animation resets when going back to a slide
        currentSlideInner.addEventListener('animationend', event => {
          if (event.animationName === 'fadeInMove') {
            // Delay removing the class by using setTimeout
            setTimeout(() => {
              currentSlideInner.classList.remove('slide-fade-to-left');
            }, 1000);
          }
        }, {
          once: true
        });
      }
    };
    this.autoplayHandler = () => {
      if (window.Shopify.designMode) return; // Otherwise the slider won't remain paused on block select
      const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) {
          this.slider.stop();
        } else {
          this.slider.start();
        }
      };
      new IntersectionObserver(handleIntersection.bind(this), {
        rootMargin: '0px 0px 0px 0px'
      }).observe(this.slider.element);
    };
    this.onSlideChange = () => {
      // Need this to adjust the animation duration of the pagination bars after the first slide change
      this.sliderElement.setAttribute('data-slide-has-changed', 'true');
      if (this.slider && this.slider.isRunning && this.speed > 0) {
        if (window.Shopify.designMode) return; // Otherwise the slider won't remain paused on block select
        // restart autoscroll after given interval since last interaction
        clearTimeout(this.restartTimer);
        this.restartTimer = setTimeout(() => {
          this.slider.start();
        }, Math.max(0, this.SLIDER_REENABLE_INTERVAL - this.speed));
      }

      // Need to manually remove and add the animation class to force the data-animate animations to run on certain versions of Safari
      this.element.classList.remove('shown-on-scroll');
      setTimeout(() => {
        this.element.classList.add('shown-on-scroll');
      }, 100);
    };
    this.onSectionSelect = () => {
      if (this.slideCount == 1) {
        this.kenBurns.reapply();
      }
    };
    this.onBlockSelect = ({
      element
    }) => {
      const index = parseInt(element.dataset.swiperSlideIndex, 10);
      this.slider.slideToLoop(index);
      this.slider.stop();
    };
    this.onBlockDeselect = () => {
      this.slider.start();
    };
    this.restartTimer = null;
    this.sliderElement = _element.querySelector(this.SLIDER_SELECTOR);
    this.speed = parseInt(this.sliderElement.dataset.sliderSlideTime, 10);
    this.slideTransitionSpeed = parseInt(this.sliderElement.dataset.sliderTransitionSpeed, 10);
    this.paginationType = this.sliderElement.dataset.sliderPaginationType;
    this.desktopHeight = this.sliderElement.dataset.desktopHeight;
    this.mobileHeight = this.sliderElement.dataset.mobileHeight;
    this.isDraggable = this.sliderElement.dataset.draggable;
    if (this.paginationType == 'arrows') {
      this.paginationType = 'fraction';
    } else if (this.paginationType == 'bars') {
      this.paginationType = 'bullets';
    } else if (this.paginationType == 'dots') {
      this.paginationType = 'bullets';
    }
    this.slider = new Slider(theme, this.sliderElement, {
      speed: this.speed,
      transitionSpeed: this.slideTransitionSpeed,
      paginationType: this.paginationType,
      animation: this.sliderElement.dataset.sliderAnimation,
      onSlideChange: this.onSlideChange,
      desktopHeight: this.desktopHeight,
      mobileHeight: this.mobileHeight,
      isDraggable: this.isDraggable
    });
    const slides = this.slider.element.querySelectorAll('.slideshow__link');
    slides.forEach(slide => createClickableSection(slide));

    // Get slide count
    this.slideCount = this.slider.element.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

    // Initialize slide animation immediately
    this.initSlideFadeTransition();

    // Play when in viewport/stop when out of viewport
    this.autoplayHandler();

    // The slider breaks when tabbing through the slide buttons
    this.setTabIndex();

    // Pagination colors to match caption color
    this.initPaginationColor();
    window.addEventListener('resize', () => {
      this.initPaginationColor();
    });
    document.addEventListener('slider:slide:change', () => {
      // Handle slide animation on change
      this.initSlideFadeTransition();

      // The slider breaks when tabbing through the slide buttons
      this.setTabIndex();

      // Pagination colors
      this.changePaginationColor();
    });
    if (window.Shopify.designMode) {
      document.addEventListener('shopify:block:select', e => {
        const index_currentSlide = this.slider.swiper.activeIndex;
        const currentSlide = this.slider.swiper.slides[index_currentSlide];

        // @ts-ignore
        const blockId = e.detail.blockId;
        if (currentSlide && blockId == currentSlide.dataset.blockId) {
          this.onBlockSelect({
            element: currentSlide
          });
        }
      });
      document.addEventListener('shopify:block:deselect', e => {
        const index_currentSlide = this.slider.swiper.activeIndex;
        const currentSlide = this.slider.swiper.slides[index_currentSlide];

        // @ts-ignore
        const blockId = e.detail.blockId;
        if (currentSlide && blockId == currentSlide.dataset.blockId) {
          this.onBlockDeselect();
        }
      });
    }
    if (this.slideCount == 1) {
      this.kenBurns = new KenBurns(theme, _element);
    }
  }
}
;// ./src/javascripts/sections/NavBanner.js

class NavBanner extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
  }
}
;// ./src/javascripts/sections/Newsletter.js

class Newsletter extends Section_Section {}
;// ./src/javascripts/sections/Password.js

class Password extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.load = () => {
      var self = this;
      const passwordShowEl = document.querySelector('.password-show');
      if (passwordShowEl) {
        passwordShowEl.addEventListener('click', function () {
          self.$head.classList.toggle('open');
          self.$head.style.display = self.$head.style.display === 'none' ? 'block' : 'none';
          document.querySelector('.password--container').classList.add('password-modal--open');
          self.$password.focus();
        });
      }
      const passwordCloseEl = document.querySelector('.password--close');
      if (passwordCloseEl) {
        passwordCloseEl.addEventListener('click', function () {
          self.$head.classList.toggle('open');
          self.$head.style.display = self.$head.style.display === 'none' ? 'block' : 'none';
          document.querySelector('.password--container').classList.remove('password-modal--open');
          self.$password.blur();
        });
      }
      if (document.querySelector('.storefront-password-form .errors')) {
        self.$head.style.display = 'block';
        self.$head.classList.add('open');
        self.$password.focus();
      }

      // Detect click outside of popup to close it.
      const passwordWrapperEl = document.querySelector('.password--wrapper');
      if (passwordWrapperEl) {
        passwordWrapperEl.addEventListener('click', e => {
          if (self.$head.classList.contains('open')) {
            if (!self.$head.contains(e.target) && !document.querySelector('.password-show').contains(e.target)) {
              self.$head.style.display = 'none';
            }
          }
        });
      }

      // Keep tabbing within the modal while it is open.
      document.addEventListener('keydown', function (e) {
        e = e || window.event;
        if (e.key === 'Tab') {
          // Keep tab within the open modal.
          if (e.shiftKey) {
            if (document.activeElement === self.firstFocusableEl) {
              e.preventDefault();
              self.lastFocusableEl.focus();
            }
          } else {
            if (document.activeElement === self.lastFocusableEl) {
              e.preventDefault();
              self.firstFocusableEl.focus();
            }
          }
        } else if (e.key === 'Escape') {
          // Escape to close popup.
          if (self.$head.classList.contains('open')) {
            self.$head.classList.toggle('open');
            self.$head.style.display = 'none';
            self.$password.blur();
          }
        }
      });
    };
    this.$head = document.querySelector('.site-header');
    if (!this.$head) return;
    this.$focusableEls = this.$head.querySelectorAll('a[href], input:not([disabled]):not([type="hidden"]), button:not([disabled]), [tabindex="0"]');
    this.$password = this.$head.querySelector('input#password');
    this.firstFocusableEl = /** @type {HTMLElement} */this.$focusableEls[0];
    this.lastFocusableEl = /** @type {HTMLElement} */this.$focusableEls[this.$focusableEls.length - 1];
    this.load();
  }
}
;// ./src/javascripts/sections/MapSection.js


class MapSection extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   * @param {boolean} pageLoad
   */
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.onAuthError = e => {
      this.showError(e.detail.reason);
    };
    this.showError = message => {
      const container = this.element.querySelector('.map-section__container');
      container.classList.add('hide');
      if (window.Shopify.designMode) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'map-container-error';
        errorDiv.textContent = message;
        container.parentElement.querySelector('.map-section__overlay').appendChild(errorDiv);
      }
      container.parentElement.querySelector('.homepage-map--fallback').classList.remove('hide');
    };
    /**
     * This is called when Maps API is loaded
     * @param {import('../window').GoogleMapsApi} maps
     */
    this.onLoad = maps => {
      this.mapsApi = maps;
      const config = {
        zoom: 14
      };
      let style = [];
      try {
        const mapThemeElem = this.element.querySelector('.map-theme');
        if (mapThemeElem) {
          style = JSON.parse(mapThemeElem.textContent);
        }
      } catch (e) {
        console.error('Unable to parse theme style:', e);
      }
      const container = /** @type {HTMLElement} */this.element.querySelector('.map-section__container');
      if (!container) {
        return;
      }
      this.geocoder = new maps.Geocoder();
      this.geocoder.geocode({
        'address': this.address
      }, (results, status) => {
        if (status === 'OK') {
          /**
           * @typedef {import('../window').GoogleMap} GoogleMap
           *
           */
          this.map = /** @type {GoogleMap} */new maps.Map(container, {
            zoom: config.zoom,
            styles: style,
            disableDefaultUI: true,
            draggable: false,
            clickableIcons: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            draggableCursor: 'default'
          });
          this.mapsApi.event.addListener(this.map, "projection_changed", () => {
            this.centerMap();
            if (this.contentBox) {
              // Center map when content box is resized
              // works as window resize observer as well since the content box has relative width

              // @ts-ignore
              new ResizeObserver(this.centerMap).observe(this.contentBox);
            } else {
              // Center map when screensize is changed
              // redundant if content box resize observer is active
              window.addEventListener('resize', this.centerMap);
            }
          });

          /**
           *
           * @typedef {import('../window').GoogleMapsMarker} GoogleMapsMarkerType
           */
          this.marker = /** @type {GoogleMapsMarkerType} */new maps.Marker({
            map: this.map,
            position: results[0].geometry.location
          });
        } else {
          this.showError('Error looking up that address');
        }
      });
    };
    this.offsetCenter = (offsetX, offsetY) => {
      // offsetX is the distance you want that point to move to the right, in pixels
      // offsetY is the distance you want that point to move upwards, in pixels
      // offset values can be negative

      const markerPosition = this.marker.getPosition();
      const scale = Math.pow(2, this.map.getZoom());
      const mapProjection = this.map.getProjection();
      const worldCoordinateCenter = mapProjection.fromLatLngToPoint(markerPosition);
      const pixelOffset = new this.mapsApi.Point(offsetX / scale || 0, offsetY / scale || 0);
      const worldCoordinateNewCenter = new this.mapsApi.Point(worldCoordinateCenter.x - pixelOffset.x, worldCoordinateCenter.y + pixelOffset.y);
      const newCenter = mapProjection.fromPointToLatLng(worldCoordinateNewCenter);
      this.map.setCenter(newCenter);
    };
    this.centerMap = () => {
      if (!this.map) return;
      if (this.contentBox) {
        const totalContentBoxWidth = this.contentBox.offsetWidth + this.contentBoxMargin;
        const totalContentBoxHeight = this.contentBox.offsetHeight + this.contentBoxMargin;
        if (window.innerWidth > 767) {
          if (this.contentBoxAllignment === 'left') {
            this.offsetCenter(totalContentBoxWidth / 2, 0);
          } else {
            this.offsetCenter(-(totalContentBoxWidth / 2), 0);
          }
        } else {
          this.offsetCenter(0, -(totalContentBoxHeight / 1.2));
        }
      } else {
        this.map.setCenter(this.marker.getPosition());
      }
    };
    this.mapsApi = null;
    this.mapElement = /** @type {HTMLElement} */element.querySelector('.map-wrapper');
    this.contentBox = /** @type {HTMLElement} */element.querySelector('.homepage-map-content-box');
    if (this.contentBox) {
      this.contentBoxAllignment = this.element.dataset.mapsAlignment === 'right' ? 'left' : 'right';
      this.contentBoxMargin = parseInt(window.getComputedStyle(this.contentBox).getPropertyValue(`margin-${this.contentBoxAllignment}`));
    }
    this.kenBurns = new KenBurns(theme, element);
    this.apiKey = this.element.dataset.mapsApikey;
    this.address = this.element.dataset.mapsAddress;
    if (!this.apiKey || !this.address) return;
    theme.loadGoogleMapApi(this.apiKey).then(this.onLoad).catch(this.showError);
    document.body.addEventListener('google-maps-auth-failure', this.onAuthError);
  }
}
;// ./src/javascripts/global/Pagination.js


/** Pagination logic (Infinite scrolling and Load more button) */
class Pagination_Pagination extends Component {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   */
  constructor(theme, element, loadedCallback1, loadedCallback2) {
    super(theme, element);
    // how many pixels from bottom should next page start loading
    this.PAGINATION_LOAD_OFFSET = 1200;
    // how often should the scroll position should be checked (in milliseconds)
    this.SCROLL_DELAY = 200;
    this.PAGINATION_SELECTOR = '.pagination';
    this.COLLECTION_WRAPPER_SELECTOR = '#CollectionProductGrid';
    this.COLLECTION_MAIN_SELECTOR = '.collection-main-body-inner';
    this.COLLECTION_HEADER_SELECTOR = '.collection-main-central-header';
    this.COLLECTION_ITEM_SELECTOR = '.grid__item';
    this.COLLECTION_ITEM_EXCLUDE_SELECTOR = '.collection-central-description-block';
    this.initialize = () => {
      const pagination = document.querySelector('.pagination');
      if (pagination && pagination.classList.contains('pagination-infinite')) {
        this.pagination_type = 'infinite-scroll';
      } else if (pagination && pagination.classList.contains('pagination--load-more')) {
        this.pagination_type = 'load-more';
        this.load_more_button();
      }
      this.execCallbacks();
    };
    this.execCallbacks = () => {
      if (this.loadedCallback1) {
        this.loadedCallback1();
      }
      if (this.loadedCallback2) {
        this.loadedCallback2();
      }
    };
    this.onWindowScroll = () => {
      this.$wrapper = document.querySelector(this.COLLECTION_WRAPPER_SELECTOR);
      if (!this.$wrapper) return;
      if (this.pagination_type !== 'infinite-scroll') {
        return;
      }
      const height = this.$wrapper.offsetTop + this.$wrapper.offsetHeight;
      if (height - this.PAGINATION_LOAD_OFFSET < document.documentElement.scrollTop + window.innerHeight) {
        this.load_next_page();
      }
    };
    this.check_pagination_progress = () => {
      const nextLink = document.querySelector(`${this.PAGINATION_SELECTOR} .pagination-next a`);
      const next_url = nextLink ? nextLink.getAttribute('href') : null;
      this.fully_loaded = !next_url || next_url === '#';
    };
    this.build_load_more_html = function () {
      const pagination = document.querySelector('.pagination');
      if (!pagination) return;
      const totalItems = parseInt(pagination.getAttribute('data-paginate-items'), 10);
      const currentOffset = parseInt(pagination.getAttribute('data-paginate-offset'), 10);
      const pageSize = parseInt(pagination.getAttribute('data-paginate-size'), 10);
      const totalViewed = currentOffset + pageSize;
      const progressPercentage = 100 * totalViewed / totalItems;
      let youViewed = "";
      if (this.theme.translations.youve_viewed !== undefined) {
        youViewed = this.theme.translations.youve_viewed.replace('{{ x }}', totalViewed).replace('{{ y }}', totalItems);
      }
      const buttonHtml = `
      <div class="pagination__load-more">
        <p class="pagination__progress-text">${youViewed}</p>
        <div class="progress-bar"><div class="progress-bar__inner" style="width:${progressPercentage}%;"></div></div>
        <button class="btn btn--load-more">
          <svg style="display:none" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" class="spin flex-full pagination-loading"><g clip-path="url(#clip0_3605_47041)"><path d="M12.5 23C6.42487 23 1.5 18.0751 1.5 12C1.5 5.92487 6.42487 1 12.5 1C18.5751 1 23.5 5.92487 23.5 12C23.5 15.1767 22.1534 18.0388 20 20.0468" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g><defs><clipPath id="clip0_3605_47041"><rect width="24" height="24" fill="none" transform="translate(0.5)"/></clipPath></defs></svg>
          <span class="btn--load-more--text">${this.theme.translations.load_more}</span>
        </button>
      </div>
    `;
      return buttonHtml;
    };
    this.load_more_button = function () {
      this.check_pagination_progress();

      // Check if Load More button already on page
      const buttonAppended = document.querySelector('.pagination .btn--load-more') !== null;

      // Build Button html
      const buttonHtml = this.build_load_more_html();

      // If button not on page and more results are available, display button
      if (!buttonAppended && !this.fully_loaded) {
        document.querySelector('.pagination').insertAdjacentHTML('beforeend', buttonHtml);
      }

      // If button clicked, load next page
      const loadMoreButton = document.querySelector('.btn--load-more');
      if (loadMoreButton) {
        loadMoreButton.addEventListener('click', this.load_next_page.bind(this.$self));
      }
    };
    this.set_loading = loading => {
      this.$loading_indicator = document.querySelector('.pagination-loading');
      this.$load_more_button_text = document.querySelector('.btn--load-more--text');
      if (loading) {
        this.loading = true;
        if (this.$load_more_button_text) this.$load_more_button_text.style.visibility = 'hidden';
        if (this.$loading_indicator) this.$loading_indicator.style.display = 'block';
      } else {
        this.loading = false;
        if (this.$load_more_button_text) this.$load_more_button_text.style.visibility = 'visible';
        if (this.$loading_indicator) this.$loading_indicator.style.display = 'none';
      }
    };
    this.load_next_page = () => {
      if (this.loading) {
        return false;
      }
      const nextLink = document.querySelector(`${this.PAGINATION_SELECTOR} .pagination-next a`);
      const next_url = nextLink ? nextLink.getAttribute('href') : null;
      if (!next_url || next_url === '#') {
        return;
      }
      this.set_loading(true);
      fetch(next_url).then(response => response.text()).then(this.page_loaded.bind(this)).catch(error => {
        console.error('Error loading next page:', error);
      }).finally(() => this.set_loading(false));
    };
    this.scroll_position_history = () => {
      const pathName = document.location.pathname;
      window.onbeforeunload = function () {
        const htmlContent = document.querySelector('.collection-main-body-inner').innerHTML;
        const paginationContent = document.querySelector('.pagination').innerHTML;
        sessionStorage.setItem('pagePosition_' + pathName, htmlContent.toString());
        sessionStorage.setItem('pagePagination_' + pathName, paginationContent.toString());
      };
      if (performance.navigation.type === 2 && sessionStorage['pagePosition_' + pathName]) {
        const htmlContentContainer = document.querySelector('.collection-main-body-inner');
        htmlContentContainer.innerHTML = sessionStorage.getItem('pagePosition_' + pathName);
      }
      if (performance.navigation.type === 2 && sessionStorage['pagePagination_' + pathName]) {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = sessionStorage.getItem('pagePagination_' + pathName);
      }
    };
    this.page_loaded = data => {
      const parser = new DOMParser();
      const data_dom = parser.parseFromString(data, 'text/html');
      const gridClassesElement = document.getElementById('grid_item_width_classes');
      const classes = gridClassesElement ? gridClassesElement.value : '';
      if (classes) {
        const classList = classes.split(' '); // Split the classes into an array
        data_dom.querySelectorAll('.grid__item').forEach(item => {
          item.classList.remove('large--one-quarter', 'medium--one-quarter', 'small--one-whole', 'large--one-half', 'medium--one-half');
          classList.forEach(cls => item.classList.add(cls)); // Add each class individually
        });
      }
      this.$collection.append(...data_dom.querySelectorAll(`${this.COLLECTION_HEADER_SELECTOR} > ${this.COLLECTION_ITEM_SELECTOR}:not(${this.COLLECTION_ITEM_EXCLUDE_SELECTOR})`), ...data_dom.querySelectorAll(`${this.COLLECTION_MAIN_SELECTOR} > ${this.COLLECTION_ITEM_SELECTOR}`));
      const newPagination = data_dom.querySelector(this.PAGINATION_SELECTOR);
      if (newPagination) {
        document.querySelector(this.PAGINATION_SELECTOR).replaceWith(newPagination);
      }

      // If "load more" enabled, run function to conditionally render button on newly-loaded page
      if (this.pagination_type === 'load-more') {
        this.load_more_button();
      }
      window.scrollBy(0, 1); // Force a 1px scroll to trigger show-on-scroll load in animations

      this.execCallbacks();
    };
    this.loadedCallback1 = loadedCallback1;
    this.loadedCallback2 = loadedCallback2;
    this.$self = this;
    this.$collection = document.querySelector(this.COLLECTION_MAIN_SELECTOR);
    this.$wrapper = document.querySelector(this.COLLECTION_WRAPPER_SELECTOR);
    this.loading = false;
    this.fully_loaded = false;
    this.scroll_timeout = null;
    this.pagination_type = null;

    // If neither "infinite scrolling" nor "load more" are enabled, end function here
    const paginationInfinite = document.querySelector('.pagination-infinite');
    const paginationLoadMore = document.querySelector('.pagination--load-more');
    this.initialize();
    if (paginationInfinite || paginationLoadMore) {
      this.scroll_position_history();
    }
  }
}
;// ./src/javascripts/sections/CollectionSection.js



class CollectionSection extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.initPagination = () => {
      this.pagination = new Pagination_Pagination(this.theme, this.element, this.loadQuickAdd);
    };
    this.loadQuickAdd = () => {
      this.quickAddButtons = new QuickAdd(this.theme, this.element);
    };
    // check if we're on mobile
    this.isMobile = () => {
      return window.matchMedia('(max-width: 1023px)').matches;
    };
    this.element = element;
    this.theme = theme;
    this.initPagination();
    this.loadQuickAdd();
    this.theme.addBadges(this.element, 1000);
    document.addEventListener('paginate', this.initPagination);
  }
}
;// ./src/javascripts/sections/CollectionListSection.js


class CollectionListSection extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.quickAddButtons = new QuickAdd(theme, element);
  }
}
;// ./src/javascripts/sections/RichText.js

class RichText extends Section_Section {}
;// ./src/javascripts/sections/Testimonials.js

class Testimonails extends Section_Section {}
;// ./src/javascripts/sections/Blog.js


class Blog extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.kenBurns = new KenBurns(theme, element);
  }
}
;// ./src/javascripts/sections/TextAdverts.js



class TextAdverts extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    const swiperContainer = this.element.querySelector('.swiper');
    this.swiper = new Swiper(swiperContainer, {
      modules: [A11y, Autoplay],
      slidesPerView: 1,
      watchOverflow: true,
      autoHeight: true,
      loop: true,
      autoplay: {
        delay: 5000
      },
      speed: 1000
    });
  }
}
;// ./src/javascripts/sections/VideoHero.js


class VideoHero extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    createClickableSection(this.element);
  }
}
;// ./src/javascripts/sections/Cart.js

class Cart extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.changeQuantity = e => {
      e.preventDefault();
      const input = e.currentTarget.closest('.js-qty').querySelector('input');
      if (e.currentTarget.classList.contains('js-qty__adjust--minus')) {
        input.value = Math.max(1, parseInt(input.value, 10) - 1);
      } else {
        input.value = parseInt(input.value, 10) + 1;
      }
    };
    Array.prototype.forEach.call(this.element.querySelectorAll('.js-qty__adjust'), el => el.addEventListener('click', this.changeQuantity));
  }
}
;// ./src/javascripts/sections/ScrollingBanner.js

class ScrollingBanner extends Section_Section {}
;// ./src/javascripts/global/Login.js
class Login {
  constructor(theme, element) {
    this.showRecoverPasswordForm = () => {
      if (this.recoverPasswordForm && this.customerLoginForm) {
        this.recoverPasswordForm.style.display = 'block';
        this.customerLoginForm.style.display = 'none';
      }

      // Now + 10 minutes (in milliseconds).
      const expiry = new Date(Date.now() + 10 * 60 * 1000);
      if (this.hasLocalStorage) {
        localStorage.setItem('resettingPassword', JSON.stringify({
          expiry: expiry.toISOString()
        }));
      }
    };
    this.hideRecoverPasswordForm = () => {
      if (this.recoverPasswordForm && this.customerLoginForm) {
        this.recoverPasswordForm.style.display = 'none';
        this.customerLoginForm.style.display = 'block';
      }
    };
    this._isLocalStorageSupported = () => {
      try {
        return typeof Storage !== "undefined" && window.localStorage && window.sessionStorage;
      } catch (e) {
        return false;
      }
    };
    this.theme = theme;
    this.element = element;
    this.recoverPasswordForm = document.querySelector('#RecoverPasswordForm');
    this.customerLoginForm = document.querySelector('#CustomerLoginForm');
    this.recoverPasswordLink = document.querySelector('#RecoverPassword');
    this.hideRecoverPasswordLink = document.querySelector('#HideRecoverPasswordLink');
    this.resetSuccess = document.querySelector('#ResetSuccess');
    this.hasLocalStorage = this._isLocalStorageSupported();
    if (this.recoverPasswordLink) {
      this.recoverPasswordLink.addEventListener('click', evt => {
        evt.preventDefault();
        this.showRecoverPasswordForm();
      });
    }
    if (this.hideRecoverPasswordLink) {
      this.hideRecoverPasswordLink.addEventListener('click', evt => {
        evt.preventDefault();
        this.hideRecoverPasswordForm();
        if (this.hasLocalStorage) {
          window.localStorage.removeItem('resettingPassword');
        }
      });
    }

    // Allow deep linking to recover password form
    if (window.location.hash === '#recover') {
      this.showRecoverPasswordForm();
    }
    let isResettingPassword = null;
    if (this.hasLocalStorage) {
      isResettingPassword = window.localStorage.getItem('resettingPassword');
    }
    if (isResettingPassword) {
      const isError = this.recoverPasswordForm ? this.recoverPasswordForm.querySelector('.errors') : null;
      if (isError) {
        if (this.resetSuccess) {
          this.resetSuccess.style.display = 'none';
        }
      } else {
        // The password reset email has been sent. Display information.
        if (this.resetSuccess) {
          this.resetSuccess.style.display = 'block';
        }
        if (this.hasLocalStorage) {
          window.localStorage.removeItem('resettingPassword');
        }
      }
    }
  }
}
;// ./src/javascripts/global/Popup.js

class Popup extends Component {
  constructor(theme, element) {
    super(theme, element);
    this.initPopup = () => {
      if (this.shouldShowPopup()) {
        setTimeout(() => {
          this.setExpiry(this.popupSkipDays);
          this.show();
        }, this.initDelay);
      }
    };
    this.shouldShowPopup = () => {
      if (this.testMode) return true;
      if (this.hasLocalStorage && localStorage.getItem(this.VISIBILITY_KEY) === 'true') {
        return true;
      } else if (this.isExpiredOrNotSet()) {
        return true;
      }
      return false;
    };
    this.isExpiredOrNotSet = () => {
      if (!this.hasLocalStorage) return true;
      const popupInfo = localStorage.getItem(this.STORAGE_KEY);
      if (popupInfo) {
        try {
          const expiry = Date.parse(JSON.parse(popupInfo).expiry);
          return expiry <= Date.now();
        } catch (e) {
          console.warn('Unable to read popup expiry date', e);
        }
      }
      return true;
    };
    this.setExpiry = days => {
      if (this.hasLocalStorage) {
        try {
          const expiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
            expiry: expiry.toISOString()
          }));
        } catch (e) {
          console.warn('Unable to set popup expiry:', e);
        }
      }
    };
    this.onWindowResize = () => {
      if (this.shouldShowPopup()) {
        this.show();
      }
    };
    this.isMobileView = () => {
      return window.innerWidth < 769;
    };
    this.show = () => {
      this.closePopup(); // Ensure the previous popup state is cleaned up
      if (this.isMobileView() || !this.isFullscreen) {
        setTimeout(() => {
          this.showSlideUp();
        }, this.showPopupDelay);
      } else {
        setTimeout(() => {
          this.showFullscreen();
        }, this.showPopupDelay);
      }
      this.updateVisibilityStorage(true);
      // Focus the close button after a short delay
      this.focusTimeout = setTimeout(() => {
        this.popupInput?.focus();
      }, 300);
    };
    this.showSlideUp = () => {
      if (this.slideUpElement) {
        this.slideUpElement.style.visibility = 'visible';
      }
      this.element.classList.add('slide-up', 'visible');
    };
    this.showFullscreen = () => {
      this.element.classList.add('fullscreen', 'visible');
      if (this.fullscreenElement) {
        this.fullscreenElement.style.display = 'flex';
        document.body.classList.add('fullscreen-popup-open');
        document.querySelector('#PopupOverlay')?.addEventListener('click', this.closePopup);
      }
    };
    this.closePopup = () => {
      this.element.classList.remove('visible', 'fullscreen', 'slide-up');
      if (this.fullscreenElement) {
        this.fullscreenElement.style.display = 'none';
        document.body.classList.remove('fullscreen-popup-open');
        document.querySelector('#PopupOverlay')?.removeEventListener('click', this.closePopup);
      }
      if (this.slideUpElement) {
        this.slideUpElement.style.visibility = 'hidden';
      }
      this.updateVisibilityStorage(false);
      // Clear the focus timeout if it exists
      if (this.focusTimeout) {
        clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
    };
    this.updateVisibilityStorage = visible => {
      if (this.hasLocalStorage) {
        if (visible) {
          localStorage.setItem(this.VISIBILITY_KEY, 'true');
        } else {
          localStorage.removeItem(this.VISIBILITY_KEY);
        }
      }
    };
    this._isLocalStorageSupported = () => {
      try {
        return typeof Storage !== 'undefined' && window.localStorage;
      } catch (e) {
        return false;
      }
    };
    this.STORAGE_KEY = 'wetheme-popup';
    this.VISIBILITY_KEY = 'popup-visible';
    this.isFullscreen = this.element.dataset.desktopType === 'fullscreen';
    this.popupSkipDays = parseInt(this.element.dataset.popupTime, 10);
    this.popupDelay = parseInt(this.element.dataset.popupDelay, 10);
    this.testMode = this.element.dataset.popupTestMode === 'true';
    this.delay = this.testMode ? 0 : 1000 * this.popupDelay;
    this.hasLocalStorage = this._isLocalStorageSupported();

    // We need to avoid delaying the init fn in the editor to avoid irrelevant code executing when the editor reloads
    this.initDelay = window.Shopify.designMode ? 0 : this.delay;
    this.showPopupDelay = window.Shopify.designMode ? this.delay : 0;

    // Cache DOM elements to avoid multiple queries
    this.closeButton = this.element.querySelector('.popup--close-btn');
    this.fullscreenCloseButton = this.element.querySelector('.popup--close');
    this.slideUpElement = document.querySelector('#slide-up');
    this.fullscreenElement = document.querySelector('#fullscreen');
    this.popupInput = this.element.querySelector('input[type="email"]');

    // Event bindings
    this.closeButton?.addEventListener('click', this.closePopup);
    this.fullscreenCloseButton?.addEventListener('click', this.closePopup);
    window.addEventListener('resize', this.onWindowResize);
    this.initPopup();
    this.focusTimeout = null;
  }
}
;// ./src/javascripts/global/VerificationPopup.js

class VerificationPopup extends Component {
  constructor(theme, element) {
    super(theme, element);
    this.load = () => {
      // Age checker is in test mode - will show immediately in editor and on live site
      if (this.ageTestMode) this.showModal();
      if (this.modalLinks) {
        this.modalLinks.setAttribute('tabindex', '1');
      }
      var isAnAdult = this.readCookie('isAnAdult');
      if (!isAnAdult) {
        if (window.Shopify.designMode && !this.ageTestMode) return;
        this.showModal();
      }
      if (this.enterButton) {
        this.enterButton.addEventListener('click', this.writeCookie);
      }
      if (this.exitButton) {
        this.exitButton.addEventListener('click', this.comeBackModal);
      }
      if (this.returnButton) {
        this.returnButton.addEventListener('click', this.confirmAgeModal);
      }
    };
    this.writeCookie = () => {
      document.cookie = "isAnAdult=true; expires=0; path=/";
      this.hideModal();
    };
    this.getModalContent = () => {
      this.changeContent = document.querySelector('.modal-deny-content');
      this.hideInitial = document.querySelector('.modal-initial-content');
    };
    this.trapFocus = () => {
      setTimeout(() => {
        const container = document.querySelector('.verification-popup-container');
        if (container) {
          const focusableElements = container.querySelectorAll('button, a');
          const visibleElements = Array.from(focusableElements).filter(el => el.offsetParent !== null);
          const firstInput = visibleElements[0];
          const lastInput = visibleElements[visibleElements.length - 1];

          // Set focus on first input
          firstInput.focus();

          // Redirect last tab to first input
          lastInput.addEventListener('keydown', function (e) {
            if (e.which === 9 && !e.shiftKey) {
              e.preventDefault();
              firstInput.focus();
            }
          });

          // Redirect first shift+tab to last input
          firstInput.addEventListener('keydown', function (e) {
            if (e.which === 9 && e.shiftKey) {
              e.preventDefault();
              lastInput.focus();
            }
          });
        }
      }, 250);
    };
    this.readCookie = name => {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };
    this.showModal = () => {
      const container = document.querySelector('.verification-popup-container');
      if (container) {
        container.style.display = 'block';
      }
      this.trapFocus();
      document.body.style.overflow = "hidden";
    };
    this.hideModal = () => {
      const container = document.querySelector('.verification-popup-container');
      if (container) {
        container.style.display = 'none';
      }
      document.body.style.overflow = '';
    };
    /**
     * Shared method to reset scroll and retrieve modal content
     */
    this.resetScrollAndGetContent = () => {
      const prompt = document.getElementById('verification__prompt');
      if (prompt) {
        prompt.scrollTop = 0;
      }
      this.getModalContent();
    };
    this.confirmAgeModal = () => {
      this.resetScrollAndGetContent();
      this.changeContent.classList.add('hidden');
      this.hideInitial.classList.remove('hidden');
      this.trapFocus();
    };
    this.comeBackModal = () => {
      this.resetScrollAndGetContent();
      this.changeContent.classList.remove('hidden');
      this.hideInitial.classList.add('hidden');
      this.trapFocus();
    };
    this.ageSkipDays = parseInt(this.element.dataset.ageTime, 10);
    this.ageDelay = 0;
    this.ageTestMode = this.element.dataset.ageTestMode === 'true';
    this.enterButton = element.querySelector('#button__enter');
    this.exitButton = element.querySelector('#button__exit');
    this.returnButton = element.querySelector('#button__return');
    this.modalLinks = element.querySelector('.modal-content__wrapper a');
    this.load();
  }
}
;// ./src/javascripts/global/Badge.js



/* Place the sale or sold out badge at the top left of preview thumbnail
* image/s, rather than the top left of the containing <div>.
*/
class Badge extends Component {
  constructor(theme, _element) {
    super(theme, _element);
    this.add = (element, timeout) => {
      this.roots.push(element);
    };
    this.onWindowResize = () => {
      const containers = this.roots.flatMap(root => Array.from(root.querySelectorAll('.grid-view-item .grid-view-item-image')));
      const badges = containers.flatMap(container => Array.from(container.querySelectorAll('.badge')));
      badges.forEach(badge => badge.style.opacity = '0');
      badges.forEach(badge => badge.style.opacity = '1');
    };
    this.roots = [];
  }
}
;// ./src/javascripts/global/RecentlyViewed.js


class RecentlyViewed extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   */
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.show = () => {
      this.wrapper.style.display = 'block';
      this.quickAddButtons = new QuickAdd(this.theme, this.element);
      this.badge = this.theme.addBadges(this.element, 1000);
      const sectionLoadedEvent = new CustomEvent('theme:section:load');
      document.dispatchEvent(sectionLoadedEvent);
      const recentlyViewedLoadedEvent = new CustomEvent('recentlyViewed:loaded');
      document.dispatchEvent(recentlyViewedLoadedEvent);
    };
    this.element = element;
    this.wrapper = this.element.closest('[data-recently-viewed-wrapper]');
    this.addEventListeners();
  }
  addEventListeners() {
    window.eventBus.on('recentlyViewed:updated', this.onRecentlyViewedUpdated.bind(this));
  }
  onRecentlyViewedUpdated() {
    this.show();
  }
  onUnload() {
    window.eventBus.off('recentlyViewed:updated', this.onRecentlyViewedUpdated);
  }
}
;// ./src/javascripts/global/InfoColumns.js

class InfoColumns extends Section_Section {
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
  }
}
;// ./src/javascripts/global/SearchResults.js


class SearchResults extends Section_Section {
  /**
   * @param {import('../ThemeBase').default} theme
   * @param {HTMLElement} element
   */
  constructor(theme, element, pageLoad) {
    super(theme, element, pageLoad);
    this.loadQuickAdd = () => {
      this.quickAddButtons = new QuickAdd(this.theme, this.element);
    };
    this.removeAsterisks = () => {
      var pageTitle = document.querySelector('.page--title');
      pageTitle.textContent = pageTitle.textContent.replace('*', '');
      var searchInput = /** @type {HTMLInputElement} */document.querySelector('.search-bar .input-group-field');
      searchInput.value = searchInput.value.replace('*', '');
      var breadcrumbLast = document.querySelector('nav.breadcrumb span:last-child');
      if (breadcrumbLast) {
        breadcrumbLast.textContent = breadcrumbLast.textContent.replace('*', '');
      }
    };
    this.onSearchChange = e => {
      if (this.searchInput.value.length > 0) {
        this.searchClear.style.opacity = '1';
        this.searchClear.tabIndex = 0;
      } else {
        this.searchClear.style.opacity = '0';
        this.searchClear.tabIndex = -1;
      }
    };
    this.clearSearch = e => {
      if (this.searchInput) {
        this.searchInput.value = '';
        this.onSearchChange();
        this.searchInput.focus();
      }
    };
    this.tabClearSearch = e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.searchInput.value = '';
        this.onSearchChange();
        this.searchInput.focus();
      }
    };
    this.loadQuickAdd();
    this.removeAsterisks();
    this.clearSearch();
    this.theme.addBadges(this.element, 1000);
    this.searchInput = /** @type {HTMLInputElement} */element.querySelector('input[type="search"]');
    this.searchInput.addEventListener('input', this.onSearchChange);
    this.searchClear = /** @type {HTMLElement} */element.querySelector('.search-drawer--clear');
    this.searchClear.addEventListener('click', this.clearSearch);
    this.searchClear.addEventListener('keydown', this.tabClearSearch);
  }
}
;// ./src/javascripts/Theme.js


// import Popup from './global/Popup';
// import Newsletter from './global/Newsletter';
// import CartDrawer from './global/CartDrawer';
// import Drawer from './global/Drawer';

// import LoginPage from './pages/LoginPage';











































/**
 * @typedef {Object} ShopifyEventDetail
 * @property {string} sectionId
 * @property {string} [blockId]
 * @property {boolean} [load]
 */

/**
 * @typedef {CustomEvent<ShopifyEventDetail>} ShopifyEvent
 */

class Theme extends ThemeBase {
  constructor() {
    super();
    this.THROTTLE_INTERVAL = 400;
    this.SECTIONS = {
      'header': Header,
      'footer-main': Footer,
      'announcement-bar': AnnouncementBar,
      'animated-text': AnimatedText,
      'advanced-layout--custom-html': CustomHtml,
      'advanced-layout--hero': Hero,
      'blog--blog-posts': BlogPosts,
      'collage-builder': VideoHero,
      'template--product--info-columns': InfoColumns,
      'collection--collection-list': CollectionList,
      'collection--featured-collection': FeaturedCollection,
      'collection-header': CollectionHeader,
      'countdown': ImageWithText,
      'events-calendar': EventsCalendar,
      'image--gallery': ImageGallery,
      'gallery-slideshow': ImageGallery,
      'image-with-text-overlay': ImageWithTextOverlay,
      'image--image-with-text': ImageWithText,
      'image--logo-list': LogoList,
      'image--slideshow': Slideshow,
      'navigation-banner': NavBanner,
      'newsletter--newsletter': Newsletter,
      'password': Password,
      'shop-the-look': ShopTheLook,
      'featured-product': ImageWithText,
      'image-with-text-slideshow': ImageWithTextSlideshow,
      'store-information--map': MapSection,
      'template--blog': Blog,
      'template--cart': Cart,
      'template--collection': CollectionSection,
      'template--collections-list': CollectionListSection,
      'template--page-contact': MapSection,
      'template--product': ImageWithText,
      'template--product--recently-viewed': RecentlyViewed,
      'template--search': SearchResults,
      'text--rich-text': RichText,
      'text--testimonials': Testimonails,
      'text--text-adverts': TextAdverts,
      'video--video-hero': VideoHero,
      'video--video': Section_Section,
      'interactive-menu': InteractiveMenu,
      'scrolling-banner': ScrollingBanner
    };
    this.loadFadeAnimation = () => {
      document.body.classList.add('loaded');
      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        // Safari doesn't support beforeunload very well when using back/forward buttons.
        return;
      }
      window.addEventListener('beforeunload', function () {
        document.body.classList.add('unloading');
      });
    };
    this.loadGlobal = () => {
      const globalEl = document.querySelector('#wetheme-global');
      if (!globalEl) {
        console.warn('Script #wetheme-global with global definitions not found');
        return;
      }
      let global;
      try {
        global = JSON.parse(globalEl.textContent);
      } catch (e) {
        console.warn('Invalid syntax in #wetheme-global', e);
        return;
      }
      this.translations = global.translations;
      this.moneyFormat = global.moneyFormat;
      this.giftwrapProduct = global.giftwrapProduct;
      this.giftwrapEnabled = global.giftwrapEnabled;
    };
    /**
     * Load section
     *
     * @param {HTMLElement} element Element to attach the section to
     * @param {typeof Section} SectionClass Section class to load
     * @param {boolean} pageLoad True on initial page load, False when the section reloads
     */
    this.loadSection = (element, SectionClass, pageLoad) => {
      const c = new SectionClass(this, element, pageLoad);
      this.sectionById.set(element.dataset.wethemeSectionId, c);
      const type = element.dataset.wethemeSectionType;
      let sections = this.sectionsByType.get(type);
      if (!sections) {
        sections = [];
        this.sectionsByType.set(type, sections);
      }
      sections.push(c);
    };
    /**
     * Load all sections that has given type
     *
     * @param {string} type Type of section to laod
     * @param {typeof Section} SectionClass Section class to load
     * @param {boolean} pageLoad True on initial page load, False when the section reloads
     */
    this.loadSectionsByType = (type, SectionClass, pageLoad) => {
      const selector = `[data-wetheme-section-type="${type}"]`;
      Array.prototype.forEach.call(document.querySelectorAll(selector), element => {
        try {
          this.loadSection(element, SectionClass, pageLoad);
        } catch (e) {
          console.error(`Unable to load section ${type} on element`, element, e);
        }
      });
    };
    /**
     * Load all the sections
     */
    this.onLoadAll = () => {
      this.load();
      Object.entries(this.SECTIONS).forEach(([type, SectionClass]) => {
        this.loadSectionsByType(type, SectionClass, true);
      });
      this.showOnScroll();
    };
    /**
     * This is called when section loads in Theme Editor, it'll initialize section by the sectionId param
     *
     * @param {ShopifyEvent} event
     */
    this.onSectionLoad = event => {
      // When in section preview, there is no section instance - show the section and return
      if (window.Shopify.visualPreviewMode) {
        this.showOnScroll();
        return;
      }

      // Workaround for decoupled sections, add fadeIn animation to the section
      const targetEl = /** @type {HTMLElement} */event.target;
      const animatedContainer = targetEl.classList.contains('show-on-scroll') ? targetEl : targetEl.querySelector('.show-on-scroll');
      if (animatedContainer && !animatedContainer.classList.contains('shown-on-scroll', 'animated', 'fadeIn')) {
        animatedContainer.classList.remove('show-on-scroll');
        animatedContainer.classList.add('shown-on-scroll', 'animated', 'fadeIn');
      }
      const {
        sectionId
      } = event.detail;
      const selector = `[data-wetheme-section-id="${sectionId}"]`;
      const element = /** @type {HTMLElement} */document.querySelector(selector);
      if (!element) {
        console.warn(`Element with ${selector} not found, section won't be loaded`);
        return;
      }
      const type = element.dataset.wethemeSectionType;
      const SectionClass = this.SECTIONS[type];
      if (!SectionClass) {
        console.warn(`Cannot find class with type "${type}"`);
        return;
      }
      this.loadSection(element, SectionClass, false);
      this.showOnScroll();
    };
    /**
     * This is called when section unloads in Theme Editor, it'll destroy a section by the sectionId param
     *
     * @param {ShopifyEvent} event
     */
    this.onSectionUnload = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, nothing will be unloaded`);
        return;
      }
      section.destroy({
        element
      });
    };
    /**
     * This is called when section is selected (opened) by user in Theme Editor
     *
     * @param {ShopifyEvent} event
     */
    this.onSectionSelect = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId,
        load
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, nothing will be selected`);
        return;
      }
      section.onSectionSelect({
        element,
        sectionId,
        load
      });
    };
    /**
     * This is called when section is deselected (closed) by user in Theme Editor
     *
     * @param {ShopifyEvent} event
     */
    this.onSectionDeselect = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, nothing will be deselected`);
        return;
      }
      section.onSectionDeselect({
        element,
        sectionId
      });
    };
    /**
     * This is called when section is reorderd by user in Theme Editor
     *
     * @param {ShopifyEvent} event
     */
    this.onSectionReorder = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, nothing will be done on reorder`);
        return;
      }
      section.onSectionReorder({
        element,
        sectionId
      });
    };
    /**
     * This is called when block is selected (opened) by user in Theme Editor
     *
     * @param {ShopifyEvent} event
     */
    this.onBlockSelect = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId,
        blockId,
        load
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, block select will do nothing`);
        return;
      }
      section.onBlockSelect({
        element,
        sectionId,
        blockId,
        load
      });
    };
    /**
     * This is called when block is deselected (closed) by user in Theme Editor
     *
     * @param {CustomEvent} event
     */
    this.onBlockDeselect = event => {
      const element = /** @type {HTMLElement} */event.target;
      const {
        sectionId,
        blockId
      } = event.detail;
      const section = this.sectionById.get(sectionId);
      if (!section) {
        console.warn(`No section with id ${sectionId}, block deselect will do nothing`);
        return;
      }
      section.onBlockDeselect({
        element,
        sectionId,
        blockId
      });
    };
    /**
     * This is called immediatelly when window is resized
     *
     * @param {Event} event
     */
    this.onRawResize = event => {
      const width = this.getWindowWidth();

      // Trigger non-debounced event on all components
      this.registeredComponents.forEach(c => c.onWindowResizeRaw({
        width
      }));
      this.onResize();
    };
    /**
     * This is called regularly when resized (throttled)
     */
    this.onResize = throttle(() => {
      const width = this.getWindowWidth();
      const oldWidth = this.previousWidth;
      const breakpoint = this.getBreakpoint(width);
      this.registeredComponents.forEach(c => {
        c.onWindowResize({
          width,
          oldWidth,
          breakpoint
        });
        if (breakpoint !== this.breakpoint) {
          // Breakpoint has changed, trigger the event
          c.onWindowResizeBreakpoint({
            breakpoint,
            oldBreakpoint: this.breakpoint,
            width
          });
        }
      });
      this.previousWidth = width;
      this.breakpoint = breakpoint;
    }, this.THROTTLE_INTERVAL);
    /**
     * This is called immediatelly when scrolled
     *
     * @param {Event} event
     */
    this.onRawScroll = event => {
      this.onScroll(event);
    };
    /**
     * This is called regularly when scrolled (throttled)
     *
     * @param {Event} event
     */
    this.onScroll = throttle(event => {
      this.showOnScroll();
      this.registeredComponents.forEach(c => {
        c.onWindowScroll();
      });
    }, this.THROTTLE_INTERVAL);
    this.showOnScroll = () => {
      const sections = document.querySelectorAll('.show-on-scroll');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('show-on-scroll');
            entry.target.classList.add('shown-on-scroll', 'animated', 'fadeIn');
            observer.unobserve(entry.target);
          }
        });
      });
      sections.forEach(section => observer.observe(section));
    };
    /**
     * Handle keyup on document
     *
     * @param {KeyboardEvent} e
     */
    this.onKeyUp = e => {
      // Close drawers when escape is pressed if they are open
      if (e.keyCode == 27) {
        // escape key maps to keycode `27`
        this.closeDrawers();
        window.eventBus.emit('close:all:drawers');
        window.eventBus.emit('close:search:dropdown');
      }
    };
    this.handleAccordions = () => {
      let detailsElements = document.querySelectorAll('details');

      //@ts-ignore
      for (let item of detailsElements) {
        item.addEventListener('click', e => {
          const target = /** @type {HTMLElement} */e.currentTarget;
          setTimeout(() => {
            const isExpanded = item.open ? 'true' : 'false';
            item.firstElementChild.setAttribute('aria-expanded', isExpanded);
          }, 0);
        });
      }
    };
    this.loadGoogleMapApi = apiKey => {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps && window.google.maps.Geocoder && window.google.maps.Map) {
          resolve(window.google.maps);
        } else if (!document.querySelector('#google_maps_api')) {
          const loadMaps = () => {
            // Google Maps API is not yet loaded, create script that loads it
            const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onGoogleMapsAPIReady`;
            this.createScript('google_maps_api', url, true);
          };

          // Resolve once Maps API is loaded
          this.mapsLoadedCallbacks.push({
            resolve,
            reject
          });

          // Google Maps API collides with Shopify payments loading Google Pay,
          // we need to wait for payments to load before loading Maps API
          // TODO: remove once Shopify fixes their payments code
          let attemptsRemaining = 6;
          const checkForPayments = () => {
            // Wait for checkout buttons to be loaded
            const checkoutWrapper = document.querySelector('[data-shopify="dynamic-checkout-cart"]');
            if (attemptsRemaining > 0 && checkoutWrapper && checkoutWrapper.children.length === 0) {
              attemptsRemaining -= 1;
              setTimeout(checkForPayments, 500);
            } else {
              loadMaps();
            }
          };
          checkForPayments();
        } else {
          // Script for loading maps API is there, but it is not yet loaded
          this.mapsLoadedCallbacks.push({
            resolve,
            reject
          });
        }
      });
    };
    this.onGoogleMapsLoaded = () => {
      this.mapsLoadedCallbacks.forEach(({
        resolve
      }) => {
        resolve(window.google.maps);
      });
      this.mapsLoadedCallbacks.splice(0);
    };
    this.onGoogleAuthFailure = reason => {
      this.mapsLoadedCallbacks.forEach(({
        reject
      }) => {
        reject(reason);
      });
      this.mapsLoadedCallbacks.splice(0);
      const event = new CustomEvent('google-maps-auth-failure', {
        detail: {
          reason
        }
      });
      document.body.dispatchEvent(event);
    };
    this._loadCartKey = () => {
      const cerberusKey = 'f1957945-9048-438b-bd2c-0ed182340c65';
      return cerberusKey;
    };
    this.toggleLeftDrawer = (forceOpen = undefined) => {
      const event = new CustomEvent(TOGGLE_LEFT_DRAWER_EVENT, {
        detail: {
          forceOpen
        }
      });
      document.documentElement.dispatchEvent(event);
    };
    this.updateCartCount = cart => {
      const event = new CustomEvent(CART_UPDATE_EVENT, {
        detail: {
          cart
        }
      });
      document.documentElement.dispatchEvent(event);
    };
    this.createScript = (id, src, async = false) => {
      const tag = document.createElement('script');
      tag.id = id;
      tag.src = src;
      if (async) {
        tag.defer = true;
        tag.async = true;
      }
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      return tag;
    };
    this.registerComponent = component => {
      this.registeredComponents.push(component);
    };
    this.closeDrawers = e => {
      this.toggleLeftDrawer(false);
    };
    this.addBadges = (root, timeout) => {
      this.badge.add(root, timeout);
    };
    this.name = 'Flow';

    /** Section by its unique ID
     * @type {Map<string, Section>}
     */
    this.sectionById = new Map();

    /** Array of sections by given section type
     * @type {Map<string, Section[]>}
     */
    this.sectionsByType = new Map();

    /** Array of registered components
     * @type {Array<import('./Component').default>}
     */
    this.registeredComponents = [];

    /** @type {Array<{ resolve: (MapsApi) => void, reject: (string) => void }>} */
    this.mapsLoadedCallbacks = [];
    this.resizeDebounceTimer = null;
    document.addEventListener('shopify:section:load', this.onSectionLoad);
    document.addEventListener('shopify:section:unload', this.onSectionUnload);
    document.addEventListener('shopify:section:select', this.onSectionSelect);
    document.addEventListener('shopify:section:deselect', this.onSectionDeselect);
    document.addEventListener('shopify:section:reorder', this.onSectionReorder);
    document.addEventListener('shopify:block:select', this.onBlockSelect);
    document.addEventListener('shopify:block:deselect', this.onBlockDeselect);
    document.addEventListener('DOMContentLoaded', this.onLoadAll);
    document.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('resize', this.onRawResize);
    window.addEventListener('scroll', this.onRawScroll);
    this.drawerOverlay = document.querySelector('#DrawerOverlay');
    if (this.drawerOverlay) {
      // We don't have it on password page
      this.drawerOverlay.addEventListener('click', this.closeDrawers);
    }
  }

  /** This will be execute when whole DOM is loaded */
  load() {
    this.loadGlobal();
    this.breakpoint = this.getBreakpoint();
    this.popup = null;
    const popupEl = /** @type {HTMLElement} */document.querySelector('#popup');
    if (popupEl && window.location.pathname !== '/challenge') {
      // Don't show popup when we're filling CAPTCHA for contact form
      this.popup = new Popup(this, popupEl);
    }
    this.verificationPopup = null;
    const verificationEl = /** @type {HTMLElement} */document.querySelector('.verification-popup-container');
    if (verificationEl && window.location.pathname !== '/challenge') {
      // Don't show popup when we're filling CAPTCHA for contact form
      this.verificationPopup = new VerificationPopup(this, verificationEl);
    }

    // Newsletter form could be on contact-us page, so outside of sections
    // this.newsletter = new Newsletter(this);

    // Login page doesn't have sections, load it here
    if (document.body.classList.contains('template-customers-login')) {
      this.login = new Login(this, document.body);
    }
    this.handleAccordions();
    this.loadFadeAnimation();
    this.badge = new Badge(this, document.body);
    document.body.addEventListener('mousedown', this._usingMouse);
    document.body.addEventListener('keydown', this._usingTab);
  }
  _usingMouse() {
    document.body.classList.add('using-mouse');
    document.body.classList.remove('using-keyboard');
  }
  _usingTab(evt) {
    if (evt.key === "Tab") {
      document.body.classList.remove('using-mouse');
      document.body.classList.add('using-keyboard');
    }
  }
}

// Make the theme object instance globally available (without overriding the existing window.wetheme)
const theme = new Theme();
for (const [key, value] of Object.entries(theme)) {
  window.wetheme[key] = value;
}
window.onGoogleMapsAPIReady = () => {
  window.wetheme.onGoogleMapsLoaded();
};
window.gm_authFailure = function () {
  window.wetheme.onGoogleAuthFailure('Google Maps authentication error, API key might be invalid');
};
/******/ })()
;
//# sourceMappingURL=theme.js.map