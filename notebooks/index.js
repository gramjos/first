export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname.startsWith("/health")) {
      return new Response(JSON.stringify({ made: "with marimo" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Skip notebooks directory - serve as-is
    if (url.pathname.startsWith('/notebooks/')) {
      return env.ASSETS.fetch(request);
    }

    // Try to fetch the requested asset
    const asset = await env.ASSETS.fetch(request);
    
    // If asset exists (status 200), return it
    if (asset.status === 200) {
      return asset;
    }

    // Otherwise, serve index.html for SPA routing
    // This enables deep linking for the vanilla JS router
    const indexUrl = new URL(request.url);
    indexUrl.pathname = '/src/index.html';
    return env.ASSETS.fetch(indexUrl.toString());
  },
};