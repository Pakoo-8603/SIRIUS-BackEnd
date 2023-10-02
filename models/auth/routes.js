/**
 * Routes for authentication endpoints
 * @module models/auth
 */

const express = require('express');
const responses = require('../../network/response');
const controller = require('./index');

/**
 * Express router to mount authentication related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const router = express.Router();

/**
 * Route serving login endpoint.
 * @name post/login
 * @function
 * @memberof module:models/auth~authRouter
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.Usuario - User's username.
 * @param {string} req.body.Password - User's password.
 * @param {Object} res - Express response object.
 * @param {function} next - Express middleware next function.
 */
router.post('/login', login);

/**
     * The `login` function is an asynchronous function that handles the login process.
     * It takes three parameters: `req` (the request object), `res` (the response
     * object), and `next` (the next middleware function).
     * 
     * The function attempts to authenticate the user by calling the `login` method of
     * the `controller` object, passing in the `Usuario` and `Password` values from
     * the request body. This authentication process is awaited using the `await`
     * keyword, allowing the function to pause and wait for the authentication to
     * complete before proceeding.
     * 
     * If the authentication is successful, the `success` method of the `responses`
     * object is called, passing in the request, response, authentication information
     * (`authInfo`), and the HTTP status code 200.
     * 
     * If an error occurs during the authentication process, the `next` function is
     * called with the `error` parameter, allowing the error to be passed to the next
     * error-handling middleware.
     * 
     * Note: The documentation assumes that the `controller` and `responses` objects
     * are defined and accessible within the scope of the function.
     */
async function login(req, res, next) {
    try {
        const authInfo = await controller.login(req.body.Usuario, req.body.Password);
        responses.success(req, res, authInfo, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;