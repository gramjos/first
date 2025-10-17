/**
 * Matcher - Handles URL pattern matching and parameter extraction
 */
export class Matcher {
  constructor() {
    this.routes = [];
  }

  /**
   * Add a route to the matcher
   */
  addRoute(route) {
    this.routes.push(route);
  }

  /**
   * Find a matching route for the given path
   */
  match(path) {
    // Remove trailing slash unless it's the root
    const normalizedPath = path === '/' ? path : path.replace(/\/$/, '');

    for (const route of this.routes) {
      const match = route.match(normalizedPath);
      if (match) {
        return {
          route,
          params: match.params,
          path: normalizedPath
        };
      }
    }

    return null;
  }

  /**
   * Parse query string from URL
   */
  parseQuery(queryString) {
    const query = {};
    if (!queryString) return query;

    const pairs = queryString.substring(1).split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        query[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    }

    return query;
  }

  /**
   * Build URL from path and query params
   */
  buildUrl(path, query = {}) {
    const queryString = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');

    return queryString ? `${path}?${queryString}` : path;
  }
}
