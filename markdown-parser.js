/**
 * Markdown Parser
 * Parses frontmatter metadata and converts markdown to HTML
 */

class MarkdownParser {
  /**
   * Parse a markdown file with frontmatter
   * @param {string} markdownContent - Raw markdown content with frontmatter
   * @returns {Object} Parsed page object with metadata and HTML content
   */
  static parse(markdownContent) {
    const { frontmatter, markdown } = this.extractFrontmatter(markdownContent);
    const htmlContent = this.markdownToHtml(markdown);
    
    return {
      ...frontmatter,
      content: {
        heading: frontmatter.heading || null,
        sections: htmlContent
      }
    };
  }

  /**
   * Extract frontmatter from markdown
   * @param {string} content - Raw markdown content
   * @returns {Object} Object with frontmatter and markdown body
   */
  static extractFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      return {
        frontmatter: {},
        markdown: content
      };
    }
    
    const frontmatterText = match[1];
    const markdown = match[2];
    const frontmatter = this.parseFrontmatter(frontmatterText);
    
    return { frontmatter, markdown };
  }

  /**
   * Parse YAML-like frontmatter to object
   * @param {string} frontmatterText - YAML frontmatter text
   * @returns {Object} Parsed frontmatter object
   */
  static parseFrontmatter(frontmatterText) {
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse numbers
      if (!isNaN(value) && value !== '') {
        value = Number(value);
      }
      
      // Parse booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      frontmatter[key] = value;
    }
    
    return frontmatter;
  }

  /**
   * Convert markdown to HTML sections
   * @param {string} markdown - Markdown text
   * @returns {Array} Array of section objects
   */
  static markdownToHtml(markdown) {
    const sections = [];
    const lines = markdown.trim().split('\n');
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Skip empty lines
      if (!line.trim()) {
        i++;
        continue;
      }
      
      // Headers (# ## ###)
      if (line.match(/^#{1,6}\s/)) {
        const level = line.match(/^#+/)[0].length;
        const text = line.replace(/^#+\s*/, '').trim();
        sections.push({
          type: 'heading',
          level: level,
          text: text
        });
        i++;
        continue;
      }
      
      // Code blocks (```)
      if (line.trim().startsWith('```')) {
        const language = line.trim().substring(3).trim();
        const codeLines = [];
        i++;
        
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        sections.push({
          type: 'code',
          language: language || '',
          code: codeLines.join('\n')
        });
        i++; // Skip closing ```
        continue;
      }
      
      // Unordered lists (- or *)
      if (line.match(/^[\-\*]\s/)) {
        const items = [];
        
        while (i < lines.length && lines[i].match(/^[\-\*]\s/)) {
          let item = lines[i].replace(/^[\-\*]\s*/, '').trim();
          item = this.parseInlineMarkdown(item);
          items.push(item);
          i++;
        }
        
        sections.push({
          type: 'list',
          items: items
        });
        continue;
      }
      
      // Ordered lists (1. 2. etc)
      if (line.match(/^\d+\.\s/)) {
        const items = [];
        
        while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
          let item = lines[i].replace(/^\d+\.\s*/, '').trim();
          item = this.parseInlineMarkdown(item);
          items.push(item);
          i++;
        }
        
        sections.push({
          type: 'list',
          items: items
        });
        continue;
      }
      
      // Paragraphs
      const paragraphLines = [];
      while (i < lines.length && lines[i].trim() && 
             !lines[i].match(/^#{1,6}\s/) && 
             !lines[i].match(/^[\-\*]\s/) &&
             !lines[i].match(/^\d+\.\s/) &&
             !lines[i].trim().startsWith('```')) {
        paragraphLines.push(lines[i].trim());
        i++;
      }
      
      if (paragraphLines.length > 0) {
        const text = paragraphLines.join(' ');
        const html = this.parseInlineMarkdown(text);
        sections.push({
          type: 'paragraph',
          html: html
        });
      }
    }
    
    return sections;
  }

  /**
   * Parse inline markdown (bold, italic, links, code)
   * @param {string} text - Text with inline markdown
   * @returns {string} HTML string
   */
  static parseInlineMarkdown(text) {
    // Bold (**text** or __text__)
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic (*text* or _text_)
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');
    
    // Inline code (`code`)
    text = text.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, (match, linkText, url) => {
      // Add data-link attribute for internal links
      const isInternal = url.startsWith('/') || url.startsWith('#');
      const dataLink = isInternal ? ' data-link' : '';
      return `<a href="${url}"${dataLink}>${linkText}</a>`;
    });
    
    return text;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkdownParser;
}
