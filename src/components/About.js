/**
 * About Component
 */
export default function About({ params, query, state }) {
  return `
    <div class="page about-page">
      <h1>About This Router</h1>
      
      <section>
        <h2>Features</h2>
        <ul>
          <li><strong>No Hash Routing:</strong> Uses HTML5 History API for clean URLs</li>
          <li><strong>Deep Linking:</strong> Bookmark and share any route</li>
          <li><strong>Route Parameters:</strong> Dynamic segments like /user/:id</li>
          <li><strong>Query Parameters:</strong> Full query string support</li>
          <li><strong>Middleware:</strong> Pre/post navigation hooks</li>
          <li><strong>Route Guards:</strong> Authentication checks before navigation</li>
          <li><strong>Lazy Loading:</strong> Load components on demand</li>
          <li><strong>Nested Routes:</strong> Parent-child relationships</li>
          <li><strong>Wildcards:</strong> Catch-all routes for 404 pages</li>
        </ul>
      </section>

      <section>
        <h2>Architecture</h2>
        <p>Built with a modular architecture:</p>
        <ul>
          <li><code>core.js</code> - Main router class</li>
          <li><code>route.js</code> - Route definition and matching</li>
          <li><code>history.js</code> - History API wrapper</li>
          <li><code>matcher.js</code> - URL pattern matching</li>
          <li><code>middleware.js</code> - Middleware pipeline</li>
        </ul>
      </section>

      <section>
        <h2>Browser Support</h2>
        <p>Supports all modern browsers with History API (IE10+)</p>
      </section>

      <div class="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  `;
}
