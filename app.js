/**
 * Application Entry Point
 * Load page data from markdown files and initialize the router
 */

let router = null;

// Initialize the application
async function initApp() {
  try {
    // Try to load pages from markdown files first
    const pageLoader = new PageLoader();
    const pageData = await pageLoader.loadAllPages();
    
    // If no markdown pages found, fallback to pages.json
    if (!pageData.pages || pageData.pages.length === 0) {
      console.log('No markdown pages found, falling back to pages.json...');
      const response = await fetch('/pages.json');
      const jsonData = await response.json();
      
      // Create router instance with JSON data
      router = new Router(jsonData);
    } else {
      // Create router instance with markdown page data
      router = new Router(pageData);
    }
    
    // Rebuild navigation from page data
    router.rebuildNavigation();
    
    // Update footer if configured
    if (pageData.config && pageData.config.footer) {
      const footer = document.querySelector('footer p');
      if (footer) {
        footer.textContent = pageData.config.footer;
      }
    }
    
    console.log('🚀 Markdown-driven SPA initialized');
    console.log('📄 Loaded pages:', router.pages.size);
    console.log('📍 Current path:', window.location.pathname);
    
  } catch (error) {
    console.error('Failed to load page data:', error);
    document.getElementById('app').innerHTML = `
      <h1>Error Loading Application</h1>
      <p>Failed to load page data. Please check that markdown files exist or pages.json is valid.</p>
      <pre>${error.message}</pre>
    `;
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
