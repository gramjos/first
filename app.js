/**
 * Application Entry Point
 * Load page data from JSON and initialize the router
 */

let router = null;

// Initialize the application
async function initApp() {
  try {
    // Load page data from JSON
    const response = await fetch('/pages.json');
    const pageData = await response.json();
    
    // Create router instance with page data
    router = new Router(pageData);
    
    // Rebuild navigation from page data
    router.rebuildNavigation();
    
    // Update footer if configured
    if (pageData.config.footer) {
      const footer = document.querySelector('footer p');
      if (footer) {
        footer.textContent = pageData.config.footer;
      }
    }
    
    console.log('🚀 Data-driven SPA initialized');
    console.log('� Loaded pages:', router.pages.size);
    console.log('�📍 Current path:', window.location.pathname);
    
  } catch (error) {
    console.error('Failed to load page data:', error);
    document.getElementById('app').innerHTML = `
      <h1>Error Loading Application</h1>
      <p>Failed to load page data. Please check that pages.json exists and is valid JSON.</p>
      <pre>${error.message}</pre>
    `;
  }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
