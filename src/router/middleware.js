/**
 * Middleware - Pipeline for executing middleware functions
 */
export class Middleware {
  constructor() {
    this.stack = [];
  }

  /**
   * Add middleware to the stack
   */
  use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Middleware must be a function');
    }
    this.stack.push(fn);
  }

  /**
   * Execute all middleware in sequence
   */
  async execute(context, finalHandler) {
    let index = 0;

    const next = async (error) => {
      if (error) {
        throw error;
      }

      if (index >= this.stack.length) {
        if (finalHandler) {
          return await finalHandler(context);
        }
        return;
      }

      const middleware = this.stack[index++];
      
      try {
        await middleware(context, next);
      } catch (error) {
        throw error;
      }
    };

    return next();
  }

  /**
   * Clear all middleware
   */
  clear() {
    this.stack = [];
  }
}

/**
 * Guard - Handles navigation guards (beforeEach, afterEach)
 */
export class Guard {
  constructor() {
    this.beforeHooks = [];
    this.afterHooks = [];
  }

  /**
   * Register a beforeEach hook
   */
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }

  /**
   * Register an afterEach hook
   */
  afterEach(fn) {
    this.afterHooks.push(fn);
  }

  /**
   * Execute all beforeEach hooks
   */
  async runBefore(to, from) {
    for (const hook of this.beforeHooks) {
      const result = await new Promise((resolve) => {
        const next = (arg) => resolve(arg);
        hook(to, from, next);
      });

      // If guard returns false or a path, prevent navigation
      if (result === false) {
        return false;
      }
      if (typeof result === 'string') {
        return result; // Redirect to this path
      }
    }
    return true;
  }

  /**
   * Execute all afterEach hooks
   */
  async runAfter(to, from) {
    for (const hook of this.afterHooks) {
      await hook(to, from);
    }
  }
}
