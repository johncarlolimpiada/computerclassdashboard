/**
 * Gets the base URL of the application for redirects.
 * Prioritizes production environment variables, then falls back to localhost.
 */
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env vars.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set on Vercel.
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000/');
  
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  
  return url;
};
