/**
 * Page Renderer
 * Renders page content from JSON definitions
 */

class PageRenderer {
  /**
   * Render a section based on its type
   * @param {Object} section - Section definition from JSON
   * @returns {string} HTML string
   */
  static renderSection(section) {
    switch (section.type) {
      case 'paragraph':
        return section.html 
          ? `<p>${section.html}</p>`
          : `<p>${section.text}</p>`;
      
      case 'heading':
        const level = section.level || 2;
        return `<h${level}>${section.text}</h${level}>`;
      
      case 'list':
        const items = section.items.map(item => `<li>${item}</li>`).join('');
        return `<ul>${items}</ul>`;
      
      case 'code':
        const lang = section.language ? ` class="language-${section.language}"` : '';
        return `<pre><code${lang}>${this.escapeHtml(section.code)}</code></pre>`;
      
      case 'html':
        return section.html;
      
      default:
        return '';
    }
  }

  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Render complete page content
   * @param {Object} page - Page definition from JSON
   * @returns {string} HTML string
   */
  static renderPage(page) {
    if (!page || !page.content) {
      return '<h1>Page Not Found</h1><p>The requested page could not be found.</p>';
    }

    const { heading, sections = [] } = page.content;
    
    let html = '';
    
    // Render heading
    if (heading) {
      html += `<h1>${heading}</h1>`;
    }
    
    // Render sections
    sections.forEach(section => {
      html += this.renderSection(section);
    });
    
    // Render sub-pages navigation if exists
    if (page.subPages && page.subPages.length > 0) {
      html += '<h2>Related Pages</h2>';
      html += '<ul class="sub-pages-nav">';
      page.subPages.forEach(subPage => {
        html += `<li><a href="${subPage.path}" data-link>${subPage.title}</a></li>`;
      });
      html += '</ul>';
    }
    
    return html;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageRenderer;
}
