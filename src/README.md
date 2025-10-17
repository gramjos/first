# Vanilla JS Router - Quick Start

This directory contains a production-ready vanilla JavaScript SPA router with deep linking support.

## 🚀 Quick Start

Open `index.html` in a browser (requires a local server):

```bash
# Python
python3 -m http.server 3000

# Node.js  
npx http-server -p 3000

# Then open: http://localhost:3000/src/index.html
```

## 📁 Directory Structure

```
src/
├── index.html          # SPA entry point
├── styles.css          # Application styles
├── app.js              # Application bootstrap
├── routes.js           # Route definitions
├── router/             # Router core modules
│   ├── core.js         # Main Router class
│   ├── route.js        # Route matching
│   ├── history.js      # History API wrapper
│   ├── matcher.js      # URL pattern matching
│   └── middleware.js   # Guards & middleware
├── components/         # Demo components
│   ├── Home.js
│   ├── About.js
│   ├── Products.js
│   ├── ProductDetail.js
│   ├── UserPost.js
│   ├── Contact.js
│   ├── NotFound.js
│   └── loader.js       # Lazy loader
└── utils/
    └── dom.js          # DOM utilities
```

## 💡 Basic Usage

### 1. Create Router

```javascript
import { createRouter } from './router/core.js';

const router = createRouter({ el: '#app' });
```

### 2. Define Routes

```javascript
router.add('/', HomeComponent);
router.add('/about', AboutComponent);
router.add('/products/:id', ProductDetailComponent);
router.add('*', NotFoundComponent);
```

### 3. Start Router

```javascript
router.start();
```

## 🎯 Features

- ✅ Clean URLs (no hash routing)
- ✅ Deep linking support
- ✅ Route parameters (`:id`)
- ✅ Optional parameters (`:id?`)
- ✅ Query strings
- ✅ Wildcards (`*`)
- ✅ Navigation guards
- ✅ Middleware
- ✅ Lazy loading
- ✅ Active links
- ✅ Zero dependencies

## 📚 Documentation

- [API Reference](../docs/API.md)
- [Usage Examples](../docs/EXAMPLES.md)
- [Server Configuration](../docs/SERVER_CONFIG.md)
- [Troubleshooting](../docs/TROUBLESHOOTING.md)
- [Implementation Details](../IMPLEMENTATION.md)

## 🔧 Router API

### Navigation

```javascript
router.navigate('/path');
router.navigate('/path', { state: { key: 'value' } });
router.navigate('/path', { query: { key: 'value' } });
router.back();
router.forward();
```

### Guards

```javascript
router.beforeEach((to, from, next) => {
  // Check conditions
  next(); // or next('/redirect') or next(false)
});
```

### Middleware

```javascript
router.use(async (context, next) => {
  // Before navigation
  await next();
  // After navigation
});
```

### Events

```javascript
router.on('navigate', (to, from) => {
  console.log('Navigated to:', to.path);
});
```

## 🎨 Component Format

Components can return:

**HTML String:**
```javascript
function Home() {
  return '<h1>Home</h1>';
}
```

**DOM Element:**
```javascript
function Home() {
  const div = document.createElement('div');
  div.textContent = 'Home';
  return div;
}
```

**Async (with data fetching):**
```javascript
async function Users() {
  const users = await fetch('/api/users').then(r => r.json());
  return `<div>${JSON.stringify(users)}</div>`;
}
```

## 🌐 Server Configuration

For deep linking to work, configure your server to serve `index.html` for all routes:

### Apache (.htaccess in project root)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ /src/index.html [L]
```

### Nginx
```nginx
location / {
  try_files $uri $uri/ /src/index.html;
}
```

See [docs/SERVER_CONFIG.md](../docs/SERVER_CONFIG.md) for more examples.

## 🧪 Demo Routes

Try these routes in the demo:

- `/` - Home page
- `/about` - About the router
- `/products` - Product list
- `/products/123` - Product detail (dynamic param)
- `/user/42/posts/100` - User post (nested params)
- `/user/42/posts` - User posts (optional param)
- `/contact` - Contact form
- `/nonexistent` - 404 page (wildcard)

## 📝 Notes

- All routes are defined in `routes.js`
- Components are in `components/` directory
- Router logic is in `router/` directory
- Styles are in `styles.css`
- Entry point is `app.js`

## 🆘 Common Issues

**Links not working?**
- Ensure router is started with `router.start()`
- Check links start with `/`
- Verify no `target="_blank"` on links

**404 on direct URL?**
- Configure server fallback (see above)

**CSS not loading?**
- Use absolute paths: `/src/styles.css`

See [docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md) for more help.

## 📄 License

MIT License - Free to use in any project.
