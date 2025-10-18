/**
 * Page Loader
 * Loads and parses markdown files from the pages/ directory
 */

class PageLoader {
  constructor() {
    this.cache = new Map();
    this.pageFiles = [];
  }

  /**
   * Discover all markdown files in the pages/ directory
   * @returns {Promise<Array>} Array of page file paths
   */
  async discoverPages() {
    // For a client-side app, we need a manifest of available pages
    // We'll try to load a pages-manifest.json file first, or use a default list
    try {
      const response = await fetch('/pages/manifest.json');
      if (response.ok) {
        const manifest = await response.json();
        this.pageFiles = manifest.pages || [];
        return this.pageFiles;
      }
    } catch (error) {
      console.log('No pages manifest found, trying default pages...');
    }
    
    // Default pages to try loading
    this.pageFiles = [
      'home.md',
      'about.md',
      'gj.md',
      'about/team.md',
      'about/technology.md'
    ];
    
    return this.pageFiles;
  }

  /**
   * Load a single markdown file
   * @param {string} filePath - Path to markdown file relative to pages/
   * @returns {Promise<Object>} Parsed page object
   */
  async loadPage(filePath) {
    // Check cache first
    if (this.cache.has(filePath)) {
      return this.cache.get(filePath);
    }

    try {
      const response = await fetch(`/pages/${filePath}`);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.status}`);
      }
      
      const markdown = await response.text();
      const page = MarkdownParser.parse(markdown);
      
      // Store in cache
      this.cache.set(filePath, page);
      
      return page;
    } catch (error) {
      console.error(`Error loading page ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Load all pages from the pages/ directory
   * @returns {Promise<Object>} Page data structure compatible with router
   */
  async loadAllPages() {
    await this.discoverPages();
    
    const loadedPages = [];
    const pageMap = new Map(); // Map parent path to page object
    
    // Load all pages
    for (const filePath of this.pageFiles) {
      const page = await this.loadPage(filePath);
      if (page) {
        loadedPages.push({ filePath, page });
      }
    }
    
    // Organize pages into main pages and sub-pages
    const mainPages = [];
    const subPagesMap = new Map(); // Map parent path to array of sub-pages
    
    for (const { filePath, page } of loadedPages) {
      const pathParts = filePath.replace('.md', '').split('/');
      
      if (pathParts.length === 1) {
        // Main page
        mainPages.push(page);
        pageMap.set(page.path, page);
      } else {
        // Sub-page (e.g., about/team.md)
        const parentPath = '/' + pathParts[0];
        
        if (!subPagesMap.has(parentPath)) {
          subPagesMap.set(parentPath, []);
        }
        
        subPagesMap.get(parentPath).push(page);
      }
    }
    
    // Attach sub-pages to their parent pages
    for (const page of mainPages) {
      if (subPagesMap.has(page.path)) {
        page.subPages = subPagesMap.get(page.path);
      }
    }
    
    // Sort main pages by navOrder if specified
    mainPages.sort((a, b) => {
      const orderA = a.navOrder || 999;
      const orderB = b.navOrder || 999;
      return orderA - orderB;
    });
    
    return {
      pages: mainPages,
      config: {
        siteName: "Simple SPA",
        defaultTitle: "Simple SPA - Data-Driven Architecture",
        footer: "Simple SPA with Deep Linking & Markdown Pages"
      }
    };
  }

  /**
   * Clear the cache (useful for development)
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageLoader;
}
