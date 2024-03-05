/**
 * Routes for sintesis endpoints
 * @module models/sintesis
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', s_list);
router.get('/:Programa', s_select);
router.post('/', security(), s_add);

/**
     * The `s_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes in three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * The function attempts to retrieve the list of items by calling the `s_list`
     * method from the `controller` object. This method is expected to return a
     * promise that resolves to the list of items.
     * 
     * If the retrieval is successful, the function uses the `responses.success`
     * function to send a successful response to the client with the retrieved list of
     * items and a status code of 200.
     * 
     * If an error occurs during the retrieval process, the function calls the `next`
     * function with the error as an argument to pass it to the next error-handling
     * middleware.
     * 
     * Note: The `responses.success` function and the `controller` object are assumed
     * to be defined elsewhere in the code.
     */
    async function s_list(req, res, next) {
    try {
        const list = await controller.s_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}


/**
             * The `s_select` function is an asynchronous function that handles a request to
             * select data from a database based on a specified program. It takes in three
             * parameters: `req`, `res`, and `next`, which represent the request, response,
             * and next middleware function respectively.
             * 
             * The function first attempts to execute the database query using the
             * `controller.s_select` method, passing in the `Programa` parameter from the
             * request's URL. This query is awaited using the `await` keyword, allowing the
             * function to pause and resume execution once the query is complete.
             * 
             * If the query is successful, the function calls the `responses.success` method,
             * passing in the request, response, and the result of the query. The HTTP status
             * code 200 is also provided to indicate a successful response.
             * 
             * If an error occurs during the execution of the query or any other part of the
             * function, the error is passed to the `next` middleware function, allowing it to
             * handle the error appropriately.
             * 
             * Note: This documentation assumes the existence of a `controller` object with a
             * `s_select` method and a `responses` object with a `success` method.
             */
            async function s_select(req, res, next) {
    try {
        const select = await controller.s_select(req.params.Programa);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `s_add` function is an asynchronous function that handles the addition of a
                     * resource. It takes in three parameters: `req` (the request object), `res` (the
                     * response object), and `next` (the next middleware function).
                     * 
                     * The function first attempts to add the resource by calling the `s_add` method of
                     * the `controller` object, passing in the request body as an argument. This
                     * operation is awaited using the `await` keyword, allowing for asynchronous
                     * execution.
                     * 
                     * If the addition is successful, the `responses.success` function is called with
                     * the request, response, and request body as arguments, and a status code of 201
                     * (indicating a successful creation).
                     * 
                     * If an error occurs during the addition process, the `next` function is called
                     * with the error as an argument, allowing the error to be passed to the next
                     * error-handling middleware.
                     * 
                     * Note: The `responses.success` and `controller.s_add` functions are not defined
                     * in the provided code snippet.
                     */
                    async function s_add(req, res, next) {
    try {
        const add = await controller.s_add(req.body);
        responses.success(req, res, req.body, 201);
    } catch (error) {
        next(error);
    }
}




module.exports = router;