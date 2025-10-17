/**
 * Router - Main router class for vanilla JavaScript SPA
 * Implements clean URLs with History API, no hash-based routing
 */
import { Route } from './route.js';
import { Matcher } from './matcher.js';
import { History } from './history.js';
import { Middleware, Guard } from './middleware.js';

export class Router {
  constructor(options = {}) {
    this.options = {
      mode: 'history',
      root: '/',
      linkActiveClass: 'router-link-active',
      linkExactActiveClass: 'router-link-exact-active',
      ...options
    };

    this.matcher = new Matcher();
    this.middleware = new Middleware();
    this.guard = new Guard();
    this.history = new History((path, state) => this._onLocationChange(path, state));
    
    this.routes = new Map();
    this.currentRoute = null;
    this.previousRoute = null;
    
    this.listeners = {
      navigate: [],
      error: [],
      beforeNavigate: [],
      afterNavigate: []
    };

    this.componentCache = new Map();
    this.isNavigating = false;

    // Check for History API support
    if (!History.isSupported()) {
      console.warn('History API not supported. Router may not work correctly.');
    }
  }

  /**
   * Add a route to the router
   */
  add(path, component, options = {}) {
    const route = new Route(path, component, options);
    this.routes.set(path, route);
    this.matcher.addRoute(route);
    
    // Handle route aliases
    if (Array.isArray(route.alias)) {
      route.alias.forEach(alias => {
        const aliasRoute = new Route(alias, component, { ...options, alias: [] });
        this.matcher.addRoute(aliasRoute);
      });
    }

    return this;
  }

  /**
   * Add middleware
   */
  use(middleware) {
    this.middleware.use(middleware);
    return this;
  }

  /**
   * Register beforeEach guard
   */
  beforeEach(fn) {
    this.guard.beforeEach(fn);
    return this;
  }

  /**
   * Register afterEach hook
   */
  afterEach(fn) {
    this.guard.afterEach(fn);
    return this;
  }

