# Simple 2-Page SPA

A minimal Single Page Application with deep linking support for Cloudflare Pages.

## Features

- ✅ 2 pages (Home and About)
- ✅ Client-side routing
- ✅ Deep linking support (you can directly navigate to any URL)
- ✅ Browser back/forward buttons work
- ✅ No build tools or dependencies required
- ✅ Optimized for Cloudflare Pages hosting

## How It Works

### Client-Side Routing

The app uses the browser's History API to manage navigation without page reloads:

- Clicking navigation links updates the URL and renders the appropriate page
- The `popstate` event handles browser back/forward buttons
- The router matches the current path to a route definition and renders the corresponding content

### Deep Linking on Cloudflare

Deep linking is enabled through the `_redirects` file:

```
/*    /index.html    200
```

This tells Cloudflare Pages to serve `index.html` for all routes (e.g., `/about`). Once `index.html` loads, the JavaScript router reads the current URL path and renders the appropriate page.

## File Structure

```
.
├── index.html       # Main HTML file with embedded router
├── _redirects       # Cloudflare Pages redirects config
└── README.md        # This file
```

## Deployment

### Cloudflare Pages

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Create a new project and connect your repository
4. Use these build settings:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. Deploy!

The `_redirects` file will automatically be picked up by Cloudflare Pages.

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Testing Deep Links

After deployment, you can test deep linking by:

1. Navigating to your app (e.g., `https://your-app.pages.dev/`)
2. Clicking to the About page
3. Copying the URL (`https://your-app.pages.dev/about`)
4. Opening that URL in a new browser tab

The About page should load directly without redirecting to the home page first.

## Extending the App

To add more pages:

1. Add a new route object to the `routes` array in `index.html`
2. Add a navigation link in the `<nav>` section
3. That's it!

Example:

```javascript
{
  path: '/contact',
  title: 'Contact - Simple SPA',
  render: () => \`
    <h1>Contact Us</h1>
    <p>Get in touch!</p>
  \`
}
```

```html
<a href="/contact" data-link>Contact</a>
```
