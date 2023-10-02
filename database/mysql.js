/**
 * @fileoverview This module handles the connection to a MySQL database and provides functions to interact with it.
 * @exports list
 * @exports db_select
 * @exports db_delete
 * @exports db_add
 * @exports query
 */

// Import required modules
const mysql = require('mysql');
const config = require('../config');

/**
 * Dbconfig object.
 */
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

/**
 * The `handleCon` function is responsible for establishing a connection to a MySQL
 * database using the provided `dbconfig` object. It utilizes the `mysql` module
 * to create a connection and handles any errors that may occur during the
 * connection process.
 * 
 * The function first creates a connection using the `mysql.createConnection`
 * method, passing in the `dbconfig` object. It then calls the `connect` method on
 * the connection object, providing a callback function that will be executed once
 * the connection is established or if an error occurs.
 * 
 * If an error occurs during the connection process, the function logs the error
 * message to the console using `console.log` and then sets a timeout of 2000
 * milliseconds before calling itself again. This allows the function to retry the
 * connection after a delay.
 * 
 * If the connection is successfully established, the function logs a success
 * message to the console.
 * 
 * The function also sets up an error event listener on the connection object using
 * the `on` method. This listener is triggered if any errors occur while the
 * connection is active. If the error code is `PROTOCOL_CONNECTION_LOST`,
 * indicating a lost connection, the function calls itself again to attempt to
 * reconnect. For any other error code, the function throws the error.
 * 
 * Note: This code assumes that the `mysql` module has been imported and the
 * `dbconfig` object has been properly defined.
 */
function handleCon() {
    connection = mysql.createConnection(dbconfig);
    /**
     * This method is used to handle database connection errors. It takes an error
     * object as a parameter and checks if the error exists. If an error is present,
     * it logs the error message with the prefix '[db err]' and then sets a timeout of
     * 2000 milliseconds before calling the 'handleCon' function again. If no error is
     * present, it logs the message 'DB Connected!'.
     */
    connection.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(handleCon, 30000);
        } else {
            console.log('DB Connected!');
        }
    });

    /**
     * This method is used to handle database errors. It takes an error object as a
     * parameter.
     * 
     * If the error code is 'PROTOCOL_CONNECTION_LOST', the method calls the
     * 'handleCon()' function to handle the connection loss. Otherwise, it throws the
     * error.
     * 
     * Example usage:
     * ```javascript
     * try {
         * // some database operation
         * } catch (err) {
         * err => {
             * console.log('[db err]', err);
             * if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                 * handleCon();
                 * } else {
                 * throw err;
                 * }
             * }
         * }
     */
    connection.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    });
}

handleCon();


/**
 * The `clear` function is a JavaScript function that takes in a `text` parameter
 * and returns a modified version of the text with certain characters and keywords
 * removed.
 * 
 * Here is the signature of the function:
 * ```javascript
 * function clear(text)
 * ```
 * 
 * Parameters:
 * - `text` (string): The input text that needs to be cleared.
 * 
 * Return Value:
 * - The modified version of the input text with certain characters and keywords
 * removed.
 * 
 * Example Usage:
 * ```javascript
 * let inputText = "This is some 'text' with \"special\" characters and DELETE
 * keyword.";
 * let clearedText = clear(inputText);
 * console.log(clearedText);
 * // Output: "This is some \\'text\\' with \\"special\\" characters and keyword."
 * ```
 * 
 * The `clear` function performs the following modifications on the input text:
 * - Replaces all single quotes (`'`) with escaped single quotes (`\\'`).
 * - Replaces all double quotes (`"`) with escaped double quotes (`\\"`).
 * - Replaces all backticks (`\``) with escaped backticks (`\\``).
 * - Removes all occurrences of the `--` sequence.
 * - Removes all occurrences of the `DELETE` keyword.
 * - Removes all occurrences of the `UPDATE` keyword.
 * - Removes all occurrences of the `INSERT` keyword.
 * - Removes all occurrences of the `DROP` keyword.
 * 
 * Note: The purpose of this function is to sanitize input text and prevent
 * potential SQL injection attacks by removing certain characters and keywords
 * commonly used in SQL queries.
 */
