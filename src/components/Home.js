/**
 * Home Component
 */
export default function Home({ params, query, state }) {
  return `
    <div class="page home-page">
      <h1>Welcome to Vanilla JS Router</h1>
      <p>A modern, lightweight routing solution for single-page applications.</p>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h3>🚀 Clean URLs</h3>
          <p>Uses History API for clean URLs without hash symbols</p>
        </div>
        
        <div class="feature-card">
          <h3>🔗 Deep Linking</h3>
          <p>Full support for bookmarkable and shareable URLs</p>
        </div>
        
        <div class="feature-card">
          <h3>⚡ Lightweight</h3>
          <p>Zero dependencies, pure vanilla JavaScript</p>
        </div>
        
        <div class="feature-card">
          <h3>🎯 Extensible</h3>
          <p>Middleware, guards, and hooks for complete control</p>
        </div>
      </div>

      <div class="demo-links">
        <h2>Try Navigation:</h2>
        <nav>
          <a href="/about">About</a>
          <a href="/notebook">Interactive Notebook</a>
          <a href="/products">Products</a>
          <a href="/products/123">Product Detail</a>
          <a href="/user/42/posts/100">User Post</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </div>
  `;
}
