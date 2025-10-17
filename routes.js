/**
 * Route Definitions
 * Define all application routes and their content
 */

const routes = [
  {
    path: '/',
    title: 'Home - Simple SPA',
    render: () => `
      <h1>Welcome Home</h1>
      <p>This is a simple 2-page Single Page Application.</p>
      <p>Features:</p>
      <ul>
        <li>✅ Client-side routing</li>
        <li>✅ Deep linking support</li>
        <li>✅ Works on Cloudflare Pages</li>
        <li>✅ No build tools required</li>
        <li>✅ Separated by language (HTML, CSS, JS)</li>
      </ul>
      <p><a href="/about" data-link>Learn more about this app →</a></p>
    `
  },
  {
    path: '/gj',
    title: 'Fun in the Sun',
    render: () => `
      <h1>Sun fund our fun</h1>
      <p>This is a simple N-page Single Page Application.</p>
      <p>Benefits:</p>
      <ul>
        <li>be in the sun</li>
      </ul>
      <p><a href="/" data-link>Back HOME homie→</a></p>
    `
  },
  {
    path: '/about',
    title: 'About - Simple SPA',
    render: () => `
      <h1>About This App</h1>
      <p>This is a minimal Single Page Application built with vanilla JavaScript.</p>
      <p>It demonstrates:</p>
      <ul>
        <li><strong>Client-side routing:</strong> Navigation without page reloads</li>
        <li><strong>Deep linking:</strong> You can bookmark or share any URL</li>
        <li><strong>History API:</strong> Browser back/forward buttons work correctly</li>
        <li><strong>Code separation:</strong> HTML, CSS, and JavaScript in separate files</li>
      </ul>
      <h2>How Deep Linking Works on Cloudflare</h2>
      <p>Deep linking is enabled through a <code>_redirects</code> file that tells Cloudflare to serve <code>index.html</code> for all routes. The JavaScript router then handles the actual routing on the client side.</p>
      <h2>Project Structure</h2>
      <ul>
        <li><code>index.html</code> - HTML structure</li>
        <li><code>styles.css</code> - All styling</li>
        <li><code>router.js</code> - Router logic</li>
        <li><code>routes.js</code> - Route definitions</li>
        <li><code>app.js</code> - Application initialization</li>
        <li><code>_redirects</code> - Cloudflare Pages config</li>
      </ul>
      <p><a href="/" data-link>← Back to Home</a></p>
    `
  },
  {
    path: '*',
    title: '404 - Page Not Found',
    render: () => `
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p><a href="/" data-link>← Back to Home</a></p>
    `
  }
];

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = routes;
}
