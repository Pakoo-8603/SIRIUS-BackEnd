/**
 * Routes for indicadores endpoints
 * @module models/indicadores
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', i_list);
router.get('/:ID_Indicador', i_select);
router.post('/', security(), i_add);

/**
     * The `i_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes in three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * Inside the function, it tries to execute the `controller.i_list()` function
     * asynchronously using the `await` keyword. This function is responsible for
     * fetching the list of items.
     * 
     * If the execution is successful, it calls the `responses.success` function to
     * send a successful response with the retrieved list as the data and a status
     * code of 200.
     * 
     * If an error occurs during the execution, it calls the `next` function to pass
     * the error to the next middleware function for error handling.
     */
    async function i_list(req, res, next) {
    try {
        const list = await controller.i_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

/**
             * The `i_select` function is an asynchronous function that handles the selection
             * of an indicator based on the provided ID. It takes in three parameters: `req`
             * (the request object), `res` (the response object), and `next` (the next
             * middleware function).
             * 
             * The function first attempts to execute the `controller.i_select` function,
             * passing the `req.params.ID_Indicador` as an argument. This function is expected
             * to return a result.
             * 
             * If the execution is successful, the `responses.success` function is called with
             * the `req`, `res`, and `select` parameters. This function is responsible for
             * sending a success response with the selected indicator data and a status code
             * of 200.
             * 
             * If an error occurs during the execution, the `next` function is called with the
             * `error` parameter. This will pass the error to the next error-handling
             * middleware.
             * 
             * Note: This code snippet appears to be part of a larger codebase and may require
             * additional context to fully understand its functionality.
             */
            async function i_select(req, res, next) {
    try {
        const select = await controller.i_select(req.params.ID_Indicador);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `i_add` function is an asynchronous function that handles the addition of an
                     * item. It takes in three parameters: `req`, `res`, and `next`, which represent
                     * the request, response, and next middleware function respectively.
                     * 
                     * The function attempts to add an item by calling the `i_add` method from the
                     * `controller` object, passing in the request body as an argument. It uses the
                     * `await` keyword to wait for the `i_add` method to complete before proceeding.
                     * 
                     * If the addition is successful, the function calls the `success` method from the
                     * `responses` object, passing in the request, response, and the request body as
                     * arguments, and sets the HTTP status code to 201 (Created).
                     * 
                     * If an error occurs during the addition process, the function calls the `next`
                     * function, passing in the error as an argument to be handled by the next
                     * middleware function.
                     */
                    async function i_add(req, res, next) {
    try {
        const add = await controller.i_add(req.body);
        responses.success(req, res, req.body, 201);
    } catch (error) {
        next(error);
    }
}

module.exports = router;