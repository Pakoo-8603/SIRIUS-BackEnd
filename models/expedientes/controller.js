/**
 * Controller for managing 'expedientes' table.
 * @module expedientes/controller
 */

const table = 'expedientes';

/**
 * This module exports a function that takes an InjectionDatabase object as a
 * parameter. If the InjectionDatabase object is not provided, it will default to
 * requiring the MySQL database module.
 * 
 * The function returns an object with the following methods:
 * 
 * 1. ex_list(): This method retrieves a list of records from the specified table
 * in the database.
 * 
 * 2. ex_select(ID_Expediente): This method queries the database to select a record
 * with the given ID_Expediente.
 * 
 * 3. ex_add(data): This method adds a new record to the database using the
 * provided data. It returns the ID_Expediente of the newly added record.
 * 
 * 4. ex_delete(ID_Expediente): This method deletes a record from the database with
 * the given ID_Expediente.
 * 
 * Note: The methods in this module rely on the InjectionDatabase object or the
 * MySQL database module for executing the database operations.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
     * Function: ex_list()
     * 
     * Description: This function retrieves a list of items from a specified table in
     * the database.
     * 
     * Syntax:
     * ex_list()
     * 
     * Parameters: None
     * 
     * Return Value:
     * - Type: Array
     * - Description: A list of items from the specified table in the database.
     * 
     * Example Usage:
     * ```
     * var items = ex_list();
     * console.log(items);
     * ```
     * 
     * Note: Make sure to replace "table" with the actual name of the table you want to
     * retrieve items from.
     */
    function ex_list() {
        return database.list(table);
    }

    /**
     * The `ex_select` function is used to query a database table based on the provided
     * `ID_Expediente` parameter. It returns the result of the query.
     * 
     * Parameters:
     * - `ID_Expediente` (number): The unique identifier of the record to be selected.
     * 
     * Returns:
     * - The result of the query, which is a collection of records matching the
     * provided `ID_Expediente`.
     * 
     * Example usage:
     * ```javascript
     * const result = ex_select(123);
     * console.log(result);
     * ```
     * 
     * Note: This documentation assumes the existence of a `database` object with a
     * `query` method that accepts a table name and a query object as parameters.
     */
    function ex_select(ID_Expediente) {
        return database.query(table, { ID_Expediente: ID_Expediente } );
    }

    /**
         * This is an asynchronous function named `ex_add` that takes in a parameter
         * `data`. It retrieves the `ID_Expediente` from the `data` object and uses it to
         * perform an add or update operation in the database table. The function returns
         * the result of the database operation.
         */
        async function ex_add(data) {
        const ID_Expediente = data.ID_Expediente;
        return database.db_add_update(table, { ID_Expediente: ID_Expediente }, data);
    }

    /**
             * Function: ex_delete
             * 
             * Description: This function is used to delete a record from the database table
             * based on the provided ID_Expediente.
             * 
             * Parameters:
             * - ID_Expediente: The unique identifier of the record to be deleted.
             * 
             * Return Value: The function returns the result of the database delete query.
             * 
             * Example Usage:
             * ```
             * ex_delete(123);
             * ```
             * 
             * Note: Make sure to replace "table" with the actual name of the database table in
             * the function implementation.
             */
            function ex_delete(ID_Expediente) {
        return database.db_delete_query(table, { ID_Expediente: ID_Expediente});
    }

    return {
        ex_list,
        ex_select,
        ex_add,
        ex_delete
    }
}
