# Example: Adding a "Services" Page

This example shows how to add a complete "Services" page with multiple sub-pages.

## Step 1: Open pages.json

Open the `pages.json` file in your editor.

## Step 2: Add the Page Object

Add this object to the `pages` array (after the existing pages):

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
        "text": "We offer a comprehensive range of professional services to help your business succeed."
      },
      {
        "type": "heading",
        "level": 2,
        "text": "What We Offer"
      },
      {
        "type": "list",
        "items": [
          "🌐 <strong>Web Development</strong> - Modern, responsive websites",
          "📱 <strong>Mobile Apps</strong> - Native and cross-platform solutions",
          "☁️ <strong>Cloud Services</strong> - Scalable infrastructure",
          "🎨 <strong>UI/UX Design</strong> - Beautiful, intuitive interfaces",
          "🔒 <strong>Security</strong> - Protect your digital assets"
        ]
      },
      {
        "type": "heading",
        "level": 2,
        "text": "Why Choose Us"
      },
      {
        "type": "paragraph",
        "html": "We combine <strong>technical expertise</strong> with a <strong>customer-first approach</strong> to deliver exceptional results."
      },
      {
        "type": "paragraph",
        "html": "Want to learn more? <a href=\"/contact\" data-link>Get in touch →</a>"
      }
    ]
  },
  "subPages": [
    {
      "id": "services-web",
      "path": "/services/web",
      "title": "Web Development",
      "pageTitle": "Web Development Services - Simple SPA",
      "content": {
        "heading": "Web Development",
        "sections": [
          {
            "type": "paragraph",
            "text": "We build modern, fast, and responsive websites that engage your users and grow your business."
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Technologies We Use"
          },
          {
            "type": "list",
            "items": [
              "HTML5, CSS3, JavaScript",
              "React, Vue, Angular",
              "Node.js, Express",
              "REST APIs, GraphQL",
              "Progressive Web Apps (PWA)"
            ]
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Our Process"
          },
          {
            "type": "paragraph",
            "html": "We follow an <strong>agile development process</strong> to ensure rapid delivery and continuous improvement."
          },
          {
            "type": "paragraph",
            "html": "<a href=\"/services\" data-link>← Back to Services</a> | <a href=\"/contact\" data-link>Request a quote →</a>"
          }
        ]
      }
    },
    {
      "id": "services-mobile",
      "path": "/services/mobile",
      "title": "Mobile Apps",
      "pageTitle": "Mobile App Development - Simple SPA",
      "content": {
        "heading": "Mobile App Development",
        "sections": [
          {
            "type": "paragraph",
            "text": "Create powerful mobile experiences that your users will love, on both iOS and Android."
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Platform Support"
          },
          {
            "type": "list",
            "items": [
              "📱 iOS (Swift, SwiftUI)",
              "🤖 Android (Kotlin, Jetpack Compose)",
              "⚛️ React Native (Cross-platform)",
              "🎯 Flutter (Cross-platform)"
            ]
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Features We Build"
          },
          {
            "type": "list",
            "items": [
              "User authentication & profiles",
              "Real-time notifications",
              "Offline functionality",
              "Payment integration",
              "Location services",
              "Camera & media handling"
            ]
          },
          {
            "type": "paragraph",
            "html": "<a href=\"/services\" data-link>← Back to Services</a>"
          }
        ]
      }
    },
    {
      "id": "services-cloud",
      "path": "/services/cloud",
      "title": "Cloud Services",
      "pageTitle": "Cloud Services - Simple SPA",
      "content": {
        "heading": "Cloud Infrastructure",
        "sections": [
          {
            "type": "paragraph",
            "text": "Scale your applications with robust, secure cloud infrastructure."
          },
          {
            "type": "heading",
            "level": 2,
            "text": "Cloud Providers"
          },
          {
            "type": "list",
            "items": [
              "☁️ AWS (Amazon Web Services)",
              "☁️ Google Cloud Platform",
              "☁️ Microsoft Azure",
              "☁️ Cloudflare",
              "☁️ Vercel, Netlify"
            ]
          },
          {
            "type": "code",
            "language": "yaml",
            "code": "# Example deployment config\nservice: my-app\nprovider: aws\nregion: us-east-1\nruntime: nodejs18.x"
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

## Step 3: Save and Test

1. Save `pages.json`
2. Refresh your browser at `http://localhost:8003`
3. You'll see "🛠️ Services" in the navigation
4. Click it to see your new page
5. Try the sub-pages: `/services/web`, `/services/mobile`, `/services/cloud`

## What This Example Shows

### Main Page Features
- ✅ Icon in navigation (`🛠️`)
- ✅ Multiple section types (paragraph, heading, list)
- ✅ HTML formatting in text
- ✅ Internal links with `data-link`
- ✅ Three sub-pages

### Sub-Page Features
- ✅ Hierarchical URLs (`/services/web`, etc.)
- ✅ Code blocks with syntax highlighting
- ✅ Navigation between related pages
- ✅ Automatic "Related Pages" section on parent

### Content Types Used
- 📝 Paragraphs (plain text and HTML)
- 📋 Lists (with emoji and HTML formatting)
- 🏷️ Headings (H1, H2)
- 💻 Code blocks (with language syntax)
- 🔗 Internal navigation links

## Customization Ideas

Want to customize this example?

1. **Change the icon**: Replace `"icon": "🛠️"` with any emoji
2. **Add more sub-pages**: Add objects to the `subPages` array
3. **Add images**: Use HTML section with `<img>` tags
4. **Add tables**: Use HTML section with `<table>` markup
5. **Change colors**: The theme automatically styles everything

## Next Steps

Once you've added this page:

1. Try adding another main page
2. Add more sub-pages to existing pages
3. Experiment with different section types
4. Create your own content structure

Remember: **No coding required!** Just edit the JSON, save, and refresh. 🚀
