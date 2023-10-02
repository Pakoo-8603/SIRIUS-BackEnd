/**
 * Creates a new Error object with an optional status code.
 *
 * @param {string} message - The error message.
 * @param {number} [code] - The optional status code.
 * @returns {Error} - The newly created Error object.
 */
function error (message, code) {
    let e = new Error(message);

    if (code) {
        e.statusCode = code;
    }

    return e;
}

module.exports = error;