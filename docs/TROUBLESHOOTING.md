# Vanilla JS Router - Troubleshooting Guide

## Common Issues and Solutions

### 1. Direct URL Access Returns 404

**Problem:** When accessing a route directly (e.g., `https://example.com/products/123`), the server returns a 404 error.

**Cause:** The server is trying to find a physical file at that path, but it doesn't exist. SPAs need all routes to serve the same `index.html` file.

**Solution:** Configure your server to fallback to `index.html` for all routes:

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /src/index.html [L]
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /src/index.html;
}
```

**Node.js/Express:**
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});
```

---

### 2. Links Not Working / Opening New Pages

**Problem:** Clicking links causes full page reload instead of SPA navigation.

**Possible Causes:**
1. Links don't start with `/`
2. Links have `target="_blank"` attribute
3. Links have `download` attribute
4. Router not started

**Solution:**
```html
<!-- ✓ Good - Will be handled by router -->
<a href="/about">About</a>
<a href="/products/123">Product</a>

<!-- ✗ Bad - Will NOT be handled by router -->
<a href="about">About</a> <!-- Missing leading / -->
<a href="/external" target="_blank">External</a>
<a href="https://example.com">External</a>
<a href="/file.pdf" download>Download</a>
```

Ensure router is started:
```javascript
router.start(); // Don't forget this!
```

---

### 3. CSS/JavaScript Files Not Loading

**Problem:** After navigating to a route like `/products/123`, CSS and JS files return 404.

**Cause:** Relative paths in HTML become incorrect when URL depth changes.

**Solution:** Use absolute paths:

```html
<!-- ✗ Bad - Relative paths -->
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

<!-- ✓ Good - Absolute paths -->
<link rel="stylesheet" href="/src/styles.css">
<script type="module" src="/src/app.js"></script>
```

---

### 4. Back Button Doesn't Work

**Problem:** Browser back button causes page reload or doesn't work as expected.

**Cause:** Using direct `window.history` manipulation instead of router methods.

**Solution:** Always use router navigation methods:

```javascript
// ✓ Good
router.navigate('/products');
router.back();
router.forward();

// ✗ Bad
window.history.pushState({}, '', '/products');
window.history.back();
```

---

### 5. Parameters Not Working

**Problem:** Route parameters like `:id` don't match or extract correctly.

**Cause:** Route pattern syntax error or incorrect route order.

**Solution:**

1. Check pattern syntax:
```javascript
// ✓ Good
router.add('/products/:id', Component);
router.add('/user/:userId/posts/:postId?', Component);

// ✗ Bad
router.add('/products/$id', Component); // Wrong syntax
router.add('/products/{id}', Component); // Wrong syntax
```

2. Order matters - specific routes before wildcards:
```javascript
// ✓ Good order
router.add('/', Home);
router.add('/products/:id', ProductDetail);
router.add('*', NotFound);

// ✗ Bad order - wildcard catches everything
router.add('*', NotFound);
router.add('/products/:id', ProductDetail); // Never reached!
```

---

### 6. Navigation Guard Redirect Loop

**Problem:** `beforeEach` guard causes infinite redirect loop.

**Cause:** Guard redirects to a route that triggers the same guard again.

**Solution:** Add condition to prevent loops:

```javascript
// ✗ Bad - Causes loop
router.beforeEach((to, from, next) => {
  if (!isAuthenticated()) {
    next('/login'); // If /login also requires auth, loop!
  } else {
    next();
  }
});

// ✓ Good - Prevents loop
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

// ✓ Better - Use meta flag
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});
```

---

### 7. Component Not Rendering

**Problem:** Component function executes but nothing appears on screen.

**Possible Causes:**
1. Container element doesn't exist
2. Component returns nothing
3. Component returns wrong type

**Solution:**

1. Verify container exists:
```javascript
const router = createRouter({ el: '#app' }); // Make sure #app exists!
```

```html
<div id="app">Loading...</div> <!-- Must exist before router.start() -->
```

2. Ensure component returns valid content:
```javascript
// ✓ Good
router.add('/', () => '<h1>Home</h1>');
router.add('/', () => {
  const div = document.createElement('div');
  div.textContent = 'Home';
  return div;
});

// ✗ Bad
router.add('/', () => {
  console.log('Home');
  // Forgot to return!
});
```

---

### 8. Async Component Issues

**Problem:** Async component doesn't render or causes errors.

**Cause:** Not awaiting promise or incorrect async pattern.

**Solution:**

```javascript
// ✓ Good - Async component
router.add('/users', async ({ params }) => {
  const response = await fetch('/api/users');
  const users = await response.json();
  return `<div>${JSON.stringify(users)}</div>`;
});

// ✓ Good - Lazy loading
router.add('/dashboard', async () => {
  const module = await import('./components/Dashboard.js');
  return module.default;
});

// ✗ Bad - Not handling promise
router.add('/users', ({ params }) => {
  fetch('/api/users').then(r => r.json()); // No return!
});
```

---

### 9. Query Parameters Not Parsed

**Problem:** `query` object is empty even though URL has query string.

**Cause:** Query parsing is automatic but might fail with malformed URLs.

**Solution:**

```javascript
// Query params are automatically parsed
router.add('/search', ({ query }) => {
  console.log(query.q); // Auto-parsed from ?q=test
  return `<h1>Search: ${query.q}</h1>`;
});

// Navigate with query params
router.navigate('/search', {
  query: { q: 'test', page: 1 }
});

// Or use URL
router.navigate('/search?q=test&page=1');
```

---

### 10. Memory Leaks with Event Listeners

**Problem:** Event listeners accumulate on each navigation, causing memory leaks.

**Cause:** Adding event listeners in components without cleanup.

**Solution:**

