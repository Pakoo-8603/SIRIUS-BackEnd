/**
 * Controller for managing 'cuentas' table.
 * @module cuentas/controller
 */

const table = 'cuentas';
const auth = require('../auth');

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the InjectionDatabase object is not provided, it will default to
 * requiring the MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. `u_list()`: Returns a promise that resolves to an array of all 'cuentas'
 * records.
 * 
 * 2. `u_select(ID_Usuario)`: Returns a promise that resolves to a single 'cuentas'
 * record with the specified ID_Usuario.
 * 
 * 3. `u_add(data)`: Adds a new 'cuentas' record with the provided data. The data
 * object should have the following properties: ID_Usuario, Nombre, Nivel,
 * Usuario, and Password. Returns a promise that resolves to a success message.
 * 
 * 4. `u_delete(data)`: Deletes a 'cuentas' record with the provided data. Returns
 * a promise that resolves to a success message.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
     * Retrieves a list of items from the database table.
     *
     * @returns {Array} The list of items from the database table.
     */
    function u_list() {
        return database.list(table);
    }

    /**
     * Retrieves a user record from the database based on the provided user ID.
     *
     * @param {number} ID_Usuario - The ID of the user to select.
     * @returns {object} - The selected user record from the database.
     */
    function u_select(ID_Usuario) {
        return database.db_select(table, ID_Usuario);
    }

    /**
         * Asynchronously adds a user to the database.
         * @param {Object} data - The user data to be added.
         * @returns {Promise} - A promise that resolves with the response from the database.
         */
    async function u_add(data) {
        /**
         * Usuario object.
         */
        const usuario = {
            ID_Usuario: data.ID_Usuario,
            Nombre: data.Nombre,
            Nivel: data.Nivel,
        }
        const response = await database.db_add(table, usuario);
        var insertId = 0;
        if (data.ID_Usuario == 0) {
            insertId = response.insertId;
        } else {
            insertId = data.ID_Usuario;
        }
        var response2 = ''
        if (data.Usuario || data.Password) {
            response2 = await auth.db_add({
                ID_Usuario: insertId,
                Usuario: data.Usuario,
                Password: data.Password
            })
        }
        return response2;
    }

    /**
             * Deletes data from the database.
             * 
             * @param {Object} data - The data to be deleted.
             * @returns {Promise} A promise that resolves to the result of the delete operation.
             */
    function u_delete(data) {
        return database.db_delete(table, data);
    }

    return {
        u_list,
        u_select,
        u_add,
        u_delete
    }
}
