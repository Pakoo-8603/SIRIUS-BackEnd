/**
 * Routes for evidencias_r endpoints
 * @module models/evidencias_r
 */

const express = require('express');
const security = require('../cuentas/security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', er_list);
router.get('/:ID_Indicador', er_select);
router.post('/:ID_Indicador', security(), er_add);
router.put('/:ID_Indicador', security(), er_delete);

/**
     * The `er_list` function is an asynchronous function that handles a request to
     * retrieve a list of ER (Emergency Room) items. It takes in three parameters:
     * `req` (request), `res` (response), and `next` (next middleware function).
     * 
     * The function attempts to execute the `controller.er_list()` function, which is
     * expected to return the list of ER items. It uses the `await` keyword to wait
     * for the asynchronous operation to complete before proceeding.
     * 
     * If the operation is successful, the function calls the `responses.success`
     * function to send a successful response with the retrieved list as the data and
     * a status code of 200.
     * 
     * If an error occurs during the execution of the `controller.er_list()` function,
     * the function calls the `next` function to pass the error to the next middleware
     * function for error handling.
     */
    async function er_list(req, res, next) {
    try {
        const list = await controller.er_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

/**
             * The `er_select` function is an asynchronous function that handles a request to
             * select data from a controller. It takes in three parameters: `req`, `res`, and
             * `next`, which represent the request, response, and next middleware function
             * respectively.
             * 
             * Inside the function, it tries to execute the `controller.er_select` function
             * with the `ID_Indicador` parameter extracted from the request's parameters. This
             * function is awaited, meaning the execution of the function will pause until the
             * promise is resolved or rejected.
             * 
             * If the promise is resolved, the `select` result is passed to the
             * `responses.success` function along with the request and response objects, and a
             * status code of 200. This function is responsible for sending a successful
             * response to the client.
             * 
             * If an error occurs during the execution of the `controller.er_select` function
             * or any other part of the code, the error is passed to the `next` function,
             * which will trigger the error handling middleware.
             * 
             * Please note that this code snippet is written in JavaScript.
             */
            async function er_select(req, res, next) {
    try {
        const select = await controller.er_select(req.params.ID_Indicador);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `er_add` function is an asynchronous function that handles the addition of
                     * an entity relationship. It takes in three parameters: `req`, `res`, and `next`,
                     * which represent the request, response, and next middleware function
                     * respectively.
                     * 
                     * The function first attempts to add the entity relationship by calling the
                     * `controller.er_add` function with the request body and the `ID_Indicador`
                     * parameter. This operation is awaited using the `await` keyword, indicating that
                     * it is an asynchronous operation.
                     * 
                     * If the addition is successful, the function sends a success response using the
                     * `responses.success` function, passing in the request, response, and the request
                     * body. The HTTP status code 201 is used to indicate that the entity relationship
                     * was created.
                     * 
                     * If an error occurs during the addition process, the function calls the `next`
                     * function with the `error` parameter to pass the error to the next middleware
                     * function for handling.
                     */
                    async function er_add(req, res, next) {
    try {
        const add = await controller.er_add(req.body, req.params.ID_Indicador);
        responses.success(req, res, req.body, 201);
    } catch (error) {
        next(error);
    }
}

/**
                             * The `er_delete` function is an asynchronous function that handles the deletion
                             * of a resource. It takes in three parameters: `req`, `res`, and `next`, which
                             * represent the request, response, and next middleware function respectively.
                             * 
                             * The function attempts to delete a resource using the `controller.er_delete`
                             * method. It awaits the completion of this operation before proceeding. The
                             * `req.body` and `req.params.ID_Indicador` values are passed as arguments to the
                             * `controller.er_delete` method.
                             * 
                             * If the deletion is successful, the `responses.success` method is called with the
                             * `req`, `res`, `req.body`, and `200` status code as arguments. This method is
                             * responsible for sending a success response to the client.
                             * 
                             * If an error occurs during the deletion process, the `next` function is called
                             * with the `error` object as an argument. This allows the error to be passed to
                             * the next error-handling middleware.
                             * 
                             * Please note that this documentation assumes the existence of the `controller`
                             * and `responses` objects, which are not defined in the provided code snippet.
                             */
                            async function er_delete(req, res, next) {
    try {
        const del = await controller.er_delete(req.body, req.params.ID_Indicador);
        responses.success(req, res, req.body, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;