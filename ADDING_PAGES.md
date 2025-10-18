# Adding New Pages - Quick Guide

## 🚀 How to Add a New Page

Adding a new page is as simple as adding a JSON object to `pages.json`!

### Main Page

To add a new **main page** (appears in navigation):

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

### Sub-Page

To add a **sub-page** (nested under a main page):

Add it to the `subPages` array of a main page:

```json
{
  "id": "about",
  "type": "main",
  "path": "/about",
  "title": "About",
  "pageTitle": "About - Simple SPA",
  "icon": "ℹ️",
  "content": { ... },
  "subPages": [
    {
      "id": "about-history",
      "path": "/about/history",
      "title": "History",
      "pageTitle": "Our History - Simple SPA",
      "content": {
        "heading": "Our History",
        "sections": [
          {
            "type": "paragraph",
            "text": "Founded in 2025..."
          }
        ]
      }
    }
  ]
}
```

## 📋 Required Properties

### Main Page Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique identifier for the page |
| `type` | string | ✅ Yes | Must be `"main"` for main pages |
| `path` | string | ✅ Yes | URL path (e.g., `/contact`) |
| `title` | string | ✅ Yes | Display title in navigation |
| `pageTitle` | string | ✅ Yes | Browser tab title |
| `icon` | string | ❌ No | Optional emoji icon for nav |
| `content` | object | ✅ Yes | Page content definition |
| `subPages` | array | ❌ No | Array of sub-page objects |

### Sub-Page Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ Yes | Unique identifier |
| `path` | string | ✅ Yes | URL path (e.g., `/about/team`) |
| `title` | string | ✅ Yes | Display title |
| `pageTitle` | string | ✅ Yes | Browser tab title |
| `content` | object | ✅ Yes | Page content definition |

## 📝 Content Structure

The `content` object defines the page layout:

```json
{
  "content": {
    "heading": "Page Heading",
    "sections": [
      // Array of section objects
    ]
  }
}
```

## 🧩 Section Types

### 1. Paragraph

```json
{
  "type": "paragraph",
  "text": "Plain text paragraph"
}
```

Or with HTML:

```json
{
  "type": "paragraph",
  "html": "Paragraph with <strong>HTML</strong> content"
}
```

### 2. Heading

```json
{
  "type": "heading",
  "level": 2,
  "text": "Section Heading"
}
```

Levels: 1-6 (default: 2)

### 3. List

```json
{
  "type": "list",
  "items": [
    "First item",
    "Second item with <strong>HTML</strong>",
    "Third item"
  ]
}
```

### 4. Code Block

```json
{
  "type": "code",
  "language": "javascript",
  "code": "const hello = 'world';\nconsole.log(hello);"
}
```

### 5. Raw HTML

```json
{
  "type": "html",
  "html": "<div class='custom'>Any HTML here</div>"
}
```

## 🎯 Complete Example

Here's a complete example adding a "Services" page with two sub-pages:

```json
{
  "id": "services",
  "type": "main",
  "path": "/services",
  "title": "Services",
  "pageTitle": "Our Services - Simple SPA",
  "icon": "🛠️",
  "content": {
    "heading": "Our Services",
    "sections": [
      {
        "type": "paragraph",
        "text": "We offer a wide range of professional services."
      },
      {
        "type": "heading",
        "level": 2,
        "text": "What We Do"
      },
      {
        "type": "list",
        "items": [
          "Web Development",
          "Mobile Apps",
          "Consulting"
        ]
      }
    ]
  },
  "subPages": [
    {
      "id": "services-web",
      "path": "/services/web",
      "title": "Web Development",
      "pageTitle": "Web Development - Simple SPA",
      "content": {
        "heading": "Web Development",
        "sections": [
          {
            "type": "paragraph",
            "text": "We build modern, responsive websites."
          },
          {
            "type": "paragraph",
            "html": "<a href=\"/services\" data-link>← Back to Services</a>"
          }
        ]
      }
    },
    {
      "id": "services-mobile",
      "path": "/services/mobile",
      "title": "Mobile Apps",
      "pageTitle": "Mobile Apps - Simple SPA",
      "content": {
        "heading": "Mobile App Development",
        "sections": [
          {
            "type": "paragraph",
            "text": "Native and cross-platform mobile applications."
          },
          {
            "type": "paragraph",
            "html": "<a href=\"/services\" data-link>← Back to Services</a>"
          }
        ]
      }
    }
  ]
}
```

## 🔄 After Adding Pages

1. Open `pages.json`
2. Add your page object to the `pages` array
3. Save the file
4. Refresh your browser - that's it! ✨

The navigation will automatically update, and your new page will be live.

## 💡 Tips

- **Icons**: Use emojis for visual appeal (🏠 📧 ℹ️ 🛠️)
- **Paths**: Use `/parent/child` format for sub-pages
- **Links**: Use `data-link` attribute for internal links
- **HTML**: You can use HTML in most text fields for rich formatting
- **Sub-pages**: Automatically shown as "Related Pages" on parent page

## 🎨 Navigation Behavior

- **Main pages** appear in the top navigation bar
- **Sub-pages** are accessible via direct URL or links
- **Parent pages** show automatic "Related Pages" section
- **Active states** highlight current page in navigation

## 📦 No Build Required

That's the beauty of this architecture - just edit JSON and reload! No compilation, no build step, no complex tools.
