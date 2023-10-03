/**
 * Express router for user accounts.
 * @module models/cuentas
 */

const express = require('express');
const security = require('./security');
const responses = require('../../network/response');
const controller = require('./index');

const router = express.Router();

/**
     * The `u_list` function is an asynchronous function that handles a request to
     * retrieve a list of items. It takes in three parameters: `req` (request), `res`
     * (response), and `next` (next middleware function).
     * 
     * The function attempts to execute the `controller.u_list()` function, which is
     * expected to return a list of items. It uses the `await` keyword to wait for the
     * asynchronous operation to complete before proceeding.
     * 
     * If the operation is successful, the `responses.success` function is called with
     * the `req`, `res`, and `list` parameters, along with the HTTP status code `200`
     * to indicate a successful response.
     * 
     * If an error occurs during the execution of the `controller.u_list()` function,
     * the `next` function is called with the `error` parameter to pass the error to
     * the next middleware function for handling.
     */
async function u_list(req, res, next) {
    try {
        const list = await controller.u_list();
        responses.success(req, res, list, 200);
    } catch (error) {
        next(error);
    }
}

/**
             * The `u_select` function is an asynchronous function that handles a request to
             * select a user based on their ID. It takes in three parameters: `req` (the
             * request object), `res` (the response object), and `next` (the next middleware
             * function).
             * 
             * Inside the function, it tries to execute the `controller.u_select` function,
             * passing in the `ID_Usuario` parameter from the request. This function is
             * expected to return the selected user.
             * 
             * If the `controller.u_select` function is executed successfully, the
             * `responses.success` function is called with the request, response, and the
             * selected user as parameters. The HTTP status code 200 is also passed to
             * indicate a successful response.
             * 
             * If an error occurs during the execution of the `controller.u_select` function,
             * the error is passed to the `next` function, which will handle the error in the
             * next middleware.
             * 
             * Note: The `responses.success` and `controller.u_select` functions are not
             * defined in the provided code snippet.
             */
async function u_select(req, res, next) {
    try {
        const select = await controller.u_select(req.params.ID_Usuario);
        responses.success(req, res, select, 200);
    } catch (error) {
        next(error);
    }
}

/**
                     * The `u_add` function is an asynchronous function that handles the addition of a
                     * user. It takes in three parameters: `req`, `res`, and `next`, which represent
                     * the request, response, and next middleware function respectively.
                     * 
                     * The function first tries to execute the code inside the `try` block. It awaits
                     * the `u_add` method from the `controller` module, passing in the request body as
                     * an argument. This method is expected to return a promise.
                     * 
                     * If the promise is resolved successfully, the `success` method from the
                     * `responses` module is called with the request, response, and the result of the
                     * `u_add` method as arguments. The HTTP status code 201 is also passed to
                     * indicate a successful creation of a resource.
                     * 
                     * If an error occurs during the execution of the `try` block, the `catch` block is
                     * triggered. The `next` function is called with the `error` as an argument,
                     * allowing the error to be passed to the next error-handling middleware.
                     * 
                     * Please note that the specific implementation of the `controller.u_add` and
                     * `responses.success` methods is not provided in the given code snippet.
                     */
async function u_add(req, res, next) {
    try {
        const add = await controller.u_add(req.body);
        responses.success(req, res, add, 201);
    } catch (error) {
        next(error);
    }
}

/**
                             * The `u_delete` function is an asynchronous function that handles the deletion of
                             * a user. It takes in three parameters: `req`, `res`, and `next`, which represent
                             * the request, response, and next middleware function respectively.
                             * 
                             * The function first tries to delete the user by calling the `u_delete` method
                             * from the `controller` object, passing in the `ID_Usuario` parameter from the
                             * request's URL. The `await` keyword is used to wait for the deletion operation
                             * to complete before proceeding.
                             * 
                             * If the deletion is successful, the `responses.success` function is called with
                             * the `req`, `res`, and `del` parameters, indicating a successful response with a
                             * status code of 200.
                             * 
                             * If an error occurs during the deletion process, the `next` function is called
                             * with the `error` parameter to pass the error to the next error-handling
                             * middleware.
                             * 
                             * Note: The documentation provided is in JAVASCRIPT style.
                             */
async function u_delete(req, res, next) {
    try {
        const del = await controller.u_delete(req.params.ID_Usuario);
        responses.success(req, res, del, 200);
    } catch (error) {
        next(error);
    }
}

// Routes
router.get('/', u_list);
router.get('/:ID_Usuario', u_select);
router.post('/', security(), u_add);
router.put('/', security(), u_delete);

module.exports = router;