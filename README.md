# Markdown-First SPA

A minimal Single Page Application with **Markdown-based page definitions** and deep linking support for Cloudflare Pages.

## ✨ Features

- ✅ **Markdown-first architecture** - Pages defined in simple Markdown files
- ✅ **Frontmatter metadata** - YAML frontmatter for page configuration
- ✅ **Main pages & Sub-pages** - Hierarchical page structure
- ✅ **Zero coding required** - Add pages by creating Markdown files
- ✅ **Auto-generated navigation** - Navigation links generated automatically
- ✅ Client-side routing
- ✅ Deep linking support (you can directly navigate to any URL)
- ✅ Browser back/forward buttons work
- ✅ No build tools or dependencies required
- ✅ Optimized for Cloudflare Pages hosting
- ✅ Clean separation of concerns (HTML, CSS, JavaScript)

## 🚀 Adding New Pages

**It's as simple as creating a Markdown file!**

### Add a Main Page

1. Create `pages/contact.md`:

```markdown
---
id: contact
type: main
path: /contact
title: Contact
pageTitle: Contact - Simple SPA
icon: 📧
navOrder: 4
---

# Contact Us

Get in touch with us!

Send us an email at [hello@example.com](mailto:hello@example.com)
```

2. Add to `pages/manifest.json`:

```json
{
  "pages": [
    "home.md",
    "gj.md",
    "about.md",
    "contact.md",
    "about/team.md",
    "about/technology.md"
  ]
}
```

### Add a Sub-Page

1. Create `pages/about/team.md`:

```markdown
---
id: about-team
path: /about/team
title: Team
pageTitle: Our Team - Simple SPA
---

# Our Team

Meet our amazing team!

[← Back to About](/about)
```

2. Add to `pages/manifest.json`

**That's it!** Refresh your browser and the new page appears. No coding, no build step.

📖 **[See ADDING_PAGES.md for complete guide →](./ADDING_PAGES.md)**

## How It Works

### Markdown-First Architecture

1. **Create Markdown Files** - Write pages in simple Markdown with frontmatter
2. **Parse Content** - Markdown parser extracts metadata and converts to HTML
3. **Load Pages** - Page loader fetches all markdown files from `pages/` directory
4. **Build Routes** - Router maps all paths (main + sub-pages)
5. **Render Content** - Renderer displays converted HTML
6. **Navigate** - History API handles client-side routing

### Supported Markdown Features

- **Headers** - `# H1`, `## H2`, `### H3`, etc.
- **Paragraphs** - Regular text separated by blank lines
- **Lists** - Unordered (`-`) and ordered (`1.`) lists
- **Links** - `[text](url)` with automatic `data-link` for internal links
- **Text formatting** - `**bold**`, `*italic*`, `` `code` ``
- **Code blocks** - ` ```language ` ... ` ``` `

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
├── index.html          # HTML structure and layout
├── styles.css          # All CSS styling
├── markdown-parser.js  # Markdown to HTML parser
├── page-loader.js      # Page loader from markdown files
├── renderer.js         # Page content renderer
├── router.js           # Router class and navigation logic
├── app.js              # Application initialization
├── pages/              # 📁 MARKDOWN PAGES (add .md files here!)
│   ├── manifest.json   # List of available pages
│   ├── home.md
│   ├── gj.md
│   ├── about.md
│   └── about/
│       ├── team.md
│       └── technology.md
├── pages.json          # Legacy JSON pages (fallback)
├── _redirects          # Cloudflare Pages redirects config
├── README.md           # This file
└── ADDING_PAGES.md     # Complete guide to adding pages
```

### Architecture

- **Content Layer** (`pages/` directory) - Markdown files with frontmatter
- **Parsing Layer** (`markdown-parser.js`) - Converts Markdown to HTML
- **Loading Layer** (`page-loader.js`) - Discovers and loads pages
- **Rendering Layer** (`renderer.js`) - Renders HTML content
- **Routing Layer** (`router.js`) - Handles navigation and history
- **Presentation Layer** (`styles.css`) - All styling
- **Initialization** (`app.js`) - Loads pages and starts app

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

Just create a new Markdown file:

**`pages/new-page.md`**

```markdown
---
id: new-page
type: main
path: /new-page
title: New Page
pageTitle: New Page - Simple SPA
icon: ✨
navOrder: 5
---

# My New Page

Content goes here!

You can use all standard Markdown features:
- Lists
- **Bold** and *italic* text
- [Links](/about)
- `Code`

## More Content

Add as many sections as you need.
```

Then add it to `pages/manifest.json`:

```json
{
  "pages": [
    "home.md",
    "gj.md",
    "about.md",
    "new-page.md",
    "about/team.md",
    "about/technology.md"
  ]
}
```

Save and refresh - done! ✨

### Adding Sub-Pages

Create a file in a subdirectory:

**`pages/about/new-subpage.md`**

```markdown
---
id: about-new-subpage
path: /about/new-subpage
title: New Sub-Page
pageTitle: New Sub-Page - Simple SPA
---

# New Sub-Page

This is a sub-page under About.

[← Back to About](/about)
```

**See [ADDING_PAGES.md](./ADDING_PAGES.md) for complete documentation.**
