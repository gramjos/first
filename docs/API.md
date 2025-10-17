# Vanilla JavaScript SPA Router - API Documentation

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Router API](#router-api)
- [Route Configuration](#route-configuration)
- [Navigation](#navigation)
- [Guards and Middleware](#guards-and-middleware)
- [Events](#events)
- [Server Configuration](#server-configuration)

## Installation

No installation required! This is pure vanilla JavaScript with zero dependencies.

Simply include the router in your project:

```javascript
import { createRouter } from './router/core.js';
```

## Quick Start

```javascript
import { createRouter } from './router/core.js';

// Create router instance
const router = createRouter({
  el: '#app',  // Container element selector
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active'
});

// Define routes
router.add('/', HomeComponent);
router.add('/about', AboutComponent);
router.add('/products/:id', ProductDetailComponent);
router.add('*', NotFoundComponent);

// Start the router
router.start();
```

## Router API

### `createRouter(options)`

Creates a new router instance.

**Options:**
- `el` (string): Selector for the container element (default: `'#app'`)
- `mode` (string): Routing mode (default: `'history'`)
- `root` (string): Base path for the app (default: `'/'`)
- `linkActiveClass` (string): Class for active links (default: `'router-link-active'`)
- `linkExactActiveClass` (string): Class for exact active links (default: `'router-link-exact-active'`)

**Example:**
```javascript
const router = createRouter({
  el: '#app',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact'
});
```

### `router.add(path, component, options)`

Registers a new route.

**Parameters:**
- `path` (string): Route path pattern
- `component` (function|string|Promise): Component to render
- `options` (object): Additional route options

**Path Patterns:**
- Static: `/about`
- Dynamic: `/user/:id`
- Optional params: `/user/:id/posts/:postId?`
- Wildcard: `*` (catch-all)

**Options:**
- `name` (string): Named route
- `meta` (object): Metadata for the route
- `beforeEnter` (function): Route-specific guard
- `children` (array): Nested routes
- `alias` (array): Alternative paths
- `redirect` (string|function): Redirect to another route

**Example:**
```javascript
router.add('/products/:id', ProductComponent, {
  name: 'product-detail',
  meta: { requiresAuth: true },
  beforeEnter: (to, from, next) => {
    // Check authentication
    next();
  }
});
```

### `router.navigate(path, options)`

Navigate to a new route.

**Parameters:**
- `path` (string): Target path
- `options` (object): Navigation options

**Options:**
- `state` (object): State to pass with navigation
- `replace` (boolean): Replace current history entry
- `query` (object): Query parameters

**Example:**
```javascript
router.navigate('/products/123');
router.navigate('/products/123', { 
  state: { from: 'home' },
  query: { ref: 'search' }
});
```

### `router.replace(path, options)`

Replace current route without adding to history.

**Example:**
```javascript
router.replace('/login');
```

### `router.back()`

Navigate to previous page.

**Example:**
```javascript
router.back();
```

### `router.forward()`

Navigate to next page in history.

**Example:**
```javascript
router.forward();
```

### `router.go(delta)`

Navigate to a specific point in history.

**Example:**
```javascript
router.go(-2);  // Go back 2 pages
router.go(1);   // Go forward 1 page
```

## Server Configuration

### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /index.html [L]
</IfModule>
```

### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Node.js (Express)

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000);
```

### Cloudflare Pages

Create a `_redirects` file:

```
/* /index.html 200
```

See full documentation for more details.
