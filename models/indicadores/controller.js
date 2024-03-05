/**
 * Controller for managing 'indicadores' table.
 * @module indicadores/controller
 */

const table = 'indicadores';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the InjectionDatabase object is not provided, it will default to
 * requiring the MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. i_list(): This method retrieves a list of items from the database table.
 * 
 * 2. i_select(ID_Indicador): This method queries the database table to select an
 * item with the specified ID_Indicador.
 * 
 * 3. i_add(data): This method adds a new item to the database table. It takes a
 * data object as a parameter, which should contain the necessary information for
 * the new item. It uses the ID_Indicador from the data object to perform the add
 * operation.
 * 
 * 4. i_delete(data): This method deletes an item from the database table. It takes
 * a data object as a parameter, which should contain the necessary information to
 * identify the item to be deleted.
 * 
 * Note: The database operations are performed using the methods provided by the
 * InjectionDatabase object.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
     * Function Name: i_list
     * 
     * Description: This function retrieves a list of items from a specified database
     * table.
     * 
     * Syntax:
     * ```javascript
     * i_list()
     * ```
     * 
     * Parameters: None
     * 
     * Return Value: An array containing the list of items from the specified database
     * table.
     * 
     * Example Usage:
     * ```javascript
     * const itemList = i_list();
     * console.log(itemList);
     * ```
     * 
     * Note: Make sure to replace `database` and `table` with the actual database and
     * table names in your implementation.
     */
    function i_list() {
        return database.list(table);
    }

    /**
     * Function: i_select
     * 
     * Description: This function is used to query the database and retrieve data from
     * a specified table based on the provided ID_Indicador.
     * 
     * Parameters:
     * - ID_Indicador: A unique identifier used to filter the data in the database
     * table.
     * 
     * Return Value: The function returns the result of the database query, which is a
     * collection of records matching the provided ID_Indicador.
     * 
     * Example Usage:
     * ```
     * const result = i_select(123);
     * console.log(result);
     * ```
     * 
     * Note: This function assumes the existence of a database object and a table
     * variable, which are not defined in the provided code snippet.
     */
    function i_select(ID_Indicador) {
        return database.query(table, { ID_Indicador: ID_Indicador } );
    }

    /**
         * The `i_add` function is an asynchronous function that takes in a `data`
         * parameter. It performs the following steps:
         * 
         * 1. Extracts the `ID_Indicador` property from the `data` object.
         * 2. Calls the `db_add_update` method of the `database` object, passing in the
         * `table` and an object with the `ID_Indicador` property as the filter, and the
         * `data` object as the update.
         * 3. Waits for the `db_add_update` method to complete and returns the response.
         * 
         * Note: The `database` object and `table` variable are not defined in the provided
         * code snippet, so their usage is assumed to be defined elsewhere.
         */
        async function i_add(data) {
        const ID_Indicador = data.ID_Indicador;
        const response = await database.db_add_update(table, { ID_Indicador: ID_Indicador }, data);
    }

    /**
             * Deletes data from the specified table in the database.
             *
             * @param {Object} data - The data to be deleted.
             * @returns {Promise} A promise that resolves to the result of the delete operation.
             */
            function i_delete(data) {
        return database.db_delete(table, data);
    }

    return {
        i_list,
        i_select,
        i_add,
        i_delete
    }
}
