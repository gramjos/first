# Adding New Pages - Quick Guide

## 🚀 How to Add a New Page

Adding a new page is as simple as creating a Markdown file in the `pages/` directory!

### Main Page

To add a new **main page** (appears in navigation):

1. Create a new file: `pages/contact.md`
2. Add frontmatter and content:

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

## Our Office

123 Main Street
City, State 12345
```

3. Add the file to `pages/manifest.json`:

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

### Sub-Page

To add a **sub-page** (nested under a main page):

1. Create a file in a subdirectory: `pages/about/history.md`
2. Add frontmatter and content:

```markdown
---
id: about-history
path: /about/history
title: History
pageTitle: Our History - Simple SPA
---

# Our History

Founded in 2025, we've been building great software ever since.

[← Back to About](/about)
```

3. Add the file to `pages/manifest.json`:

```json
{
  "pages": [
    "home.md",
    "gj.md",
    "about.md",
    "about/team.md",
    "about/technology.md",
    "about/history.md"
  ]
}
```

## 📋 Frontmatter Properties

### Main Page Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique identifier for the page |
| `type` | string | ✅ Yes | Must be `"main"` for main pages |
| `path` | string | ✅ Yes | URL path (e.g., `/contact`) |
| `title` | string | ✅ Yes | Display title in navigation |
| `pageTitle` | string | ✅ Yes | Browser tab title |
| `icon` | string | ❌ No | Optional emoji icon for nav |
| `navOrder` | number | ❌ No | Order in navigation (lower = first) |

### Sub-Page Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique identifier |
| `path` | string | ✅ Yes | URL path (e.g., `/about/team`) |
| `title` | string | ✅ Yes | Display title |
| `pageTitle` | string | ✅ Yes | Browser tab title |

## 📝 Markdown Content

Write your page content in standard Markdown below the frontmatter.

### Supported Markdown Features

#### Headers

```markdown
# Heading 1
## Heading 2
### Heading 3
```

#### Paragraphs

Just write text on separate lines. Blank lines separate paragraphs.

#### Lists

Unordered lists:
```markdown
- First item
- Second item
- Third item
```

Ordered lists:
```markdown
1. First item
2. Second item
3. Third item
```

#### Links

```markdown
[Link text](https://example.com)
[Internal link](/about)
```

Internal links (starting with `/`) automatically get the `data-link` attribute for client-side routing.

#### Text Formatting

```markdown
**Bold text**
*Italic text*
`Inline code`
```

#### Code Blocks

````markdown
```javascript
const hello = 'world';
console.log(hello);
```
````

## 🎯 Complete Example

Here's a complete example adding a "Services" page with two sub-pages:

### Main Page: `pages/services.md`

```markdown
---
id: services
type: main
path: /services
title: Services
pageTitle: Our Services - Simple SPA
icon: 🛠️
navOrder: 4
---

# Our Services

We offer a wide range of professional services.

## What We Do

- Web Development
- Mobile Apps
- Consulting

Check out our specialized services:
- [Web Development](/services/web)
- [Mobile Apps](/services/mobile)
```

### Sub-Page 1: `pages/services/web.md`

```markdown
---
id: services-web
path: /services/web
title: Web Development
pageTitle: Web Development - Simple SPA
---

# Web Development

We build modern, responsive websites.

[← Back to Services](/services)
```

### Sub-Page 2: `pages/services/mobile.md`

```markdown
---
id: services-mobile
path: /services/mobile
title: Mobile Apps
pageTitle: Mobile Apps - Simple SPA
---

# Mobile App Development

Native and cross-platform mobile applications.

[← Back to Services](/services)
```

### Update manifest: `pages/manifest.json`

```json
{
  "pages": [
    "home.md",
    "gj.md",
    "about.md",
    "services.md",
    "about/team.md",
    "about/technology.md",
    "services/web.md",
    "services/mobile.md"
  ]
}
```

## 🔄 After Adding Pages

1. Create your markdown file in the `pages/` directory
2. Add it to `pages/manifest.json`
3. Save both files
4. Refresh your browser - that's it! ✨

The navigation will automatically update, and your new page will be live.

## 💡 Tips

- **Icons**: Use emojis for visual appeal (🏠 📧 ℹ️ 🛠️)
- **Paths**: Use `/parent/child` format for sub-pages
- **Links**: Internal links (starting with `/`) automatically work with client-side routing
- **navOrder**: Control navigation order with the `navOrder` property (lower numbers appear first)
- **Sub-pages**: Automatically shown as "Related Pages" on parent page
- **Markdown**: Standard markdown features are supported (headers, lists, links, bold, italic, code)

## 🎨 Navigation Behavior

- **Main pages** (with `type: main`) appear in the top navigation bar
- **Sub-pages** are accessible via direct URL or links
- **Parent pages** automatically show "Related Pages" section with sub-pages
- **Active states** highlight current page in navigation
- **navOrder** determines the order pages appear in navigation

## 📦 No Build Required

That's the beauty of this architecture - just write Markdown and reload! No compilation, no build step, no complex tools.
