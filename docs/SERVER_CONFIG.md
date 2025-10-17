# Server Configuration Examples

## Apache

### .htaccess (Already provided in root)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Don't rewrite for notebooks directory (external app)
  RewriteCond %{REQUEST_URI} !^/notebooks/

  # Rewrite everything else to index.html
  RewriteRule ^ /src/index.html [L]
</IfModule>
```

## Nginx

### nginx.conf

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/html;
  index index.html;

  # Main location
  location / {
    try_files $uri $uri/ /src/index.html;
  }

  # Static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Notebooks (external app)
  location /notebooks/ {
    try_files $uri $uri/ =404;
  }
}
```

## Node.js (Express)

### server.js

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// SPA fallback
app.get('*', (req, res) => {
  // Skip notebooks
  if (req.path.startsWith('/notebooks/')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Cloudflare Workers

### workers/index.js (See notebooks/index.js)

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname.startsWith("/health")) {
      return new Response(JSON.stringify({ made: "with marimo" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Skip notebooks directory
    if (url.pathname.startsWith('/notebooks/')) {
      return env.ASSETS.fetch(request);
    }

    // Check if file exists
    const asset = await env.ASSETS.fetch(request);
    
    // If file exists (status 200), return it
    if (asset.status === 200) {
      return asset;
    }

    // Otherwise, serve index.html for SPA routing
    const indexUrl = new URL(request.url);
    indexUrl.pathname = '/src/index.html';
    return env.ASSETS.fetch(indexUrl.toString());
  },
};
```

## Cloudflare Pages

### _redirects

```
# Serve notebooks as-is
/notebooks/* /notebooks/:splat 200

# SPA fallback for all other routes
/* /src/index.html 200
```

### public/_headers

```
/src/*.js
  Cache-Control: public, max-age=31536000, immutable

/src/*.css
  Cache-Control: public, max-age=31536000, immutable
```

## Python (Flask)

### app.py

```python
from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def root():
    return send_file('src/index.html')

@app.route('/notebooks/<path:path>')
def notebooks(path):
    return send_from_directory('notebooks', path)

@app.route('/<path:path>')
def catch_all(path):
    # Check if file exists
    if os.path.exists(path):
        return send_from_directory('.', path)
    # Otherwise serve index.html
    return send_file('src/index.html')

if __name__ == '__main__':
    app.run(port=3000, debug=True)
```

## IIS

### web.config

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="SPA Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/notebooks/" negate="true" />
          </conditions>
          <action type="Rewrite" url="/src/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## Development Server (Simple)

### serve.py (Python 3)

```python
import http.server
import socketserver
from urllib.parse import urlparse
import os

PORT = 3000

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Check if file exists
        if os.path.exists('.' + path):
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
        # Serve index.html for SPA routes
        if not path.startswith('/notebooks/'):
            self.path = '/src/index.html'
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever()
```

### serve.js (Node.js)

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './src/index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      // Serve index.html for SPA routes (not notebooks)
      if (!req.url.startsWith('/notebooks/')) {
        fs.readFile('./src/index.html', (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT);

console.log(`Server running at http://localhost:${PORT}/`);
```

## Testing Your Configuration

After configuring your server:

1. **Test direct URL access:**
   - Navigate to `http://yoursite.com/about`
   - Should load the app, not show 404

2. **Test refresh:**
   - Navigate within the app to `/products/123`
   - Refresh the page
   - Should stay on the same route

3. **Test deep links:**
   - Share URL `http://yoursite.com/user/42/posts/100`
   - Open in new browser window
   - Should load directly to that route

4. **Test static assets:**
   - CSS, JS files should load normally
   - Check browser network tab

5. **Test notebooks:**
   - Navigate to `/notebooks/output_dir/index.html`
   - Should load the external notebook app

## Common Issues

### Issue: CSS/JS not loading

**Cause:** Paths are relative, broken by routing

**Solution:** Use absolute paths starting with `/`:
```html
<link rel="stylesheet" href="/src/styles.css">
<script type="module" src="/src/app.js"></script>
```

### Issue: 404 on direct URL access

**Cause:** Server not configured for SPA

**Solution:** Implement server fallback to index.html

### Issue: External links navigating through router

**Cause:** Router intercepting all links

**Solution:** Use `target="_blank"` or full URLs for external links:
```html
<a href="/notebooks/..." target="_blank">Notebooks</a>
<a href="https://example.com">External</a>
```
