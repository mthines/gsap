'use strict'

/**
 * BrowserSync config: serve static assets, and proxy the HTML
 *
 * Let's say we have the codebase for the front-end of a website,
 * and we want to develop CSS/JS or debug against the HTML of
 * a remote development, staging or production server.
 *
 * Using BrowserSync (2.4 needed), we want to serve to our browser(s):
 * - the distant HTML pages and content images from the server
 * - local static assets (including or changes)
 *
 * Locally we have:
 *     project/
 *         bs-config.js
 *         public/
 *             css, js, svg…
 *
 * Prerequisites:
 * - node
 * - browser-sync (2.4)
 * - serve-static
 *
 * Now for this config to work, `require('serve-static')` must work, which
 * means that serve-static must be installed locally (npm install serve-static),
 * OR your can update your NODE_PATH to point to the global node_modules if you
 * installed with `npm install -g serve-static`.
 * See: http://www.bennadel.com/blog/2169-where-does-node-js-and-require-look-for-modules.htm
 *
 * This config is similar to what is demonstrated in: http://quick.as/w6ri32qe (no audio)
 * IMPORTANT: YOU WILL NEED TO COMMENT OUT OR CUSTOMIZE THE REWRITERULES.
 *
 */

module.exports = {
  // By default we proxy all requests to the remote server
  proxy: 'dev.yourSite',
  // Disable The UI
  ui: false,
  // Don't open the browser
  open: false,
  // But we still ask BrowserSync to watch changes in our local files
  files: ['public/**', '../dist/**.*.css', '../dist/**.*.js'],
  // Now when a file is changed, BrowserSync in the browser updates the
  // corresponding src/href (which it finds through SHEER MAGIC as far as
  // I know) to include a new query string, which prompts the browser to
  // request the file again.

  // By default that request would be proxied to the remote server,
  // but let pipe it through a middleware first.
  middleware: require('serve-static')('public'),

  // Now we have asked serve-static to serve the requested file if it can
  // find it in the local `public` folder. If it doesn't find it, it
  // gives the control back to BrowserSync's proxy, so we end up looking
  // for an updated version of the file on the remote server (not good,
  // because in this workflow the file won't have our local changes).

  // Simple situation: if the URLs for static files look like
  // `/assets/css/styles.css` (for example) and in your `public` folder
  // you have `public/assets/css/styles.css`, perfect! You can stop here.

  // But if the URLs are constructed differently, you will need to
  // rewrite them first. So we use rewriteRules, and the execution
  // order becomes: 1) browser-sync rewrites URLs, 2) serve-static looks
  // for the rewritten URLs in your local folder, 3) falls back to proxy
  // if (2) fails.
  rewriteRules: [
    // Rewriting can be brutal: we're rewriting the whole HTML page,
    // not just the URLs. Be careful what you match!
    // You should consider the match regexp and fn method as working
    // like `pageHtml = pageHtml.replace(match, fn)` would, only with
    // one limitation: fn only gets the full matched string, it cannot
    // get submatches. So if you need those, I suggest that inside fn
    // you retrieve the regexp using `this.match`, and apply it again.
    // (Test your regexp with http://regexr.com/ if you need to.)
    {
      // Example: find all instances of the root URL for our assets, remove it
      // so that we are only left with, say, /assets/css/styles.css. As a result,
      // serve-static will be able to find the local file public/assets/css/styles.css
      match: /(https?\:)?\/\/assetsdomain\.something\.tld\/ourawesomewebsite/g,
      fn: function(matched) {
        return '';
      }
    },
  ],
};