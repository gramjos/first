/**
 * Route class - Represents a single route with path, component, and metadata
 */
export class Route {
  constructor(path, component, options = {}) {
    this.path = path;
    this.component = component;
    this.name = options.name || null;
    this.meta = options.meta || {};
    this.beforeEnter = options.beforeEnter || null;
    this.children = options.children || [];
    this.alias = options.alias || [];
    this.redirect = options.redirect || null;
    
    // Parse path to identify parameter positions
    this.params = [];
    this.regex = this._pathToRegex(path);
  }

  /**
   * Convert path pattern to regex for matching
   * Supports :param, :param? (optional), and * (wildcard)
   */
  _pathToRegex(path) {
    // Handle wildcard routes
    if (path === '*') {
      return { regex: /.*/, keys: [] };
    }

    const keys = [];
    
    // Escape special regex characters except for our placeholders
    let regexPath = path
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');

    // Replace :param and :param? with capture groups
    regexPath = regexPath.replace(/:(\w+)(\?)?/g, (match, key, optional) => {
      keys.push({ name: key, optional: !!optional });
      this.params.push(key);
      return optional ? '(?:/([^/]+))?' : '/([^/]+)';
    });

    // Ensure exact match
    regexPath = '^' + regexPath + '$';

    return {
      regex: new RegExp(regexPath),
      keys
    };
  }

  /**
   * Check if this route matches the given path
   */
  match(path) {
    const match = this.regex.regex.exec(path);
    if (!match) return null;

    const params = {};
    this.regex.keys.forEach((key, index) => {
      const value = match[index + 1];
      if (value !== undefined) {
        params[key.name] = decodeURIComponent(value);
      }
    });

    return { params, path: this.path };
  }
}
