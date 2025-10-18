/**
 * Data-Driven SPA Router
 * Lightweight client-side router using the History API with JSON-based page definitions
 */

class Router {
  /**
   * Initialize the router with page data
   * @param {Object} pageData - Page definitions from JSON
   */
  constructor(pageData) {
    this.pageData = pageData;
    this.pages = this.buildPageMap(pageData.pages);
    this.config = pageData.config || {};
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
   * Build a flat map of all pages (main pages and sub-pages)
   * @param {Array} pages - Array of page definitions
   * @returns {Map} Map of path to page object
   */
  buildPageMap(pages) {
    const pageMap = new Map();
    
    pages.forEach(page => {
      // Add main page
      pageMap.set(page.path, page);
      
      // Add sub-pages
      if (page.subPages && Array.isArray(page.subPages)) {
        page.subPages.forEach(subPage => {
          // Add reference to parent page
          subPage.parentPage = page;
          pageMap.set(subPage.path, subPage);
        });
      }
    });
    
    return pageMap;
  }

  /**
   * Get all main pages (for navigation)
   * @returns {Array} Array of main page objects
   */
  getMainPages() {
    return this.pageData.pages.filter(page => page.type === 'main');
  }

  /**
   * Find a page by path
   * @param {string} path - The path to search for
   * @returns {Object|null} Page object or null
   */
  findPage(path) {
    return this.pages.get(path) || null;
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

    // Find matching page
    const page = this.findPage(path);

    // Render the page
    if (page) {
      // Render using PageRenderer
      const html = PageRenderer.renderPage(page);
      document.getElementById('app').innerHTML = html;
      document.title = page.pageTitle || this.config.defaultTitle || 'Simple SPA';
      this.currentPath = path;
      this.updateActiveLink(path);
    } else {
      // 404 page
      this.render404();
    }
  }

  /**
   * Render 404 page
   */
  render404() {
    document.getElementById('app').innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p><a href="/" data-link>← Back to Home</a></p>
    `;
    document.title = '404 - Page Not Found';
    this.updateActiveLink(null);
  }

  /**
   * Update active link styling
   * @param {string} path - Current path
   */
  updateActiveLink(path) {
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Exact match
      if (href === path) {
        link.classList.add('active');
        return;
      }
      
      // Parent page match (for sub-pages)
      if (path && path.startsWith(href) && href !== '/') {
        link.classList.add('active');
      }
    });
  }

  /**
   * Rebuild navigation from page data
   */
  rebuildNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Keep only the first child (logo/brand) if it exists
    const brand = nav.querySelector('.nav-brand');
    nav.innerHTML = '';
    
    if (brand) {
      nav.appendChild(brand);
    }

    // Add main page links
    const mainPages = this.getMainPages();
    mainPages.forEach(page => {
      const link = document.createElement('a');
      link.href = page.path;
      link.setAttribute('data-link', '');
      link.innerHTML = page.icon ? `${page.icon} ${page.title}` : page.title;
      nav.appendChild(link);
    });

    // Update active link
    this.updateActiveLink(this.currentPath);
  }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Router;
}
