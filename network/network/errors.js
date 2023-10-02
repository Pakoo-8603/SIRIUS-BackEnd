/**
 * Middleware function to handle errors in the application.
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const responses = require('./response');

/**
 * The `errors` function is a middleware function that handles errors in an Express
 * application. It takes four parameters: `err`, `req`, `res`, and `next`.
 * 
 * - `err`: The error object that is passed to the middleware.
 * - `req`: The request object representing the HTTP request.
 * - `res`: The response object representing the HTTP response.
 * - `next`: The next middleware function in the chain.
 * 
 * The function logs the error to the console using `console.error`. It then
 * extracts the error message from the `err` object, or sets a default message of
 * "Error interno" if no message is provided. Similarly, it extracts the status
 * code from the `err` object, or sets a default status code of 500 (Internal
 * Server Error) if no status code is provided.
 * 
 * Finally, the function calls `responses.error` to send an error response to the
 * client, passing the request, response, message, and status code as arguments.
 */
function errors(err, req, res, next) {
  console.error('[error]', err);

  const message = err.message || 'Error interno';
  const status = err.statusCode || 500;

  responses.error(req, res, message, status);
}

module.exports = errors;