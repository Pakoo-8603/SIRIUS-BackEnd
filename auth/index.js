/**
 * @fileoverview This file contains functions related to authentication using JSON Web Tokens (JWT).
 * @version 1.0.0
 */

const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../middlewares/errors');

const secret = config.jwt.secret;

/**
 * The `assignToken` function is used to generate a JSON Web Token (JWT) by signing
 * the provided `data` using a secret key.
 * 
 * **Parameters:**
 * - `data` (object): The data to be included in the token.
 * 
 * **Returns:**
 * - `token` (string): The generated JWT.
 * 
 * **Example Usage:**
 * ```javascript
 * const data = { userId: 123, username: 'john_doe' };
 * const token = assignToken(data);
 * console.log(token);
 * ```
 * 
 * In the example above, the `data` object contains the user ID and username. The
 * `assignToken` function is called with the `data` object as the parameter, and
 * it returns the generated JWT. The JWT is then logged to the console.
 */
function assignToken(data){
    return jwt.sign(data, secret);
}

/**
 * Verifies the given JWT token and returns the decoded data.
 * @param {string} token - The JWT token to be verified.
 * @returns {Object} The decoded data from the token.
 * @function
 * @name verifyToken
 */
function verifyToken(token){
    return jwt.verify(token, secret);
}

/**
 * CheckAuth object.
 */
const checkAuth = {
    /**
     * Confirm the token for a given user ID.
     *
     * @param {Object} req - The request object containing the token.
     * @param {string} ID_Usuario - The user ID to confirm the token for.
     * @returns {void}
     */
    confirmToken: function(req, ID_Usuario) {
        const decoded = decodedHeader(req);

    }
}

/**
 * Extracts the token from the authorization header.
 * @param {string} authorizationHeader - The authorization header containing the token.
 * @returns {string} - The extracted token.
 * @throws {Error} - If the authorization header is missing or invalid.
 */
function getToken(authorizationHeader){
    if(!authorizationHeader){
        throw error('No authorization header', 401);
    }

    if(authorizationHeader.indexOf('Bearer') === -1){
        throw error('Invalid authorization header', 401);
    }

    let token = authorizationHeader.replace('Bearer ', '');
    return token;
}

/**
 * The `decodedHeader` function is used to decode the authorization header of a
 * request and extract the user information from the token.
 * 
 * **Parameters:**
 * - `req` (object): The request object containing the headers.
 * 
 * **Returns:**
 * - `decoded` (object): The decoded user information extracted from the token.
 * 
 * **Functionality:**
 * 1. Extracts the authorization header from the request headers. If the
 * authorization header is not present, an empty string is assigned to
 * `authorizationHeader`.
 * 2. Calls the `getToken` function to extract the token from the authorization
 * header.
 * 3. Calls the `verifyToken` function to decode the token and obtain the user
 * information.
 * 4. Assigns the decoded user information to the `req.user` property.
 * 5. Returns the decoded user information.
 * 
 * **Example Usage:**
 * ```javascript
 * const req = {
     * headers: {
         * authorization: 'Bearer <token>'
         * }
     * };
 * 
 * const decoded = decodedHeader(req);
 * console.log(decoded);
 * ```
 * 
 * **Note:** The `getToken` and `verifyToken` functions are not defined in the
 * provided code snippet.
 */
function decodedHeader (req){
    const authorizationHeader = req.headers.authorization || '';
    const token = getToken(authorizationHeader);
    const decoded = verifyToken(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    assignToken,
    checkAuth
}