/**
 * Routes Configuration
 */
import Home from './components/Home.js';
import About from './components/About.js';
import Products from './components/Products.js';
import ProductDetail from './components/ProductDetail.js';
import UserPost from './components/UserPost.js';
import Contact from './components/Contact.js';
import Notebook, { initNotebookPanel } from './components/Notebook.js';
import NotFound from './components/NotFound.js';

// Store cleanup function for notebook panel
let notebookCleanup = null;

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      title: 'Home - Vanilla JS Router'
    }
  },
  {
    path: '/about',
    component: About,
    name: 'about',
    meta: {
      title: 'About - Vanilla JS Router'
    }
  },
  {
    path: '/notebook',
    component: Notebook,
    name: 'notebook',
    meta: {
      title: 'Notebook - Marimo Interactive'
    },
    beforeEnter: (to, from, next) => {
      // Cleanup previous notebook panel if exists
      if (notebookCleanup) {
        notebookCleanup();
        notebookCleanup = null;
      }
      next();
    }
  },
  {
    path: '/products',
    component: Products,
    name: 'products',
    meta: {
      title: 'Products - Vanilla JS Router'
    }
  },
  {
    path: '/products/:id',
    component: ProductDetail,
    name: 'product-detail',
    meta: {
      title: 'Product Detail - Vanilla JS Router'
    }
  },
  {
    path: '/user/:userId/posts/:postId?',
    component: UserPost,
    name: 'user-post',
    meta: {
      title: 'User Post - Vanilla JS Router'
    }
  },
  {
    path: '/contact',
    component: Contact,
    name: 'contact',
    meta: {
      title: 'Contact - Vanilla JS Router'
    }
  },
  {
    path: '*',
    component: NotFound,
    name: 'not-found',
    meta: {
      title: '404 - Page Not Found'
    }
  }
];
