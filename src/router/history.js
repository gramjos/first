/**
 * History - Wrapper for the HTML5 History API
 */
export class History {
  constructor(onChange) {
    this.onChange = onChange;
    this.scrollPositions = new Map();
    this._init();
  }

  /**
   * Initialize history management
   */
  _init() {
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      this.onChange(window.location.pathname, event.state);
    });

    // Intercept all link clicks
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      
      // Only handle internal links
      if (
        href &&
        href.startsWith('/') &&
        !link.hasAttribute('target') &&
        !link.hasAttribute('download') &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.button === 0
      ) {
        event.preventDefault();
        this.push(href);
      }
    });
  }

  /**
   * Push a new entry to the history
   */
  push(path, state = {}) {
    // Save current scroll position
    this.scrollPositions.set(window.location.pathname, window.scrollY);

    window.history.pushState(state, '', path);
    this.onChange(path, state);
  }

  /**
   * Replace the current history entry
   */
  replace(path, state = {}) {
    window.history.replaceState(state, '', path);
    this.onChange(path, state);
  }

  /**
   * Go back in history
   */
  back() {
    window.history.back();
  }

  /**
   * Go forward in history
   */
  forward() {
    window.history.forward();
  }

  /**
   * Go to a specific point in history
   */
  go(delta) {
    window.history.go(delta);
  }

  /**
   * Get current location
   */
  getCurrentLocation() {
    return {
      path: window.location.pathname,
      query: window.location.search,
      hash: window.location.hash,
      state: window.history.state
    };
  }

  /**
   * Restore scroll position for the given path
   */
  restoreScroll(path) {
    const position = this.scrollPositions.get(path);
    if (position !== undefined) {
      window.scrollTo(0, position);
    } else {
      window.scrollTo(0, 0);
    }
  }

  /**
   * Check if browser supports History API
   */
  static isSupported() {
    return !!(window.history && window.history.pushState);
  }
}