function clear(text) {
    text = text.replace(/'/g, "\\'");
    text = text.replace(/"/g, '\\"');
    text = text.replace(/`/g, '\\`');
    text = text.replace(/--/g, '');
    text = text.replace(/DELETE/g, '');
    text = text.replace(/UPDATE/g, '');
    text = text.replace(/INSERT/g, '');
    text = text.replace(/DROP/g, '');
    return text;
}


/**
 * The `list` function is a JavaScript method that takes a `table` parameter and
 * returns a Promise. It executes a SQL query to select all records from the
 * specified table.
 * 
 * Syntax:
 * ```javascript
 * list(table)
 * ```
 * 
 * Parameters:
 * - `table` (string): The name of the table from which to retrieve the records.
 * 
 * Returns:
 * - A Promise that resolves with the retrieved data if the query is successful.
 * - A Promise that rejects with an error if the query encounters any issues.
 * 
 * Example Usage:
 * ```javascript
 * list('users')
 * .then(data => {
     * console.log(data); // Retrieved data from the 'users' table
     * })
 * .catch(err => {
     * console.error(err); // Error encountered during the query
     * });
 * ```
 * 
 * Note: The `clear` function is called internally to clear any unwanted characters
 * or formatting from the `table` parameter before executing the query.
 */
function list(table) {
    return new Promise((resolve, reject) => {
        table = clear(table);
        /**
     * This method takes in two parameters: `err` and `data`. It returns a promise that
     * either resolves with the `data` parameter if `err` is falsy, or rejects with
     * the `err` parameter if it is truthy.
     */
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    });
}

/**
 * This is a JavaScript function named `db_select` that performs a database query
 * to select records from a specified table based on a given `ID_Usuario` value.
 * It returns a Promise that resolves with the query result or rejects with an
 * error.
 * 
 * Parameters:
 * - `table` (string): The name of the table to query.
 * - `ID_Usuario` (string): The value of the ID_Usuario field to match.
 * 
 * Returns:
 * - Promise: A Promise that resolves with the query result (an array of records)
 * or rejects with an error.
 * 
 * Example usage:
 * ```javascript
 * db_select('users', '123')
 * .then(result => {
     * console.log(result); // Process the query result
     * })
 * .catch(error => {
     * console.error(error); // Handle the error
     * });
 * ```
 * 
 * Note: The `clear` function is assumed to be a custom function that sanitizes the
 * input values to prevent SQL injection.
 */
function db_select(table, ID_Usuario) {
    return new Promise((resolve, reject) => {
        table = clear(table);
        ID_Usuario = clear(ID_Usuario);
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy and the "result" parameter will contain the result of the operation. In
     * this case, the method will call the "resolve" function with the result as an
     * argument.
     * 
     * This method follows the JavaScript convention of using a callback function with
     * an "err" parameter as the first argument.
     */
    connection.query(`SELECT * FROM ${table} WHERE ID_Usuario = ${ID_Usuario}`, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

/**
 * Deletes a record from the specified table based on the provided data.
 * 
 * @param {string} table - The name of the table from which to delete the record.
 * @param {object} data - The data used to identify the record to be deleted.
 * @returns {Promise} A promise that resolves with the result of the delete operation or rejects with an error.
 * @throws {Error} If an error occurs during the delete operation.
 */
function db_delete(table, data) {
    return new Promise((resolve, reject) => {
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy. In this case, the method will call the "resolve" function with the
     * result as an argument.
     * 
     * This method follows the standard JavaScript callback pattern, where the first
     * parameter is reserved for an error object and the second parameter is used for
     * the result of the operation.
     */
    connection.query(`DELETE FROM ${table} WHERE ID_USUARIO = ?`, data, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

/**
 * Adds a new record to the specified database table or updates an existing record if a duplicate key is found.
 * 
 * @param {string} table - The name of the database table to insert the record into.
 * @param {object} data - The data object containing the values to be inserted or updated.
 * @returns {Promise} A Promise that resolves with the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
function db_add(table, data) {
    return new Promise((resolve, reject) => {
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy and the "result" parameter will contain the result of the operation. In
     * this case, the method will call the "resolve" function with the result as an
     * argument.
     * 
     * This method follows the JavaScript convention of using a callback function with
     * an "err" parameter as the first argument.
     */
    connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


/**
 * Executes a delete query on a specified database table based on the given query parameters.
 * @param {string} table - The name of the database table to delete from.
 * @param {object} query - An object containing the query parameters as key-value pairs.
 * @returns {Promise} A promise that resolves with the result of the delete query or rejects with an error.
 * @throws {Error} If an error occurs during the execution of the delete query.
 */
function db_delete_query(table, query) {
    return new Promise((resolve, reject) => {
        const whereKeys = Object.keys(query).map(key => `${key} = ?`).join(' AND ');
        const whereValues = Object.values(query);

        const sql = `DELETE FROM ${table} WHERE ${whereKeys}`;
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy and the "result" parameter will contain the result of the operation. In
     * this case, the method will call the "resolve" function with the result as an
     * argument.
     * 
     * This method follows the JavaScript convention of using a callback function with
     * an "err" parameter as the first argument.
     */
    connection.query(sql, whereValues, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}


/**
 * Function: db_add_update
 * 
 * Description: This function is used to add or update data in a database table
 * based on a given query.
 * 
 * Parameters:
 * - table: A string representing the name of the database table.
 * - query: An object representing the query to check if the data already exists in
 * the table.
 * - data: An object representing the data to be added or updated in the table.
 * 
 * Return Value: A Promise that resolves with the result of the update or insert
 * operation.
 * 
 * Example Usage:
 * ```javascript
 * const table = 'users';
 * const query = { id: 1 };
 * const data = { name: 'John Doe', age: 30 };
 * 
 * db_add_update(table, query, data)
 * .then(result => {
     * console.log('Data added/updated successfully:', result);
     * })
 * .catch(error => {
     * console.error('Error occurred:', error);
     * });
 * ```
 * 
 * Note: This function internally uses the `db_check` function to determine if the
 * data already exists in the table. If the data exists, it uses the `db_update`
 * function to update the existing data. If the data does not exist, it uses the
 * `db_add` function to insert the new data.
 */
function db_add_update(table, query, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const exists = await db_check(table, query);

            if (exists) {
                const updateResult = await db_update(table, query, data);
                resolve(updateResult);
            } else {
                const insertResult = await db_add(table, data);
                resolve(insertResult);
            }
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * The `db_check` function is a JavaScript method that performs a database query to
 * check if a record exists in a specified table based on a given query. It
 * returns a Promise that resolves to a boolean value indicating whether the
 * record exists or not.
 * 
 * Parameters:
 * - `table` (string): The name of the table to query.
 * - `query` (object): An object containing the conditions for the query. The keys
 * represent the column names, and the values represent the desired values for
 * those columns.
 * 
 * Returns:
 * - A Promise that resolves to a boolean value. `true` if the record exists, and
 * `false` otherwise.
 * 
 * Example usage:
 * ```javascript
 * const table = 'users';
 * const query = { id: 1, name: 'John' };
 * 
 * db_check(table, query)
 * .then(result => {
     * if (result) {
         * console.log('Record exists');
         * } else {
         * console.log('Record does not exist');
         * }
     * })
 * .catch(error => {
     * console.error('An error occurred:', error);
     * });
 * ```
 * 
 * Note: This function assumes the existence of a `connection` object that
 * represents a database connection. The query is performed using the
 * `connection.query` method, which takes the table name, conditions, and values
 * as parameters.
 */
function db_check(table, query) {
    return new Promise((resolve, reject) => {
        const conditions = Object.keys(query)
            .map(key => `${key} = ?`)
            .join(' AND ');
        const values = Object.values(query);
        /**
     * This method takes in two parameters: "err" and "result". It returns a promise
     * that resolves to a boolean value indicating whether the length of the "result"
     * array is greater than 0. If an error is passed as the "err" parameter, the
     * promise will be rejected with that error.
     */
    connection.query(`SELECT * FROM ${table} WHERE ${conditions}`, values, (err, result) => {
            return err ? reject(err) : resolve(result.length > 0);
        });
    });
}


/**
 * Updates records in a database table based on a given query and data.
 * 
 * @param {string} table - The name of the table to update records in.
 * @param {object} query - An object representing the query to filter records to be updated.
 * @param {object} data - An object containing the updated values for the records.
 * @returns {Promise} A promise that resolves with the result of the update operation.
 * @throws {Error} If an error occurs during the update operation.
 */
function db_update(table, query, data) {
    return new Promise((resolve, reject) => {
        const updateKeys = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const updateValues = Object.values(data);

        const whereKeys = Object.keys(query).map(key => `${key} = ?`).join(' AND ');
        const whereValues = Object.values(query);

        const sql = `UPDATE ${table} SET ${updateKeys} WHERE ${whereKeys}`;
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy. In this case, the method will call the "resolve" function with the
     * result as an argument.
     * 
     * This method follows the standard JavaScript callback pattern, where the first
     * parameter is reserved for an error object and the second parameter is used for
     * the result of the operation.
     */
    connection.query(sql, [...updateValues, ...whereValues], (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

/**
 * The `query` function is a JavaScript method that takes two parameters: `table`
 * and `query`. It returns a Promise that resolves to the result of a SELECT query
 * on the specified `table` with the provided `query` conditions.
 * 
 * - `table` (string): The name of the table to query.
 * - `query` (object): An object containing the conditions for the query. The keys
 * represent the column names, and the values represent the desired values for
 * those columns.
 * 
 * The function constructs a WHERE clause using the keys and values from the
 * `query` object. It then executes the SQL query using the constructed WHERE
 * clause and the corresponding values. If the query is successful, the function
 * resolves with the first result from the query. If there is an error, the
 * function rejects with the error object.
 * 
 * Example usage:
 * 
 * ```javascript
 * query('users', { name: 'John', age: 25 })
 * .then(result => {
     * console.log(result);
     * })
 * .catch(error => {
     * console.error(error);
     * });
 * ```
 * 
 * In the example above, the function will execute the SQL query `SELECT * FROM
 * users WHERE name = 'John' AND age = 25`. The resolved result will be logged to
 * the console if the query is successful, or an error will be logged if there is
 * any issue with the query execution.
 */
function query(table, query) {
    return new Promise((resolve, reject) => {
        const whereKeys = Object.keys(query).map(key => `${key} = ?`).join(' AND ');
        const whereValues = Object.values(query);

        const sql = `SELECT * FROM ${table} WHERE ${whereKeys}`;
        /**
     * This method is a callback function that takes two parameters: "err" and
     * "result". It is typically used in asynchronous operations to handle errors and
     * return the desired result.
     * 
     * - If an error occurs (err is truthy), it will call the "reject" function with
     * the error as the argument.
     * - If no error occurs (err is falsy), it will call the "resolve" function with
     * the first element of the "result" array as the argument.
     * 
     * This callback function is commonly used in Promise-based operations to handle
     * success and failure cases.
     */
    connection.query(sql, whereValues, (err, result) => {
            return err ? reject(err) : resolve(result[0]);
        });
    });
}

/**
 * The `queryList` function is a JavaScript method that takes two parameters:
 * `table` and `query`. It returns a Promise that resolves with the result of a
 * database query.
 * 
 * #### Parameters:
 * - `table` (string): The name of the database table to query.
 * - `query` (object): An object representing the query conditions.
 * 
 * #### Returns:
 * - A Promise that resolves with the result of the query.
 * 
 * #### Example Usage:
 * ```javascript
 * queryList('users', { age: 25 })
 * .then((result) => {
     * console.log(result);
     * })
 * .catch((err) => {
     * console.error(err);
     * });
 * ```
 * 
 * In the example above, the `queryList` function is used to query the 'users'
 * table for records where the 'age' column is equal to 25. The result of the
 * query is logged to the console. If an error occurs during the query, it is
 * caught and logged to the console as well.
 */
function queryList(table, query) {
    return new Promise((resolve, reject) => {
        /**
     * This method is used to handle the result of an asynchronous operation. It takes
     * two parameters: "err" and "result".
     * 
     * If an error occurs during the operation, the "err" parameter will be truthy. In
     * this case, the method will call the "reject" function with the error as an
     * argument.
     * 
     * If the operation is successful and no error occurs, the "err" parameter will be
     * falsy and the "result" parameter will contain the result of the operation. In
     * this case, the method will call the "resolve" function with the result as an
     * argument.
     * 
     * This method follows the JavaScript convention of using a callback function with
     * an "err" parameter as the first argument.
     */
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, result) => {
            return err ? reject(err) : resolve(result);
        });
    });
}

// Export functions for use in other modules
module.exports = {
    list,
    db_select,
    db_delete,
    db_delete_query,
    db_add,
    db_add_update,
    query,
    queryList
}