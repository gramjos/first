# JSON Schema for Pages

This document describes the structure of `pages.json`.

## Root Object

```json
{
  "pages": [],      // Array of page objects
  "config": {}      // Global configuration
}
```

## Page Object (Main Page)

```json
{
  "id": "string",           // Unique identifier (required)
  "type": "main",           // Must be "main" for main pages (required)
  "path": "string",         // URL path, e.g., "/" or "/about" (required)
  "title": "string",        // Display title in navigation (required)
  "pageTitle": "string",    // Browser tab/window title (required)
  "icon": "string",         // Optional emoji icon for navigation
  "content": {},            // Content object (required)
  "subPages": []            // Optional array of sub-page objects
}
```

## Sub-Page Object

```json
{
  "id": "string",           // Unique identifier (required)
  "path": "string",         // URL path, e.g., "/about/team" (required)
  "title": "string",        // Display title (required)
  "pageTitle": "string",    // Browser tab/window title (required)
  "content": {}             // Content object (required)
}
```

Note: Sub-pages don't have `type` or `icon` - they're nested under main pages.

## Content Object

```json
{
  "heading": "string",      // Main page heading (optional)
  "sections": []            // Array of section objects (required)
}
```

## Section Types

### 1. Paragraph

Plain text:
```json
{
  "type": "paragraph",
  "text": "Your text here"
}
```

With HTML:
```json
{
  "type": "paragraph",
  "html": "Text with <strong>HTML</strong>"
}
```

### 2. Heading

```json
{
  "type": "heading",
  "level": 2,              // 1-6, default is 2
  "text": "Heading text"
}
```

### 3. List

```json
{
  "type": "list",
  "items": [
    "First item",
    "Second with <strong>HTML</strong>",
    "Third item"
  ]
}
```

### 4. Code Block

```json
{
  "type": "code",
  "language": "javascript",  // Optional language identifier
  "code": "const x = 1;\nconsole.log(x);"
}
```

### 5. Raw HTML

```json
{
  "type": "html",
  "html": "<div class='custom'>Any HTML</div>"
}
```

## Config Object

```json
{
  "siteName": "string",           // Site name (optional)
  "defaultTitle": "string",       // Default browser title (optional)
  "footer": "string"              // Footer text (optional)
}
```

## Complete Example

```json
{
  "pages": [
    {
      "id": "home",
      "type": "main",
      "path": "/",
      "title": "Home",
      "pageTitle": "Home - My Site",
      "icon": "🏠",
      "content": {
        "heading": "Welcome",
        "sections": [
          {
            "type": "paragraph",
            "text": "Welcome to my site!"
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Features"
          },
          {
            "type": "list",
            "items": [
              "Fast",
              "Simple",
              "Modern"
            ]
          }
        ]
      }
    },
    {
      "id": "about",
      "type": "main",
      "path": "/about",
      "title": "About",
      "pageTitle": "About - My Site",
      "icon": "ℹ️",
      "content": {
        "heading": "About Us",
        "sections": [
          {
            "type": "paragraph",
            "text": "We build great things."
          }
        ]
      },
      "subPages": [
        {
          "id": "about-team",
          "path": "/about/team",
          "title": "Team",
          "pageTitle": "Our Team - My Site",
          "content": {
            "heading": "Our Team",
            "sections": [
              {
                "type": "paragraph",
                "text": "Meet our team members."
              }
            ]
          }
        }
      ]
    }
  ],
  "config": {
    "siteName": "My Awesome Site",
    "defaultTitle": "My Awesome Site",
    "footer": "© 2025 My Awesome Site"
  }
}
```

## Validation Rules

### Required Fields

**Main Page:**
- `id` - Must be unique across all pages
- `type` - Must be `"main"`
- `path` - Must start with `/`
- `title` - Cannot be empty
- `pageTitle` - Cannot be empty
- `content` - Must be an object with `sections` array

**Sub-Page:**
- `id` - Must be unique across all pages
- `path` - Must start with `/` and typically follows `/parent/child` pattern
- `title` - Cannot be empty
- `pageTitle` - Cannot be empty
- `content` - Must be an object with `sections` array

### Best Practices

1. **IDs**: Use kebab-case (e.g., `about-team`, `services-web`)
2. **Paths**: Use lowercase with hyphens (e.g., `/about/our-team`)
3. **Sub-page paths**: Follow parent structure (`/parent/child`)
4. **Icons**: Use single emoji characters for visual consistency
5. **Sections**: Keep sections focused and modular
6. **Links**: Use `data-link` attribute in HTML for internal links

## Section Type Decision Guide

| Content | Use This |
|---------|----------|
| Plain text | `paragraph` with `text` |
| Text with formatting | `paragraph` with `html` |
| Section title | `heading` with appropriate `level` |
| Bullet points | `list` with `items` array |
| Code snippet | `code` with `language` and `code` |
| Complex layout | `html` with custom markup |

## Tips

- **Keep it simple**: Start with paragraphs and lists
- **Use HTML sparingly**: Only when needed for formatting
- **Link between pages**: Use `<a href="/path" data-link>` for SPA navigation
- **Consistent structure**: Follow the same pattern for similar pages
- **Test incrementally**: Add one page at a time and test

## Error Handling

If `pages.json` is invalid:
- Check JSON syntax (commas, brackets, quotes)
- Verify all required fields are present
- Ensure paths start with `/`
- Make sure IDs are unique
- Check that all sections have a valid `type`

Use a JSON validator or linter to catch syntax errors before testing.
