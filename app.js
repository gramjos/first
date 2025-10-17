/**
 * Application Entry Point
 * Initialize the router with routes
 */

// Initialize the router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create router instance with routes
  new Router(routes);
  
  console.log('🚀 Simple SPA initialized');
  console.log('📍 Current path:', window.location.pathname);
});
