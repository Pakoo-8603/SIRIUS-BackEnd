/**
 * Controller for managing 'evidencias' table.
 * @module evidencias/controller
 */

const table = 'evidencias';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the InjectionDatabase object is not provided, it will default to
 * requiring the MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. e_list(): This method retrieves a list of items from the database table.
 * 
 * 2. e_select(ID_Indicador): This method queries the database table to select
 * items based on the provided ID_Indicador.
 * 
 * 3. e_add(data, ID_Indicador): This method adds a new item to the database table.
 * It takes two parameters: data (the item data) and ID_Indicador (the indicator
 * ID).
 * 
 * 4. e_delete(listID, ID_Indicador): This method deletes items from the database
 * table. It takes two parameters: listID (an object containing the list of IDs to
 * delete) and ID_Indicador (the indicator ID).
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
     * Retrieves a list of elements from the database table.
     *
     * @returns {Array} The list of elements from the specified table.
     */
    function e_list() {
        return database.list(table);
    }

    /**
     * The `e_select` function is used to query a database table based on the provided
     * `ID_Indicador` parameter. It returns a list of records that match the specified
     * `ID_Indicador` value.
     * 
     * Parameters:
     * - `ID_Indicador` (required): The identifier used to filter the records in the
     * database table.
     * 
     * Return Value:
     * - An array of records that match the provided `ID_Indicador` value.
     * 
     * Example Usage:
     * ```javascript
     * const result = e_select(123);
     * console.log(result);
     * ```
     * 
     * In the above example, the `e_select` function is called with an `ID_Indicador`
     * value of 123. It queries the database table and returns an array of records
     * that have an `ID_Indicador` value of 123. The result is then logged to the
     * console.
     */
    function e_select(ID_Indicador) {
        return database.queryList(table, { ID_Indicador: ID_Indicador } );
    }

    /**
         * This is an asynchronous function named `e_add` that takes two parameters: `data`
         * and `ID_Indicador`.
         * 
         * The function assigns the value of `ID_Indicador` to the `ID_Indicador` property
         * of the `data` object. It also assigns the value of `data.ID_Referencia` to the
         * `ID_Referencia` constant.
         * 
         * The function then calls the `db_add_update` method of the `database` object,
         * passing in the `table` variable, an object with `ID_Referencia` and
         * `ID_Indicador` properties, and the `data` object. The `db_add_update` method is
         * expected to return a result.
         * 
         * The function is marked as `async`, indicating that it returns a promise that
         * will be resolved with the result of the `db_add_update` method.
         * 
         * Note: The `table` variable is not defined in the provided code snippet.
         */
        async function e_add(data, ID_Indicador) {
        data.ID_Indicador = ID_Indicador;
        const ID_Referencia = data.ID_Referencia;
        return database.db_add_update(table, { ID_Referencia: ID_Referencia, ID_Indicador: ID_Indicador }, data);
    }

    /**
             * The `e_delete` function is used to delete records from a database table based on
             * the provided `listID` and `ID_Indicador` parameters.
             * 
             * **Parameters:**
             * - `listID` (array): An array containing the IDs of the records to be deleted.
             * - `ID_Indicador` (any): The ID of the indicator associated with the records to
             * be deleted.
             * 
             * **Returns:**
             * - `true` (boolean): Returns `true` if the deletion operation is successful.
             * 
             * **Example Usage:**
             * ```javascript
             * const listID = { delete: [1, 2, 3] };
             * const ID_Indicador = 4;
             * const result = e_delete(listID, ID_Indicador);
             * console.log(result); // true
             * ```
             * 
             * **Note:**
             * - This function assumes the existence of a `database` object with a
             * `db_delete_query` method that performs the actual deletion operation in the
             * database table specified by the `table` variable.
             */
            function e_delete(listID, ID_Indicador) {
        for (let i = 0; i < listID.delete.length; i++) {
            database.db_delete_query(table, { ID_Referencia: listID.delete[i], ID_Indicador: ID_Indicador});
        }
        return true;
    }

    return {
        e_list,
        e_select,
        e_add,
        e_delete
    }
}
