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
    
    // Build regex by parsing the path character by character
    let regexPath = '';
    let i = 0;
    
    while (i < path.length) {
      if (path[i] === ':') {
        // Found a parameter
        i++; // Skip the :
        let paramName = '';
        while (i < path.length && /\w/.test(path[i])) {
          paramName += path[i];
          i++;
        }
        
        // Check if optional
        const isOptional = i < path.length && path[i] === '?';
        if (isOptional) i++; // Skip the ?
        
        keys.push({ name: paramName, optional: isOptional });
        this.params.push(paramName);
        
        if (isOptional) {
          // For optional params, the / before it should also be optional
          // Remove the trailing / from regexPath if present
          if (regexPath.endsWith('/')) {
            regexPath = regexPath.slice(0, -1);
          }
          regexPath += '(?:/([^/]+))?';
        } else {
          regexPath += '([^/]+)';
        }
      } else if (path[i] === '*') {
        regexPath += '.*';
        i++;
      } else {
        // Regular character - escape if needed
        const char = path[i];
        if ('.+^${}()|[]\\'.includes(char)) {
          regexPath += '\\' + char;
        } else {
          regexPath += char;
        }
        i++;
      }
    }

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
