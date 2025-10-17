/**
 * Product Detail Component
 */
export default function ProductDetail({ params, query, state }) {
  const productId = params.id;
  
  // Mock product data
  const products = {
    '1': { name: 'Widget Pro', price: '$29.99', description: 'A professional-grade widget' },
    '2': { name: 'Gadget Plus', price: '$49.99', description: 'An enhanced gadget with extra features' },
    '3': { name: 'Tool Master', price: '$79.99', description: 'The ultimate tool for professionals' },
    '123': { name: 'Special Item', price: '$99.99', description: 'A very special product just for you' }
  };

  const product = products[productId] || { name: 'Unknown Product', price: 'N/A', description: 'Product not found' };

  return `
    <div class="page product-detail-page">
      <h1>${product.name}</h1>
      
      <div class="product-detail">
        <div class="product-image">
          <div class="placeholder-image">📦</div>
        </div>
        
        <div class="product-info">
          <p class="price">${product.price}</p>
          <p class="description">${product.description}</p>
          
          <div class="meta">
            <p><strong>Product ID:</strong> ${productId}</p>
            ${query.ref ? `<p><strong>Referrer:</strong> ${query.ref}</p>` : ''}
            ${state.from ? `<p><strong>Came from:</strong> ${state.from}</p>` : ''}
          </div>
          
          <button class="btn" onclick="window.router.back()">← Go Back</button>
          <a href="/products" class="btn btn-secondary">All Products</a>
        </div>
      </div>

      <div class="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  `;
}
