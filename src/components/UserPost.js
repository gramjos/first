/**
 * User Post Component - Demonstrates nested parameters
 */
export default function UserPost({ params, query, state }) {
  const { userId, postId } = params;

  return `
    <div class="page user-post-page">
      <h1>User Post Viewer</h1>
      
      <div class="user-post">
        <div class="user-info">
          <h2>User #${userId}</h2>
          <p>This demonstrates nested route parameters.</p>
        </div>
        
        ${postId ? `
          <div class="post-info">
            <h3>Post #${postId}</h3>
            <p>This is the content of post ${postId} by user ${userId}.</p>
          </div>
        ` : `
          <p>No specific post selected.</p>
        `}
        
        <div class="route-info">
          <h4>Route Information:</h4>
          <ul>
            <li><strong>User ID:</strong> ${userId}</li>
            <li><strong>Post ID:</strong> ${postId || 'Not specified (optional parameter)'}</li>
            <li><strong>Query Params:</strong> ${JSON.stringify(query)}</li>
          </ul>
        </div>
      </div>

      <div class="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  `;
}
