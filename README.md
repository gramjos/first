# Data-Driven SPA

A minimal Single Page Application with **JSON-based page definitions** and deep linking support for Cloudflare Pages.

## ✨ Features

- ✅ **Data-driven architecture** - Pages defined in pure JSON
- ✅ **Main pages & Sub-pages** - Hierarchical page structure
- ✅ **Zero coding required** - Add pages by editing JSON
- ✅ Client-side routing
- ✅ Deep linking support (you can directly navigate to any URL)
- ✅ Browser back/forward buttons work
- ✅ No build tools or dependencies required
- ✅ Optimized for Cloudflare Pages hosting
- ✅ Clean separation of concerns (HTML, CSS, JavaScript)

## 🚀 Adding New Pages

**It's as simple as adding a JSON object!**

### Add a Main Page

Edit `pages.json` and add to the `pages` array:

```json
{
  "id": "contact",
  "type": "main",
  "path": "/contact",
  "title": "Contact",
  "pageTitle": "Contact - Simple SPA",
  "icon": "📧",
  "content": {
    "heading": "Contact Us",
    "sections": [
      {
        "type": "paragraph",
        "text": "Get in touch with us!"
      }
    ]
  }
}
```

### Add a Sub-Page

Add to the `subPages` array of any main page:

```json
{
  "id": "about-team",
  "path": "/about/team",
  "title": "Team",
  "pageTitle": "Our Team - Simple SPA",
  "content": {
    "heading": "Our Team",
    "sections": [
      {
        "type": "paragraph",
        "text": "Meet our amazing team!"
      }
    ]
  }
}
```

**That's it!** Refresh your browser and the new page appears. No coding, no build step.

📖 **[See ADDING_PAGES.md for complete guide →](./ADDING_PAGES.md)**

## How It Works

### Data-Driven Architecture

1. **Define Pages** - Edit `pages.json` to add/modify pages
2. **Load Data** - App fetches JSON on initialization
3. **Build Routes** - Router maps all paths (main + sub-pages)
4. **Render Content** - Renderer converts JSON sections to HTML
5. **Navigate** - History API handles client-side routing

### Content Sections

Pages support multiple section types:

- **Paragraph** - Text content with optional HTML
- **Heading** - H1-H6 headings
- **List** - Bullet lists with HTML support
- **Code** - Syntax-highlighted code blocks
- **HTML** - Raw HTML for custom content

### Client-Side Routing

The app uses the browser's History API to manage navigation without page reloads:

- Clicking navigation links updates the URL and renders the appropriate page
- The `popstate` event handles browser back/forward buttons
- The router matches the current path to a page definition and renders content

### Deep Linking on Cloudflare

Deep linking is enabled through the `_redirects` file:

```
/*    /index.html    200
```

This tells Cloudflare Pages to serve `index.html` for all routes (e.g., `/about`). Once `index.html` loads, the JavaScript router reads the current URL path and renders the appropriate page.

## File Structure

```
.
├── index.html       # HTML structure and layout
├── styles.css       # All CSS styling
├── renderer.js      # Page content renderer
├── router.js        # Router class and navigation logic
├── app.js           # Application initialization
├── pages.json       # 📄 PAGE DEFINITIONS (edit this to add pages!)
├── _redirects       # Cloudflare Pages redirects config
├── README.md        # This file
└── ADDING_PAGES.md  # Complete guide to adding pages
```

### Architecture

- **Data Layer** (`pages.json`) - All page content and structure
- **Rendering Layer** (`renderer.js`) - Converts JSON to HTML
- **Routing Layer** (`router.js`) - Handles navigation and history
- **Presentation Layer** (`styles.css`) - All styling
- **Initialization** (`app.js`) - Loads data and starts app

## 🎯 Page Types

### 1. Main Pages
- Appear in top navigation
- Defined with `"type": "main"`
- Can have multiple sub-pages
- Example: Home, About, Services

### 2. Sub-Pages
- Nested under main pages
- Added to `subPages` array
- Full deep-linking support
- Example: /about/team, /about/technology

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

### Adding a New Page

Just edit `pages.json`:

```json
{
  "pages": [
    // ... existing pages ...
    {
      "id": "new-page",
      "type": "main",
      "path": "/new-page",
      "title": "New Page",
      "pageTitle": "New Page - Simple SPA",
      "icon": "✨",
      "content": {
        "heading": "My New Page",
        "sections": [
          {
            "type": "paragraph",
            "text": "Content goes here!"
          }
        ]
      }
    }
  ]
}
```

Save and refresh - done! ✨

### Adding Sub-Pages

Add to the `subPages` array of any main page:

```json
{
  "id": "about",
  "type": "main",
  "path": "/about",
  "title": "About",
  "subPages": [
    {
      "id": "about-new-subpage",
      "path": "/about/new-subpage",
      "title": "New Sub-Page",
      "pageTitle": "New Sub-Page - Simple SPA",
      "content": { ... }
    }
  ]
}
```

**See [ADDING_PAGES.md](./ADDING_PAGES.md) for complete documentation.**
