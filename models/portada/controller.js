/**
 * Controller for managing 'portada' table.
 * @module portada/controller
 */

const table = 'portada';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the object is not provided, it will default to requiring the
 * MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * - `p_list()`: Retrieves a list of items from the database table.
 * - `p_select(ID_Portada)`: Retrieves a specific item from the database table
 * based on the provided ID_Portada.
 * - `p_add(data)`: Adds a new item to the database table using the provided data.
 * - `p_delete(data)`: Deletes an item from the database table based on the
 * provided data.
 * 
 * Note: The database operations are performed using the methods provided by the
 * InjectionDatabase object or the MySQL database module.
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
    function p_list() {
        return database.list(table);
    }

    /**
     * The `p_select` function is a JavaScript method that takes an `ID_Portada`
     * parameter and returns the result of a database query.
     * 
     * Parameters:
     * - `ID_Portada` (required): The ID of the portada to be selected.
     * 
     * Return Value:
     * - The result of the database query.
     * 
     * Example Usage:
     * ```javascript
     * const result = p_select(123);
     * console.log(result);
     * ```
     * 
     * Note: This documentation assumes the existence of a `database` object and a
     * `table` variable, which are not defined in the provided code snippet.
     */
    function p_select(ID_Portada) {
        return database.query(table, { ID_Portada: ID_Portada } );
    }

    /**
         * The `p_add` function is an asynchronous function that adds data to a database
         * table. It takes in a `data` parameter, which represents the data to be added.
         * 
         * The function uses the `await` keyword to wait for the `db_add` function from the
         * `database` module to complete before continuing execution. The `db_add`
         * function is called with the `table` parameter, which represents the name of the
         * database table, and the `data` parameter.
         * 
         * This function does not return any value.
         */
        async function p_add(data) {
        const response = await database.db_add(table, data);

    }


    /**
             * Deletes data from the specified table in the database.
             *
             * @param {Object} data - The data to be deleted.
             * @returns {Promise} A promise that resolves to the result of the delete operation.
             */
            function p_delete(data) {
        return database.db_delete(table, data);
    }

    return {
        p_list,
        p_select,
        p_add,
        p_delete
    }
}
