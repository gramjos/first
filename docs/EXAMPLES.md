# Vanilla JS Router - Usage Examples

This document provides comprehensive examples of using the Vanilla JS Router in various scenarios.

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [Route Patterns](#route-patterns)
3. [Navigation](#navigation)
4. [Guards and Middleware](#guards-and-middleware)
5. [Component Patterns](#component-patterns)
6. [Advanced Features](#advanced-features)

## Basic Setup

### Minimal Setup

```javascript
import { createRouter } from './router/core.js';

const router = createRouter({ el: '#app' });

router.add('/', () => '<h1>Home</h1>');
router.add('/about', () => '<h1>About</h1>');

router.start();
```

### Full Setup with Configuration

```javascript
import { createRouter } from './router/core.js';
import { routes } from './routes.js';

const router = createRouter({
  el: '#app',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact'
});

// Register all routes
routes.forEach(route => {
  router.add(route.path, route.component, {
    name: route.name,
    meta: route.meta,
    beforeEnter: route.beforeEnter
  });
});

// Global guards
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path);
  next();
});

// Start router
router.start();

// Expose for debugging
window.router = router;
```

## Route Patterns

### Static Routes

```javascript
router.add('/', HomeComponent);
router.add('/about', AboutComponent);
router.add('/contact', ContactComponent);
```

### Dynamic Parameters

```javascript
// Single parameter
router.add('/user/:id', ({ params }) => {
  return `<h1>User ID: ${params.id}</h1>`;
});

// Multiple parameters
router.add('/blog/:category/:postId', ({ params }) => {
  return `
    <h1>Category: ${params.category}</h1>
    <h2>Post: ${params.postId}</h2>
  `;
});
```

### Optional Parameters

```javascript
// Optional post ID
router.add('/user/:userId/posts/:postId?', ({ params }) => {
  if (params.postId) {
    return `<h1>User ${params.userId} - Post ${params.postId}</h1>`;
  }
  return `<h1>All posts for User ${params.userId}</h1>`;
});
```

### Wildcard Routes (404)

```javascript
// Catch-all route for 404
router.add('*', () => {
  return `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <a href="/">Go Home</a>
    </div>
  `;
});
```

### Route Aliases

```javascript
router.add('/home', HomeComponent, {
  alias: ['/', '/start', '/welcome']
});
```

### Redirects

```javascript
// Static redirect
router.add('/old-path', null, {
  redirect: '/new-path'
});

// Dynamic redirect
router.add('/user/:id', null, {
  redirect: (match) => `/profile/${match.params.id}`
});
```

## Navigation

### Programmatic Navigation

```javascript
// Simple navigation
router.navigate('/about');

// With state
router.navigate('/products/123', {
  state: { from: 'search', filter: 'electronics' }
});

// With query parameters
router.navigate('/products', {
  query: { category: 'electronics', sort: 'price' }
});

// Replace history (no back button)
router.replace('/login');

// History navigation
router.back();
router.forward();
router.go(-2); // Go back 2 pages
```

### Declarative Navigation

```html
<!-- Regular links (automatically intercepted) -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/products/123">Product</a>
</nav>

<!-- External links (not intercepted) -->
<a href="https://example.com" target="_blank">External</a>
<a href="/api/data" download>Download</a>
```

### Handling Navigation in Components

```javascript
function ProductDetail({ params }) {
  return `
    <div>
      <h1>Product ${params.id}</h1>
      <button onclick="window.router.back()">Go Back</button>
      <button onclick="window.router.navigate('/')">Home</button>
    </div>
  `;
}
```

## Guards and Middleware

### Global Before Guard (Authentication)

```javascript
router.beforeEach((to, from, next) => {
  // Check if route requires auth
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    const isAuthenticated = checkAuth(); // Your auth check
    
    if (!isAuthenticated) {
      // Redirect to login
      next('/login');
      return;
    }
  }
  
  // Continue navigation
  next();
});
```

### Global After Hook (Analytics)

```javascript
router.afterEach((to, from) => {
  // Track page view
  if (window.gtag) {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: to.path
    });
  }
  
  // Log for debugging
  console.log(`Navigated from ${from?.path} to ${to.path}`);
});
```

### Route-Specific Guard

```javascript
router.add('/admin', AdminComponent, {
  beforeEnter: (to, from, next) => {
    if (!isAdmin()) {
      alert('Access denied!');
      next('/');
    } else {
      next();
    }
  },
  meta: {
    requiresAuth: true,
    requiresAdmin: true
  }
});
```

### Middleware Examples

```javascript
// Logging middleware
const loggingMiddleware = async (context, next) => {
  console.time(`Route: ${context.to.path}`);
  await next();
  console.timeEnd(`Route: ${context.to.path}`);
};

// Title middleware
const titleMiddleware = async (context, next) => {
  await next();
  document.title = context.to.meta.title || 'My App';
};

// Loading indicator middleware
const loadingMiddleware = async (context, next) => {
  showLoadingSpinner();
  await next();
  hideLoadingSpinner();
};

// Register middleware
router.use(loggingMiddleware);
router.use(titleMiddleware);
router.use(loadingMiddleware);
```

## Component Patterns

### String Components

```javascript
router.add('/home', () => {
  return `
    <div class="home">
      <h1>Welcome</h1>
      <p>This is the home page</p>
    </div>
  `;
});
```

### DOM Element Components

```javascript
router.add('/about', () => {
  const div = document.createElement('div');
  div.className = 'about';
  
  const h1 = document.createElement('h1');
  h1.textContent = 'About Us';
  div.appendChild(h1);
  
  return div;
});
```

### Async Components (Data Fetching)

```javascript
router.add('/users', async ({ query }) => {
  // Fetch data
  const response = await fetch('/api/users');
  const users = await response.json();
  
  // Render with data
  return `
    <div class="users">
      <h1>Users</h1>
      <ul>
        ${users.map(user => `
          <li>
            <a href="/user/${user.id}">${user.name}</a>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
});
```

### Lazy Loading Components

```javascript
import { lazy } from './components/loader.js';

// Lazy load component
router.add('/dashboard', lazy(() => import('./components/Dashboard.js')));

// Or using async function
router.add('/profile', async () => {
  const module = await import('./components/Profile.js');
  return module.default;
});
```

### Component with Event Handlers

```javascript
function Counter({ params, query, state }) {
  // Store state outside component
  let count = state.count || 0;
  
  const html = `
    <div class="counter">
      <h1>Counter: <span id="count">${count}</span></h1>
      <button id="increment">+</button>
      <button id="decrement">-</button>
    </div>
  `;
  
  // Setup event listeners after render
  setTimeout(() => {
    document.getElementById('increment')?.addEventListener('click', () => {
      count++;
      document.getElementById('count').textContent = count;
    });
    
    document.getElementById('decrement')?.addEventListener('click', () => {
      count--;
      document.getElementById('count').textContent = count;
    });
  }, 0);
  
  return html;
}

router.add('/counter', Counter);
```

### Reusable Component Pattern

```javascript
// Component factory
function createListComponent(title, items) {
  return () => `
    <div class="list">
      <h1>${title}</h1>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Use factory
router.add('/fruits', createListComponent('Fruits', ['Apple', 'Banana', 'Orange']));
router.add('/colors', createListComponent('Colors', ['Red', 'Green', 'Blue']));
```

## Advanced Features

### Query Parameters

```javascript
router.add('/search', ({ query }) => {
  const searchTerm = query.q || '';
  const page = parseInt(query.page) || 1;
  
  return `
    <div class="search">
      <h1>Search Results for "${searchTerm}"</h1>
      <p>Page: ${page}</p>
      <nav>
        <a href="/search?q=${searchTerm}&page=${page - 1}">Previous</a>
        <a href="/search?q=${searchTerm}&page=${page + 1}">Next</a>
      </nav>
    </div>
  `;
});

// Navigate with query params
router.navigate('/search', {
  query: { q: 'javascript', page: 1 }
});
```

### Route Metadata

```javascript
router.add('/admin', AdminComponent, {
  meta: {
    title: 'Admin Panel',
    requiresAuth: true,
    requiresAdmin: true,
    layout: 'admin',
    breadcrumb: 'Administration'
  }
});

// Use in middleware
router.use(async (context, next) => {
  const { meta } = context.to;
  
  if (meta.layout) {
    applyLayout(meta.layout);
  }
  
  if (meta.breadcrumb) {
    updateBreadcrumb(meta.breadcrumb);
  }
  
  await next();
});
```

### Event Handling

```javascript
// Listen to navigation events
router.on('navigate', (to, from) => {
  console.log('Navigation complete:', to.path);
});

router.on('beforeNavigate', (to, from) => {
  console.log('About to navigate to:', to.path);
});

router.on('error', (error) => {
  console.error('Router error:', error);
  // Show error message to user
  showErrorNotification(error.message);
});

// Remove listener
const handler = (to) => console.log('Navigate:', to.path);
router.on('navigate', handler);
router.off('navigate', handler);
```

### Active Links

```javascript
// Check if route is active
if (router.isActive('/products')) {
  console.log('We are in products section');
}

if (router.isActive('/products/123', true)) {
  console.log('We are exactly on product 123');
}

// Active classes are automatically applied
// Links matching current route get: router-link-active
// Exact matches get: router-link-exact-active
```

### Transitions and Animations

```javascript
import { fadeIn, fadeOut } from './utils/dom.js';

router.use(async (context, next) => {
  const container = document.getElementById('app');
  
  // Fade out current content
  await fadeOut(container, 200);
  
  // Navigate
  await next();
  
  // Fade in new content
  await fadeIn(container, 200);
});
```

### State Management

```javascript
// Simple state store
const store = {
  user: null,
  cart: [],
  theme: 'light'
};

// Use state in components
router.add('/profile', () => {
  if (!store.user) {
    router.navigate('/login');
    return '';
  }
  
  return `
    <div class="profile">
      <h1>Welcome, ${store.user.name}!</h1>
      <p>Cart items: ${store.cart.length}</p>
    </div>
  `;
});

// Update state and re-navigate
function updateUserAndNavigate(user) {
  store.user = user;
  router.navigate('/profile');
}
```

### Error Handling

```javascript
// Global error handler
router.on('error', (error) => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="error-page">
      <h1>Oops! Something went wrong</h1>
      <p>${error.message}</p>
      <button onclick="window.router.navigate('/')">Go Home</button>
    </div>
  `;
});

// Component-level error handling
router.add('/api-data', async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return `<div>${JSON.stringify(data)}</div>`;
  } catch (error) {
    return `
      <div class="error">
        <h2>Error loading data</h2>
        <p>${error.message}</p>
        <button onclick="window.router.navigate('/api-data')">Retry</button>
      </div>
    `;
  }
});
```

### Preloading Routes

```javascript
import { loader } from './components/loader.js';

// Preload critical routes on app start
loader.preload([
  './components/Home.js',
  './components/Products.js',
  './components/About.js'
]);

// Preload on hover (for better UX)
document.addEventListener('mouseover', (e) => {
  const link = e.target.closest('a[href^="/"]');
  if (link) {
    const route = router.routes.get(link.getAttribute('href'));
    if (route?.component) {
      loader.load(route.component);
    }
  }
});
```

## Complete Example Application

```javascript
import { createRouter } from './router/core.js';
import { ready } from './utils/dom.js';

// Components
const Home = () => `
  <div class="home">
    <h1>Welcome</h1>
    <nav>
      <a href="/products">View Products</a>
      <a href="/about">About Us</a>
    </nav>
  </div>
`;

const Products = async () => {
  const products = await fetch('/api/products').then(r => r.json());
  return `
    <div class="products">
      <h1>Products</h1>
      ${products.map(p => `
        <div class="product">
          <h3>${p.name}</h3>
          <a href="/products/${p.id}">Details</a>
        </div>
      `).join('')}
    </div>
  `;
};

const ProductDetail = async ({ params }) => {
  const product = await fetch(`/api/products/${params.id}`).then(r => r.json());
  return `
    <div class="product-detail">
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <button onclick="window.router.back()">Back</button>
    </div>
  `;
};

const NotFound = () => `
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <a href="/">Go Home</a>
  </div>
`;

// Initialize router
ready(() => {
  const router = createRouter({ el: '#app' });
  
  // Routes
  router.add('/', Home);
  router.add('/products', Products);
  router.add('/products/:id', ProductDetail);
  router.add('*', NotFound);
  
  // Middleware
  router.use(async (context, next) => {
    document.title = `My App - ${context.to.path}`;
    await next();
  });
  
  // Guards
  router.beforeEach((to, from, next) => {
    console.log('Navigating:', to.path);
    next();
  });
  
  // Start
  router.start();
  window.router = router;
});
```

This comprehensive guide covers most common use cases for the Vanilla JS Router. For more details, see the [API Documentation](API.md).
