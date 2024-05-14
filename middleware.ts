export { default } from 'next-auth/middleware';

/**
 * Configuration options for the middleware.
 * 
 * @type {Object}
 * @property {string[]} matcher - Array of paths to match against.
 */
export const config = {
  matcher: [
    '/trips', 
    '/reservations', 
    '/properties', 
    '/favorites'
  ]
};