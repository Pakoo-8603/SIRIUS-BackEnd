/**
 * Routes for expedientes endpoints
 * @module models/expedientes
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', ex_list);
router.get('/:ID_Expediente', ex_select);
router.post('/', security(), ex_add);
router.put('/:ID_Expediente', security(), ex_delete);

/**
     * The `ex_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes in three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * The function attempts to execute the `controller.ex_list()` function, which is
     * expected to return a list of items. It uses the `await` keyword to wait for the
     * asynchronous operation to complete before proceeding.
     * 
     * If the operation is successful, the function calls the `responses.success`
     * function to send a successful response with the retrieved list as the data
     * payload and a status code of 200.
     * 
     * If an error occurs during the execution of the `controller.ex_list()` function,
     * the function calls the `next` function to pass the error to the next middleware
     * function for error handling.
     */
    async function ex_list(req, res, next) {
    try {
        const list = await controller.ex_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

/**
             * The `ex_select` function is an asynchronous function that handles a request to
             * select an item from a controller. It takes in three parameters: `req`, `res`,
             * and `next`, which represent the request, response, and next middleware function
             * respectively.
             * 
             * Inside the function, it tries to execute the `controller.ex_select` function
             * with the `ID_Expediente` parameter extracted from the request's parameters.
             * This function is awaited, meaning the execution of the function will pause
             * until the promise is resolved or rejected.
             * 
             * If the promise is resolved, the `responses.success` function is called with the
             * request, response, and the result of the `controller.ex_select` function as
             * arguments. The HTTP status code 200 is also passed to indicate a successful
             * response.
             * 
             * If an error occurs during the execution of the `controller.ex_select` function
             * or while handling the response, the `next` function is called with the error as
             * an argument to pass it to the next error-handling middleware.
             * 
             * Please note that the code provided is written in JavaScript.
             */
            async function ex_select(req, res, next) {
    try {
        const select = await controller.ex_select(req.params.ID_Expediente);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `ex_add` function is an asynchronous function that handles a POST request.
                     * It takes in three parameters: `req` (the request object), `res` (the response
                     * object), and `next` (the next middleware function).
                     * 
                     * The function attempts to execute the `controller.ex_add` function
                     * asynchronously, passing in the `req.body` as an argument. This function is
                     * expected to perform some logic related to adding an item.
                     * 
                     * If the `controller.ex_add` function is executed successfully, the
                     * `responses.success` function is called with the `req`, `res`, `req.body`, and
                     * `201` (HTTP status code for "Created") as arguments. This function is
                     * responsible for sending a success response to the client.
                     * 
                     * If an error occurs during the execution of the `controller.ex_add` function, the
                     * `next` function is called with the `error` as an argument. This allows the
                     * error to be passed to the next error-handling middleware.
                     * 
                     * Note: The documentation assumes that the `controller` and `responses` objects
                     * are defined and imported correctly.
                     */
                    async function ex_add(req, res, next) {
    try {
        const add = await controller.ex_add(req.body);
        responses.success(req, res, req.body, 201);
    } catch (error) {
        next(error);
    }
}

/**
                             * This is an asynchronous function named `ex_delete` that takes in three
                             * parameters: `req`, `res`, and `next`. It is used to handle a DELETE request to
                             * delete an item from an expediente (record) based on the provided
                             * `ID_Expediente`.
                             * 
                             * The function first tries to execute the deletion operation by calling the
                             * `ex_delete` method from the `controller` object. This method is awaited using
                             * the `await` keyword to ensure that the function waits for the deletion to
                             * complete before proceeding.
                             * 
                             * If the deletion is successful, the `responses.success` function is called with
                             * the `req`, `res`, and `del.message` parameters. This function is responsible
                             * for sending a success response to the client with a status code of 200.
                             * 
                             * If an error occurs during the deletion process, the `next` function is called
                             * with the `error` parameter to pass the error to the next error-handling
                             * middleware.
                             * 
                             * Note: The documentation provided is in JAVASCRIPT style.
                             */
                            async function ex_delete(req, res, next) {
    try {
        const del = await controller.ex_delete(req.params.ID_Expediente);
        responses.success(req, res, del.message, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;