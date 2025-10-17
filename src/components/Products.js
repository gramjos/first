/**
 * Products List Component
 */
export default function Products({ params, query, state }) {
  const products = [
    { id: 1, name: 'Widget Pro', price: '$29.99' },
    { id: 2, name: 'Gadget Plus', price: '$49.99' },
    { id: 3, name: 'Tool Master', price: '$79.99' },
    { id: 123, name: 'Special Item', price: '$99.99' }
  ];

  const productList = products.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <a href="/products/${product.id}" class="btn">View Details</a>
    </div>
  `).join('');

  return `
    <div class="page products-page">
      <h1>Products</h1>
      <p>Browse our collection of amazing products.</p>
      
      <div class="product-grid">
        ${productList}
      </div>

      <div class="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  `;
}
