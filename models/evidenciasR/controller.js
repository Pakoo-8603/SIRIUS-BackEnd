/**
 * Controller for managing 'evidencias_r' table.
 * @module evidencias_r/controller
 */

const table = 'evidencias_r';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the InjectionDatabase object is not provided, it will default to
 * requiring the MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. `er_list()`: This method retrieves a list of records from the specified table
 * in the database.
 * 
 * 2. `er_select(ID_Indicador)`: This method queries the database to retrieve a
 * list of records from the specified table that match the given ID_Indicador.
 * 
 * 3. `er_add(data, ID_Indicador)`: This method adds a new record to the specified
 * table in the database. It takes the data object and the ID_Indicador as
 * parameters.
 * 
 * 4. `er_delete(listID, ID_Indicador)`: This method deletes records from the
 * specified table in the database. It takes a list of IDs to delete and the
 * ID_Indicador as parameters.
 * 
 * Note: The methods in this module interact with the database using the
 * InjectionDatabase object or the default MySQL database module.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
     * Function Name: er_list
     * 
     * Description: This function retrieves a list of items from a database table.
     * 
     * Syntax:
     * ```javascript
     * er_list()
     * ```
     * 
     * Parameters: None
     * 
     * Return Value: An array containing the list of items from the specified database
     * table.
     * 
     * Example Usage:
     * ```javascript
     * var itemList = er_list();
     * console.log(itemList);
     * ```
     * 
     * Note: Make sure to replace `database` and `table` with the actual database and
     * table names in your implementation.
     */
    function er_list() {
        return database.list(table);
    }

    /**
     * Function: er_select
     * 
     * Description: This function is used to retrieve a list of records from a database
     * table based on the provided ID_Indicador.
     * 
     * Parameters:
     * - ID_Indicador: A unique identifier used to filter the records in the database
     * table.
     * 
     * Return Value:
     * - An array of records matching the provided ID_Indicador.
     * 
     * Example Usage:
     * ```
     * const result = er_select(123);
     * console.log(result);
     * ```
     * 
     * Note: This function assumes the existence of a database object with a queryList
     * method and a table variable representing the name of the database table.
     */
    function er_select(ID_Indicador) {
        return database.queryList(table, { ID_Indicador: ID_Indicador } );
    }

    /**
         * This is an asynchronous function named `er_add` that takes two parameters:
         * `data` and `ID_Indicador`.
         * 
         * The function assigns the value of `ID_Indicador` to the `ID_Indicador` property
         * of the `data` object. It also assigns the value of `data.ID_Referencia` to the
         * `ID_Referencia` constant.
         * 
         * The function then calls the `db_add_update` method of the `database` object,
         * passing in the `table` variable, an object with `ID_Referencia` and
         * `ID_Indicador` properties, and the `data` object. The `db_add_update` method is
         * expected to return a promise.
         * 
         * The function returns the promise returned by the `db_add_update` method.
         */
        async function er_add(data, ID_Indicador) {
        data.ID_Indicador = ID_Indicador;
        const ID_Referencia = data.ID_Referencia;
        return database.db_add_update(table, { ID_Referencia: ID_Referencia, ID_Indicador: ID_Indicador }, data);
    }

    /**
             * Deletes records from the database based on the given list of IDs and indicator ID.
             * @param {Object} listID - The list of IDs to delete.
             * @param {number} listID.delete - The array of IDs to delete.
             * @param {number} ID_Indicador - The indicator ID.
             * @returns {boolean} - Returns true if the deletion is successful.
             */
            function er_delete(listID, ID_Indicador) {
        for (let i = 0; i < listID.delete.length; i++) {
            database.db_delete_query(table, { ID_Referencia: listID.delete[i], ID_Indicador: ID_Indicador});
        }
        return true;
    }

    return {
        er_list,
        er_select,
        er_add,
        er_delete
    }
}
