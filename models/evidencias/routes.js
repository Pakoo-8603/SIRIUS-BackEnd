/**
 * Routes for evidencias endpoints
 * @module models/evidencias
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', e_list);
router.get('/:ID_Indicador', e_select);
router.post('/:ID_Indicador', security(), e_add);
router.put('/:ID_Indicador', security(),e_delete);

/**
     * The `e_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes in three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * The function attempts to execute the `controller.e_list()` function, which is
     * expected to return a list of items. This is done using the `await` keyword,
     * indicating that the function will wait for the promise to resolve before
     * proceeding.
     * 
     * If the `controller.e_list()` function is executed successfully, the
     * `responses.success` function is called with the `req`, `res`, and `list`
     * parameters. This function is responsible for sending a successful response with
     * the retrieved list, using the HTTP status code 200.
     * 
     * If an error occurs during the execution of the `controller.e_list()` function,
     * the `next` function is called with the `error` parameter. This will pass the
     * error to the next middleware function, allowing for error handling and
     * propagation.
     */
    async function e_list(req, res, next) {
    try {
        const list = await controller.e_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

/**
             * The `e_select` function is an asynchronous function that handles a request to
             * select a specific indicator. It takes in three parameters: `req` (the request
             * object), `res` (the response object), and `next` (the next middleware
             * function).
             * 
             * Inside the function, it tries to execute the `controller.e_select` function with
             * the `ID_Indicador` parameter extracted from the request's parameters. This
             * function is awaited, meaning it will wait for the result before proceeding.
             * 
             * If the `controller.e_select` function is successful, the `responses.success`
             * function is called with the request, response, and the result of the select
             * operation. The HTTP status code 200 is also passed to indicate a successful
             * response.
             * 
             * If an error occurs during the select operation or any other part of the
             * function, the `next` function is called with the error as an argument, allowing
             * the error to be handled by the next error-handling middleware.
             * 
             * Note: This code snippet appears to be part of a larger codebase and may require
             * additional context to fully understand its functionality.
             */
            async function e_select(req, res, next) {
    try {
        const select = await controller.e_select(req.params.ID_Indicador);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * This is an asynchronous function named `e_add` that handles a request, response,
                     * and next middleware function. It tries to execute the following code block:
                     * 
                     * 1. Calls the `controller.e_add` function with `req.body` and
                     * `req.params.ID_Indicador` as arguments and awaits its result.
                     * 2. If the function call is successful, it calls the `responses.success` function
                     * with `req`, `res`, `req.body`, and `201` as arguments.
                     * 3. If an error occurs during the execution, it calls the `next` middleware
                     * function with the `error` as an argument.
                     */
                    async function e_add(req, res, next) {
    try {
        const add = await controller.e_add(req.body, req.params.ID_Indicador);
        responses.success(req, res, req.body, 201);
    } catch (error) {
        next(error);
    }
}

/**
                             * The `e_delete` function is an asynchronous function that handles the deletion of
                             * an entity. It takes in three parameters: `req`, `res`, and `next`, which
                             * represent the request, response, and next middleware function respectively.
                             * 
                             * The function attempts to delete an entity by calling the `controller.e_delete`
                             * function with the request body and the `ID_Indicador` parameter from the
                             * request's parameters. The result of the deletion is stored in the `del`
                             * variable using the `await` keyword to wait for the promise to resolve.
                             * 
                             * If the deletion is successful, the `responses.success` function is called with
                             * the request, response, and request body as arguments, and a status code of 200
                             * is sent in the response.
                             * 
                             * If an error occurs during the deletion process, the `next` function is called
                             * with the error as an argument to pass it to the next error-handling middleware.
                             * 
                             * Note: The documentation provided is in JAVASCRIPT style.
                             */
                            async function e_delete(req, res, next) {
    try {
        const del = await controller.e_delete(req.body, req.params.ID_Indicador);
        responses.success(req, res, req.body, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;