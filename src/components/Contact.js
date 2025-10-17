/**
 * Contact Component
 */
export default function Contact({ params, query, state }) {
  return `
    <div class="page contact-page">
      <h1>Contact Us</h1>
      
      <div class="contact-content">
        <p>Get in touch with us!</p>
        
        <form class="contact-form" onsubmit="event.preventDefault(); alert('Form submitted! (Demo only)');">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="btn">Send Message</button>
        </form>
      </div>

      <div class="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  `;
}
