# Example: Adding a New "Contact" Page

This document demonstrates how easy it is to add a new page with the markdown-first architecture.

## Step 1: Create the Markdown File

Create `pages/contact.md`:

```markdown
---
id: contact
type: main
path: /contact
title: Contact
pageTitle: Contact Us - Simple SPA
icon: 📧
navOrder: 4
---

# Contact Us

We'd love to hear from you!

## Get in Touch

Send us an email at [hello@example.com](mailto:hello@example.com)

## Our Office

**Address:**
123 Main Street
Suite 100
San Francisco, CA 94105

**Phone:** (555) 123-4567

## Business Hours

- Monday - Friday: 9:00 AM - 5:00 PM
- Saturday: 10:00 AM - 2:00 PM
- Sunday: Closed

[← Back to Home](/)
```

## Step 2: Update the Manifest

Edit `pages/manifest.json`:

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

## Step 3: Refresh Browser

That's it! The new "Contact" page will:
- ✅ Appear in the navigation bar (with 📧 icon)
- ✅ Be accessible at `/contact`
- ✅ Support deep linking
- ✅ Work with client-side routing
- ✅ Display formatted content from markdown

## Adding a Sub-Page

Want to add a sub-page like "Contact/Locations"? Just as easy!

**Create `pages/contact/locations.md`:**

```markdown
---
id: contact-locations
path: /contact/locations
title: Locations
pageTitle: Our Locations - Simple SPA
---

# Our Locations

We have offices in multiple cities:

## San Francisco Office

123 Main Street, Suite 100
San Francisco, CA 94105

## New York Office

456 Broadway, Floor 12
New York, NY 10013

[← Back to Contact](/contact)
```

**Update `pages/manifest.json`:**

```json
{
  "pages": [
    "home.md",
    "gj.md",
    "about.md",
    "contact.md",
    "about/team.md",
    "about/technology.md",
    "contact/locations.md"
  ]
}
```

The sub-page will automatically appear in the "Related Pages" section on the Contact page!

## That's All!

No coding, no complex configuration, just simple Markdown files. 🎉
