/**
 * Main Application Entry Point
 */
import { createRouter } from './router/core.js';
import { routes } from './routes.js';
import { ready } from './utils/dom.js';

// Middleware example: Logging
const loggingMiddleware = async (context, next) => {
  console.log('Navigating to:', context.to.path);
  await next();
  console.log('Navigation complete');
};

// Middleware example: Page title
const titleMiddleware = async (context, next) => {
  await next();
  if (context.to.meta.title) {
    document.title = context.to.meta.title;
  }
};

// Initialize router when DOM is ready
ready(() => {
  // Create router instance
  const router = createRouter({
    el: '#app',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active'
  });

  // Add middleware
  router.use(loggingMiddleware);
  router.use(titleMiddleware);

  // Register routes
  routes.forEach(route => {
    router.add(route.path, route.component, {
      name: route.name,
      meta: route.meta,
      beforeEnter: route.beforeEnter,
      children: route.children
    });
  });

  // Global navigation guards
  router.beforeEach((to, from, next) => {
    // Example: Check authentication for protected routes
    // if (to.meta.requiresAuth && !isAuthenticated()) {
    //   next('/login');
    //   return;
    // }
    
    console.log('Before navigation:', from?.path, '->', to.path);
    next();
  });

  router.afterEach((to, from) => {
    console.log('After navigation:', from?.path, '->', to.path);
    
    // Analytics tracking could go here
    // trackPageView(to.path);
  });

  // Event listeners
  router.on('navigate', (to, from) => {
    console.log('Navigate event:', to.path);
  });

  router.on('error', (error) => {
    console.error('Router error:', error);
    // Show error message to user
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="page error-page">
          <h1>Oops! Something went wrong</h1>
          <p>${error.message}</p>
          <a href="/" class="btn">Go Home</a>
        </div>
      `;
    }
  });

  // Start the router
  router.start();

  // Expose router globally for debugging and programmatic navigation
  window.router = router;

  console.log('Router initialized and started');
});
