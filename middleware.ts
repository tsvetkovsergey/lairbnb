export { default } from 'next-auth/middleware';

// Add protected paths that can be
// accessed only by logged in users
export const config = {
  matcher: ['/favorites', '/properties', '/reservations', '/trips'],
};
