---
id: about
type: main
path: /about
title: About
pageTitle: About - Simple SPA
icon: ℹ️
navOrder: 3
---

# About This App

This is a minimal Single Page Application built with vanilla JavaScript and a data-driven architecture.

## Key Features

- **Client-side routing:** Navigation without page reloads
- **Deep linking:** You can bookmark or share any URL
- **History API:** Browser back/forward buttons work correctly
- **Markdown-driven:** Pages defined in simple Markdown format
- **Sub-pages:** Support for nested page hierarchies

## How to Add New Pages

Simply add a new Markdown file to the `pages/` directory with frontmatter metadata:

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
```

## Deep Linking on Cloudflare

Deep linking is enabled through a `_redirects` file that tells Cloudflare to serve `index.html` for all routes. The JavaScript router then handles the actual routing on the client side.

[← Back to Home](/)
