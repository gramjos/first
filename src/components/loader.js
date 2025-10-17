/**
 * Component Loader - Handles dynamic component loading and lazy loading
 */
export class ComponentLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }

  /**
   * Load a component (with caching)
   */
  async load(componentOrPath, useCache = true) {
    // If it's already a component, return it
    if (typeof componentOrPath === 'function' || typeof componentOrPath === 'string') {
      return componentOrPath;
    }

    // If it's a path string that looks like a module path
    if (typeof componentOrPath === 'string' && componentOrPath.includes('/')) {
      // Check cache
      if (useCache && this.cache.has(componentOrPath)) {
        return this.cache.get(componentOrPath);
      }

      // Check if already loading
      if (this.loading.has(componentOrPath)) {
        return this.loading.get(componentOrPath);
      }

      // Load the module
      const loadPromise = import(componentOrPath)
        .then(module => {
          const component = module.default || module;
          this.cache.set(componentOrPath, component);
          this.loading.delete(componentOrPath);
          return component;
        })
        .catch(error => {
          this.loading.delete(componentOrPath);
          throw new Error(`Failed to load component: ${componentOrPath}`, { cause: error });
        });

      this.loading.set(componentOrPath, loadPromise);
      return loadPromise;
    }

    return componentOrPath;
  }

  /**
   * Preload components
   */
  async preload(components) {
    const promises = components.map(component => this.load(component));
    return Promise.all(promises);
  }

  /**
   * Clear cache
   */
  clearCache(componentPath = null) {
    if (componentPath) {
      this.cache.delete(componentPath);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache size
   */
  getCacheSize() {
    return this.cache.size;
  }
}

// Export singleton instance
export const loader = new ComponentLoader();

/**
 * Helper function to create a lazy component
 */
export function lazy(importFn) {
  return async () => {
    const module = await importFn();
    return module.default || module;
  };
}