```javascript
// ✗ Bad - No cleanup
function BadComponent() {
  setTimeout(() => {
    document.getElementById('btn').addEventListener('click', handler);
  }, 0);
  return '<button id="btn">Click</button>';
}

// ✓ Better - Use event delegation on parent
function GoodComponent() {
  return `
    <div id="component" onclick="handleClick(event)">
      <button data-action="submit">Submit</button>
    </div>
  `;
}

// ✓ Best - Clean up on route change
let cleanup = null;

router.beforeEach((to, from, next) => {
  if (cleanup) {
    cleanup(); // Clean up previous route
    cleanup = null;
  }
  next();
});

function BestComponent() {
  const handler = () => console.log('clicked');
  
  setTimeout(() => {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', handler);
    
    // Store cleanup function
    cleanup = () => {
      btn.removeEventListener('click', handler);
    };
  }, 0);
  
  return '<button id="btn">Click</button>';
}
```

---

## Performance Optimization

### 1. Lazy Load Components

```javascript
// Load components only when needed
router.add('/dashboard', async () => {
  const module = await import('./components/Dashboard.js');
  return module.default;
});
```

### 2. Preload Critical Routes

```javascript
import { loader } from './components/loader.js';

// Preload on app start
loader.preload([
  './components/Home.js',
  './components/Products.js'
]);

// Preload on hover
document.addEventListener('mouseover', (e) => {
  const link = e.target.closest('a[href]');
  if (link) {
    // Preload component for this link
  }
});
```

### 3. Cache API Responses

```javascript
const cache = new Map();

router.add('/users', async () => {
  if (cache.has('users')) {
    return renderUsers(cache.get('users'));
  }
  
  const users = await fetch('/api/users').then(r => r.json());
  cache.set('users', users);
  return renderUsers(users);
});
```

### 4. Debounce Navigation

```javascript
import { debounce } from './utils/dom.js';

const debouncedNavigate = debounce((path) => {
  router.navigate(path);
}, 300);

// Use debounced version for rapid navigation
debouncedNavigate('/search?q=' + searchTerm);
```

---

## Best Practices

### 1. Always Use Named Routes

```javascript
router.add('/products/:id', ProductDetail, {
  name: 'product-detail'
});

// Easier to refactor later
router.navigate('/products/123'); // URL might change
```

### 2. Use Meta for Route Configuration

```javascript
router.add('/admin', AdminComponent, {
  meta: {
    requiresAuth: true,
    requiresAdmin: true,
    title: 'Admin Panel',
    layout: 'admin'
  }
});

// Centralized configuration
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuth()) {
    next('/login');
  } else {
    next();
  }
});
```

### 3. Organize Routes in Separate File

```javascript
// routes.js
export const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
  // ...
];

// app.js
import { routes } from './routes.js';
routes.forEach(route => router.add(route.path, route.component, route));
```

### 4. Handle Errors Globally

```javascript
router.on('error', (error) => {
  console.error('Router error:', error);
  
  // Show user-friendly message
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="error">
      <h1>Oops!</h1>
      <p>Something went wrong. Please try again.</p>
      <button onclick="location.reload()">Reload</button>
    </div>
  `;
});
```

### 5. Use TypeScript (Optional)

```typescript
// types.d.ts
interface RouteContext {
  params: Record<string, string>;
  query: Record<string, string>;
  state: any;
  meta: Record<string, any>;
  name: string | null;
  path: string;
}

type Component = (context: RouteContext) => string | HTMLElement | Promise<string | HTMLElement>;
```

### 6. Test Routes

```javascript
// test-routes.js
import { Route } from './router/route.js';

const tests = [
  {
    pattern: '/products/:id',
    test: '/products/123',
    expected: { id: '123' }
  }
];

tests.forEach(({ pattern, test, expected }) => {
  const route = new Route(pattern, () => {});
  const match = route.match(test);
  console.assert(
    JSON.stringify(match?.params) === JSON.stringify(expected),
    `Failed: ${pattern} with ${test}`
  );
});
```

---

## Debugging Tips

### 1. Enable Console Logging

```javascript
router.on('beforeNavigate', (to, from) => {
  console.log('Before:', from?.path, '->', to.path);
});

router.on('navigate', (to, from) => {
  console.log('After:', from?.path, '->', to.path);
});

router.on('error', (error) => {
  console.error('Error:', error);
});
```

### 2. Inspect Current Route

```javascript
// In browser console
window.router.getCurrentRoute();

// Check if route is active
window.router.isActive('/products');
```

### 3. List All Routes

```javascript
// In browser console
window.router.routes.forEach((route, path) => {
  console.log(path, route);
});
```

### 4. Monitor History Changes

```javascript
window.addEventListener('popstate', (event) => {
  console.log('History changed:', window.location.pathname, event.state);
});
```

---

## Migration from Hash Routing

If you're migrating from hash-based routing (`#/path`):

1. **Update all links:**
```javascript
// Before: #/products
<a href="#/products">Products</a>

// After: /products
<a href="/products">Products</a>
```

2. **Update route definitions:**
```javascript
// Before
router.add('#/products', ProductsComponent);

// After
router.add('/products', ProductsComponent);
```

3. **Configure server** for SPA fallback (see solution #1 above)

4. **Update JavaScript navigation:**
```javascript
// Before
location.hash = '#/products';

// After
router.navigate('/products');
```

5. **Test all routes** by accessing them directly in the browser

---

## Getting Help

If you're still stuck:

1. Check the [API Documentation](API.md)
2. Review [Usage Examples](EXAMPLES.md)
3. Enable debug logging
4. Check browser console for errors
5. Verify server configuration
6. Test in incognito mode (to rule out cache issues)

## Contributing

Found a bug or have a feature request? Please open an issue on GitHub.
