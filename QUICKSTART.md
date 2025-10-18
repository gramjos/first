# Quick Start Guide

Get started with the data-driven SPA in 3 minutes!

## 📥 What You Have

A complete Single Page Application with:
- ✅ JSON-based page management
- ✅ Main pages + Sub-pages support
- ✅ Deep linking on Cloudflare Pages
- ✅ Zero build tools required

## 🚀 Getting Started

### 1. View the Demo

```bash
# Start a local server
python3 -m http.server 8000

# Or use Node.js
npx serve

# Or use PHP
php -S localhost:8000
```

Visit: `http://localhost:8000`

### 2. Explore Existing Pages

- **/** - Home page
- **/about** - About page with sub-pages
- **/about/team** - Team sub-page
- **/about/technology** - Technology sub-page

### 3. Add Your First Page

Open `pages.json` and add this after the existing pages:

```json
{
  "id": "contact",
  "type": "main",
  "path": "/contact",
  "title": "Contact",
  "pageTitle": "Contact Us - Simple SPA",
  "icon": "📧",
  "content": {
    "heading": "Get in Touch",
    "sections": [
      {
        "type": "paragraph",
        "text": "We'd love to hear from you!"
      },
      {
        "type": "list",
        "items": [
          "📧 Email: hello@example.com",
          "🐦 Twitter: @example",
          "💼 LinkedIn: /company/example"
        ]
      }
    ]
  }
}
```

Save, refresh your browser, and see your new page! ✨

## 📚 Documentation

- **README.md** - Main documentation
- **ADDING_PAGES.md** - Complete guide to adding pages
- **SCHEMA.md** - JSON schema reference
- **EXAMPLE.md** - Full "Services" page example

## 🎯 Common Tasks

### Add a Main Page

Edit `pages.json`, add object to `pages` array with:
- `type: "main"`
- All required fields

### Add a Sub-Page

Add object to `subPages` array of any main page.

### Change Styling

Edit `styles.css` - all styles are centralized there.

### Configure Site

Edit the `config` section in `pages.json`:

```json
{
  "config": {
    "siteName": "My Site",
    "defaultTitle": "My Awesome Site",
    "footer": "© 2025 My Company"
  }
}
```

## 🌐 Deploy to Cloudflare Pages

1. Push to GitHub/GitLab
2. Connect to Cloudflare Pages
3. Build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
4. Deploy!

The `_redirects` file handles deep linking automatically.

## 💡 Tips

1. **JSON validation**: Use a JSON validator before testing
2. **Unique IDs**: Keep page IDs unique across all pages
3. **Test locally**: Always test before deploying
4. **Incremental changes**: Add one page at a time
5. **Use examples**: Copy patterns from existing pages

## 🆘 Troubleshooting

**Page not showing?**
- Check JSON syntax (commas, brackets, quotes)
- Verify all required fields are present
- Check browser console for errors

**Navigation not updating?**
- Make sure `type: "main"` for main pages
- Refresh the browser completely (Cmd+Shift+R / Ctrl+Shift+F5)

**Deep linking not working locally?**
- That's normal - it works on Cloudflare Pages
- Locally, manually navigate using the nav links

## 🎓 Next Steps

1. ✅ Add a Contact page
2. ✅ Add a Services page with sub-pages (see EXAMPLE.md)
3. ✅ Customize the styling in styles.css
4. ✅ Deploy to Cloudflare Pages
5. ✅ Share your site!

## 📖 Learn More

Read the full documentation:
- [ADDING_PAGES.md](./ADDING_PAGES.md) - How to add pages
- [SCHEMA.md](./SCHEMA.md) - JSON schema details
- [EXAMPLE.md](./EXAMPLE.md) - Complete example

---

**You're ready to build!** 🚀 Just edit `pages.json` and watch your site grow.
