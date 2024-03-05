/**
 * Controller for managing 'sintesis' table.
 * @module sintesis/controller
 */

const table = 'sintesis1';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the object is not provided, it will default to requiring the
 * MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. `s_list()`: Retrieves a list of items from the database table.
 * 2. `s_select(program)`: Queries the database table to select items based on the
 * provided program.
 * 3. `s_add(data)`: Adds a new item to the database table. It takes an object
 * `data` as a parameter, which should contain the necessary information for the
 * new item.
 * 4. `s_delete(data)`: Deletes an item from the database table. It takes an object
 * `data` as a parameter, which should contain the necessary information to
 * identify the item to be deleted.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
     * Retrieves a list of items from the database table.
     *
     * @returns {Array} The list of items from the specified table.
     */
    function s_list() {
        return database.list(table);
    }

    /**
     * The `s_select` function is a JavaScript method that performs a database query
     * based on a specified program. It takes a `program` parameter as input and
     * returns the result of the query.
     * 
     * Example usage:
     * ```javascript
     * const result = s_select("exampleProgram");
     * console.log(result);
     * ```
     * 
     * Parameters:
     * - `program` (string): The program name to filter the query.
     * 
     * Returns:
     * - The result of the database query, which is typically an array of objects
     * matching the specified program.
     * 
     * Note: This function assumes the existence of a `database` object with a `query`
     * method, and a `table` variable representing the database table to query.
     */
    function s_select(program) {
        return database.query(table, { Programa: program } );
    }

    /**
         * The `s_add` function is an asynchronous function that takes in a `data`
         * parameter. It performs the following steps:
         * 
         * 1. Extracts the `Programa` property from the `data` object and assigns it to the
         * `program` variable.
         * 2. Calls the `db_add_update` method of the `database` object, passing in the
         * `table` parameter and an object with the `Programa` property set to the
         * `program` variable, as well as the `data` object.
         * 3. Waits for the `db_add_update` method to complete and returns the response.
         * 
         * Note: The `db_add_update` method is assumed to be an asynchronous method that
         * adds or updates data in a database.
         */
        async function s_add(data) {
        const program = data.Programa;
        const response = await database.db_add_update(table, { Programa: program }, data);
    }


    /**
             * Function Name: s_delete
             * 
             * Description: This function is used to delete data from a database table.
             * 
             * Parameters:
             * - data: The data to be deleted from the table.
             * 
             * Return Value: The result of the database delete operation.
             * 
             * Example Usage:
             * ```
             * var result = s_delete(data);
             * ```
             * 
             * Note: This function relies on the existence of a database object named
             * "database" and a method named "db_delete" within that object.
             */
            function s_delete(data) {
        return database.db_delete(table, data);
    }

    return {
        s_list,
        s_select,
        s_add,
        s_delete
    }
}
