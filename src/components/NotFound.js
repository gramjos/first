/**
 * 404 Not Found Component
 */
export default function NotFound({ params, query, state }) {
  return `
    <div class="page not-found-page">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        
        <div class="suggested-links">
          <h3>Try these instead:</h3>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  `;
}
