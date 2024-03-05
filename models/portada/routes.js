/**
 * Routes for portada endpoints
 * @module models/portada
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', p_list);
router.get('/:ID_Portada', p_select);
router.post('/', security(), p_add);

/**
     * The `p_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * The function attempts to execute the `controller.p_list()` function, which is
     * expected to return a list of items. It uses the `await` keyword to wait for the
     * asynchronous operation to complete before proceeding.
     * 
     * If the operation is successful, the `responses.success` function is called with
     * the `req`, `res`, and `list` parameters, along with the HTTP status code `200`
     * to indicate a successful response.
     * 
     * If an error occurs during the execution of the `controller.p_list()` function,
     * the `next` function is called with the `error` parameter to pass the error to
     * the next middleware function in the chain.
     */
    async function p_list(req, res, next) {
    try {
        const list = await controller.p_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}


/**
             * The `p_select` function is an asynchronous function that handles a request to
             * select a specific item from a collection. It takes in three parameters: `req`,
             * `res`, and `next`, which represent the request, response, and next middleware
             * function respectively.
             * 
             * Inside the function, it tries to execute the `controller.p_select` function with
             * the `ID_Portada` parameter extracted from the request's parameters. This
             * function is awaited, meaning the execution of the function will pause until the
             * promise is resolved or rejected.
             * 
             * If the promise is resolved, the `select` result is passed to the
             * `responses.success` function along with the request and response objects, and a
             * status code of 200. This function is responsible for sending a successful
             * response to the client.
             * 
             * If an error occurs during the execution of the `controller.p_select` function,
             * the error is passed to the `next` function, which will trigger the error
             * handling middleware.
             * 
             * Please note that this code snippet is written in JavaScript.
             */
            async function p_select(req, res, next) {
    try {
        const select = await controller.p_select(req.params.ID_Portada);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `p_add` function is an asynchronous function that handles the HTTP POST
                     * request for adding a new item. It takes in three parameters: `req` (the request
                     * object), `res` (the response object), and `next` (the next middleware
                     * function).
                     * 
                     * Inside the function, it tries to execute the `controller.p_add` function
                     * asynchronously, passing the request body as an argument. The `controller.p_add`
                     * function is responsible for adding the item.
                     * 
                     * If the `controller.p_add` function is executed successfully, the
                     * `responses.success` function is called to send a success response with the
                     * status code 201 (Created) and the message 'Ok'.
                     * 
                     * If an error occurs during the execution of the `controller.p_add` function, the
                     * error is passed to the `next` function to be handled by the next error-handling
                     * middleware.
                     * 
                     * Note: The documentation provided is in JavaScript style.
                     */
                    async function p_add(req, res, next) {
    try {
        const add = await controller.p_add(req.body);
        responses.success(req, res, 'Ok', 201);
    } catch (error) {
        next(error);
    }
}




module.exports = router;