/**
 * The `success` method is used to send a success response to the client. It takes
 * in the following parameters:
 * 
 * - `req`: The request object.
 * - `res`: The response object.
 * - `message` (optional): The success message to be sent in the response. If not
 * provided, an empty string will be used.
 * - `status` (optional): The status code to be sent in the response. If not
 * provided, a default value of 200 will be used.
 * 
 * The method sets the status code and message for the response and sends it back
 * to the client. The response body will be in the following format:
 * 
 * ```
 * {
     * error: false,
     * status: <statusCode>,
     * body: <statusMessage>
     * }
 * ```
 * 
 * - `error`: A boolean value indicating whether an error occurred. In this case,
 * it will always be `false` for a success response.
 * - `status`: The status code of the response.
 * - `body`: The success message provided in the `message` parameter.
 * 
 * Example usage:
 * 
 * ```javascript
 * success(req, res, 'Success!', 200);
 * ```
 * 
 * This will send a success response with the status code 200 and the message
 * "Success!".
 */
exports.success = function (req , res, message, status) {
    const statusCode = status || 200;
    const statusMessage = message || '';
    res.status(statusCode).send({
        error : false,
        status : statusCode,
        body : statusMessage
    });
}

/**
 * The `error` method is used to handle and send error responses in JavaScript. It
 * takes in the following parameters:
 * 
 * - `req`: The request object.
 * - `res`: The response object.
 * - `message` (optional): The error message to be sent. Defaults to 'Internal
 * Server Error' if not provided.
 * - `status` (optional): The HTTP status code of the error response. Defaults to
 * 500 (Internal Server Error) if not provided.
 * - `details` (optional): Additional details or information about the error.
 * 
 * The method returns a JSON response with the following structure:
 * 
 * ```javascript
 * {
     * error: false,
     * status: <statusCode>,
     * body: <statusMessage>,
     * details: <statusDetails>
     * }
 * ```
 * 
 * - `error`: Indicates whether an error occurred (false in this case).
 * - `status`: The HTTP status code of the response.
 * - `body`: The error message.
 * - `details`: Additional details or information about the error.
 * 
 * The method sets the HTTP status code and sends the JSON response using the `res`
 * object.
 */
exports.error = function (req , res, message, status, details) {
    const statusCode = status || 500;
    const statusMessage = message || 'Internal Server Error';
    const statusDetails = details || '';
    res.status(statusCode).send({
        error : false,
        status : statusCode,
        body : statusMessage,
        details : statusDetails
    });
}