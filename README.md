# Vanilla JavaScript SPA Router

A modern, lightweight, zero-dependency routing system for single-page applications built entirely in vanilla JavaScript.

**Hosted at**: [grahamjoss.org](https://grahamjoss.org) (Cloudflare Pages)

## ✨ Features

- 🚀 **No Hash Routing** - Clean URLs using HTML5 History API (`/products/123` not `/#/products/123`)
- 🔗 **Deep Linking** - Full support for bookmarkable and shareable URLs
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript, no frameworks required
- 🎯 **Extensible** - Middleware, guards, and hooks for complete control
- 📦 **Lightweight** - Small footprint, fast performance
- 🔧 **Full Featured** - Route parameters, query strings, wildcards, nested routes
- 🎨 **Active Links** - Automatic CSS class management for navigation
- 📱 **Responsive** - Works on all modern browsers
- 📓 **Notebook Integration** - Marimo interactive notebooks with resizable side panel

## 🎯 Live Routes

- `/` - Home page with feature overview
- `/about` - About page
- `/notebook` - Interactive Marimo notebook with resizable side panel ⭐
- `/products` - Products listing
- `/contact` - Contact form

## 🚀 Quick Start

```javascript
import { createRouter } from './router/core.js';

// Create router
const router = createRouter({ el: '#app' });

// Define routes
router.add('/', HomeComponent);
router.add('/about', AboutComponent);
router.add('/products/:id', ProductDetailComponent);
router.add('*', NotFoundComponent);

// Start router
router.start();
```

## 📖 Documentation

- [API Documentation](docs/API.md) - Complete API reference
- [Server Configuration](#server-configuration) - Setup instructions
- [Examples](#examples) - Usage examples

## 🎯 Core Concepts

### Route Patterns

```javascript
// Static routes
router.add('/about', AboutComponent);

// Dynamic parameters
router.add('/user/:id', UserComponent);

// Optional parameters
router.add('/user/:id/posts/:postId?', PostComponent);

// Wildcard (404)
router.add('*', NotFoundComponent);
```

### Navigation

```javascript
// Programmatic navigation
router.navigate('/products/123');
router.navigate('/products', { query: { category: 'electronics' } });
router.back();
router.forward();

// Declarative (automatic)
<a href="/products">Products</a>
```

### Guards & Middleware

```javascript
// Global guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

// Middleware
router.use(async (context, next) => {
  console.log('Navigating to:', context.to.path);
  await next();
});
```

## 🔧 Server Configuration

### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ /src/index.html [L]
</IfModule>
```

### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Cloudflare Pages

See [notebooks/index.js](notebooks/index.js) for Cloudflare Workers integration.

## 📂 Project Structure

```
/src
  /router
    - core.js         # Main router class
    - route.js        # Route definition class
    - history.js      # History API wrapper
    - matcher.js      # URL pattern matching
    - middleware.js   # Middleware pipeline
  /components
    - loader.js       # Dynamic component loader
    - *.js           # Component files
  /utils
    - dom.js          # DOM manipulation helpers
  app.js             # Application entry point
  routes.js          # Route definitions
  index.html         # Main HTML file
  styles.css         # Styles
docs/
  - API.md           # API documentation
.htaccess           # Apache configuration
```

## 🎨 Examples

See the live demo at the root of this project. The demo includes:

- Static routes (Home, About)
- Dynamic routes (Products with ID)
- Nested parameters (User posts)
- Query parameters
- 404 handling
- Navigation guards
- Active link styling

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 10+ (with History API polyfill)

## 📝 Notes

- Cloudflare Pages with custom DNS (grahamjoss.org)
- Vanilla JS ethos with minor exceptions (Leaflet for maps, Marimo for notebooks)
- Data slice due to Cloudflare 25 MiB limit

## 📓 Marimo Notebook Integration

### Notebook Workflow
1. **Create notebook**: 
   ```bash
   uvx marimo edit notebook1.py
   ```

2. **Export for web**: 
   ```bash
   marimo export html-wasm notebook1.py -o output_dir --mode edit --include-cloudflare
   ```

3. **Access in app**: Navigate to `/notebook` route

### Data Processing Example
Slice GeoJSON data for size limits:
```bash
python -c '
import geopandas as g;
folder = "/Users/gramjos/Computation/cloud-pages/first/notebooks/public/";
d=g.read_file(folder+"bnsf_rail_il.geojson");
il_s=d[d["STATEAB"]=="IL"];
il_s.to_file(folder+"bnsf_rail_il.geojson",driver="GeoJSON");
'
```

### Side Panel Features
- **Toggle button** to open/close notebook
- **Resizable panel** - drag the left edge to adjust width
- **Header bar** with title and close button
- **Smooth animations** for professional UX
- **Proper cleanup** on route navigation

## 📄 License

MIT License - Free to use in any project.