  /**
   * Navigate to a path
   */
  async navigate(path, options = {}) {
    if (this.isNavigating) {
      console.warn('Navigation in progress, ignoring new navigation');
      return;
    }

    this.isNavigating = true;

    try {
      const state = options.state || {};
      const replace = options.replace || false;

      // Add query parameters if provided
      const fullPath = options.query 
        ? this.matcher.buildUrl(path, options.query)
        : path;

      // Trigger navigation
      if (replace) {
        this.history.replace(fullPath, state);
      } else {
        this.history.push(fullPath, state);
      }
    } catch (error) {
      this._emitError(error);
      throw error;
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * Replace current route
   */
  async replace(path, options = {}) {
    return this.navigate(path, { ...options, replace: true });
  }

  /**
   * Go back in history
   */
  back() {
    this.history.back();
  }

  /**
   * Go forward in history
   */
  forward() {
    this.history.forward();
  }

  /**
   * Go to specific history entry
   */
  go(delta) {
    this.history.go(delta);
  }

  /**
   * Start the router
   */
  async start() {
    // Initial route resolution
    const location = this.history.getCurrentLocation();
    await this._resolveRoute(location.path, location.state);
  }

  /**
   * Handle location changes (from History API)
   */
  async _onLocationChange(path, state) {
    await this._resolveRoute(path, state);
  }

  /**
   * Resolve and render a route
   */
  async _resolveRoute(path, state = {}) {
    try {
      // Parse URL
      const url = new URL(path, window.location.origin);
      const pathname = url.pathname;
      const query = this.matcher.parseQuery(url.search);

      // Match route
      const match = this.matcher.match(pathname);
      
      if (!match) {
        // Try to find wildcard/404 route
        const notFoundMatch = this.matcher.match('*');
        if (notFoundMatch) {
          await this._executeRoute(notFoundMatch, query, state);
        } else {
          throw new Error(`No route found for ${pathname}`);
        }
        return;
      }

      // Check for redirects
      if (match.route.redirect) {
        const redirectPath = typeof match.route.redirect === 'function'
          ? match.route.redirect(match)
          : match.route.redirect;
        await this.replace(redirectPath);
        return;
      }

      await this._executeRoute(match, query, state);
    } catch (error) {
      this._emitError(error);
    }
  }

  /**
   * Execute a matched route
   */
  async _executeRoute(match, query, state) {
    const { route, params } = match;
    
    const to = {
      path: match.path,
      params,
      query,
      state,
      meta: route.meta,
      name: route.name
    };

    const from = this.currentRoute || {
      path: null,
      params: {},
      query: {},
      state: {},
      meta: {},
      name: null
    };

    // Run beforeEach guards
    const guardResult = await this.guard.runBefore(to, from);
    
    if (guardResult === false) {
      // Navigation cancelled
      return;
    }
    
    if (typeof guardResult === 'string') {
      // Redirect
      await this.replace(guardResult);
      return;
    }

    // Run route-specific beforeEnter
    if (route.beforeEnter) {
      const result = await new Promise((resolve) => {
        const next = (arg) => resolve(arg);
        route.beforeEnter(to, from, next);
      });

      if (result === false) return;
      if (typeof result === 'string') {
        await this.replace(result);
        return;
      }
    }

    // Emit beforeNavigate event
    this._emit('beforeNavigate', to, from);

    // Execute middleware
    await this.middleware.execute({ to, from, router: this }, async () => {
      // Render component
      await this._renderComponent(route, to);
    });

    // Update current route
    this.previousRoute = this.currentRoute;
    this.currentRoute = to;

    // Run afterEach hooks
    await this.guard.runAfter(to, from);

    // Emit navigate event
    this._emit('navigate', to, from);
    this._emit('afterNavigate', to, from);

    // Update active links
    this._updateActiveLinks();

    // Restore scroll position (after a small delay for rendering)
    requestAnimationFrame(() => {
      if (!state.preserveScroll) {
        this.history.restoreScroll(to.path);
      }
    });
  }

  /**
   * Render component
   */
  async _renderComponent(route, routeContext) {
    const container = document.querySelector(this.options.el || '#app');
    
    if (!container) {
      throw new Error('Router container element not found');
    }

    // Get component (could be a class, function, or module)
    let component = route.component;

    // If component is a function that returns a promise (lazy loading)
    if (typeof component === 'function' && component.constructor.name === 'AsyncFunction') {
      component = await component();
    }

    // If component is a promise (dynamic import)
    if (component instanceof Promise) {
      component = await component;
      // Handle default export
      component = component.default || component;
    }

    // Execute component
    if (typeof component === 'function') {
      const result = await component(routeContext);
      
      if (typeof result === 'string') {
        container.innerHTML = result;
      } else if (result instanceof HTMLElement) {
        container.innerHTML = '';
        container.appendChild(result);
      }
    } else if (typeof component === 'string') {
      container.innerHTML = component;
    } else if (component instanceof HTMLElement) {
      container.innerHTML = '';
      container.appendChild(component);
    }
  }

  /**
   * Update active link classes
   */
  _updateActiveLinks() {
    const links = document.querySelectorAll('a[href^="/"]');
    const currentPath = this.currentRoute?.path || '';

    links.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove(this.options.linkActiveClass);
      link.classList.remove(this.options.linkExactActiveClass);

      if (href === currentPath) {
        link.classList.add(this.options.linkExactActiveClass);
        link.classList.add(this.options.linkActiveClass);
      } else if (currentPath.startsWith(href) && href !== '/') {
        link.classList.add(this.options.linkActiveClass);
      }
    });
  }

  /**
   * Event emitter
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
    return this;
  }

  /**
   * Remove event listener
   */
  off(event, callback) {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(callback);
      if (index > -1) {
        this.listeners[event].splice(index, 1);
      }
    }
    return this;
  }

  /**
   * Emit event
   */
  _emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(...args));
    }
  }

  /**
   * Emit error
   */
  _emitError(error) {
    console.error('Router error:', error);
    this._emit('error', error);
  }

  /**
   * Get current route
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Check if a route is active
   */
  isActive(path, exact = false) {
    if (!this.currentRoute) return false;
    
    if (exact) {
      return this.currentRoute.path === path;
    }
    
    return this.currentRoute.path.startsWith(path);
  }
}

// Export a default router instance creator
export function createRouter(options = {}) {
  return new Router(options);
}
