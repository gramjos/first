/**
 * DOM Utilities - Helper functions for DOM manipulation
 */

/**
 * Create an element with attributes and children
 */
export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  // Set attributes
  Object.keys(attributes).forEach(key => {
    if (key === 'className') {
      element.className = attributes[key];
    } else if (key === 'style' && typeof attributes[key] === 'object') {
      Object.assign(element.style, attributes[key]);
    } else if (key.startsWith('on') && typeof attributes[key] === 'function') {
      const eventName = key.substring(2).toLowerCase();
      element.addEventListener(eventName, attributes[key]);
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });

  // Append children
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });

  return element;
}

/**
 * Query selector wrapper
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query selector all wrapper
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Add class to element
 */
export function addClass(element, ...classes) {
  element.classList.add(...classes);
}

/**
 * Remove class from element
 */
export function removeClass(element, ...classes) {
  element.classList.remove(...classes);
}

/**
 * Toggle class on element
 */
export function toggleClass(element, className) {
  element.classList.toggle(className);
}

/**
 * Check if element has class
 */
export function hasClass(element, className) {
  return element.classList.contains(className);
}

/**
 * Set element attributes
 */
export function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
}

/**
 * Remove element from DOM
 */
export function remove(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

/**
 * Empty element (remove all children)
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Insert HTML at position
 */
export function insertHTML(element, position, html) {
  element.insertAdjacentHTML(position, html);
}

/**
 * Wait for DOM ready
 */
export function ready(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Animate element with requestAnimationFrame
 */
export function animate(element, properties, duration = 300) {
  return new Promise(resolve => {
    const start = performance.now();
    const startValues = {};
    const endValues = {};

    // Get start values
    Object.keys(properties).forEach(prop => {
      const computed = window.getComputedStyle(element);
      startValues[prop] = parseFloat(computed[prop]) || 0;
      endValues[prop] = parseFloat(properties[prop]);
    });

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in-out
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      Object.keys(properties).forEach(prop => {
        const value = startValues[prop] + (endValues[prop] - startValues[prop]) * eased;
        element.style[prop] = value + (prop === 'opacity' ? '' : 'px');
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/**
 * Fade in element
 */
export function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.display = 'block';
  return animate(element, { opacity: 1 }, duration);
}

/**
 * Fade out element
 */
export function fadeOut(element, duration = 300) {
  return animate(element, { opacity: 0 }, duration).then(() => {
    element.style.display = 'none';
  });
}

/**
 * Slide down element
 */
export function slideDown(element, duration = 300) {
  element.style.height = '0';
  element.style.overflow = 'hidden';
  element.style.display = 'block';
  const height = element.scrollHeight;
  return animate(element, { height }, duration).then(() => {
    element.style.height = '';
    element.style.overflow = '';
  });
}

/**
 * Slide up element
 */
export function slideUp(element, duration = 300) {
  const height = element.scrollHeight;
  element.style.height = height + 'px';
  element.style.overflow = 'hidden';
  return animate(element, { height: 0 }, duration).then(() => {
    element.style.display = 'none';
    element.style.height = '';
    element.style.overflow = '';
  });
}
