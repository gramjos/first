/**
 * Simple SPA Router
 * Lightweight client-side router using the History API
 */

class Router {
  /**
   * Initialize the router with routes
   * @param {Array} routes - Array of route objects with path, title, and render function
   */
  constructor(routes) {
    this.routes = routes;
    this.currentPath = null;

    // Handle initial page load
    this.navigate(window.location.pathname, false);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.navigate(window.location.pathname, false);
    });

    // Handle link clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });
  }

  /**
   * Navigate to a path
   * @param {string} path - The path to navigate to
   * @param {boolean} pushState - Whether to push to browser history
   */
  navigate(path, pushState = true) {
    // Update browser history
    if (pushState) {
      history.pushState(null, null, path);
    }

    // Find matching route
    const route = this.routes.find(r => r.path === path) || 
                  this.routes.find(r => r.path === '*');

    // Render the page
    if (route) {
      document.getElementById('app').innerHTML = route.render();
      document.title = route.title;
      this.currentPath = path;
      this.updateActiveLink(path);
    }
  }

  /**
   * Update active link styling
   * @param {string} path - Current path
   */
  updateActiveLink(path) {
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
