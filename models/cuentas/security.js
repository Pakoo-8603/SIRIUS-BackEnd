/**
 * Middleware function to check if the user is authenticated.
 * @module checkAuth
 */

const auth = require("../../auth")

/**
 * Middleware function to check if the user is authenticated.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
function checkAuth() {

    /**
     * The `middleware` function is a JavaScript function that acts as a middleware in
     * an application. It takes three parameters: `req`, `res`, and `next`.
     * 
     * - `req` represents the request object, which contains information about the
     * incoming HTTP request.
     * - `res` represents the response object, which is used to send the HTTP response
     * back to the client.
     * - `next` is a callback function that is used to pass control to the next
     * middleware function in the chain.
     * 
     * Inside the function, it retrieves the `ID_Usuario` from the request body using
     * `req.body.ID_Usuario`. It then calls the `confirmToken` function from the
     * `auth.checkAuth` module, passing the `req` and `ID_Usuario` as arguments. This
     * function is responsible for checking the authentication token associated with
     * the user.
     * 
     * After the token is confirmed, the `next()` function is called to pass control to
     * the next middleware function in the chain.
     * 
     * This middleware function can be used to authenticate and authorize requests
     * before they are processed further in the application.
     */
    function middleware(req, res, next) {
        const ID_Usuario = req.body.ID_Usuario
        auth.checkAuth.confirmToken(req, ID_Usuario)
        next();
    }

    return middleware;
};

module.exports = checkAuth;
