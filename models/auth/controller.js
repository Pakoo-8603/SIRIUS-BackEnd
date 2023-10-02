/**
 * Controller for authentication related operations
 * @module authController
 */

const table = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth');

/**
 * The `login` function is used to authenticate a user with the provided
 * credentials. It is an asynchronous function that takes in two parameters:
 * `Usuario` (the username of the user to authenticate) and `Password` (the
 * password of the user to authenticate). It returns a promise that resolves to a
 * JWT token if authentication is successful. If the provided credentials are
 * incorrect, it throws an error.
 * 
 * The `db_add` function is used to add a new user to the authentication table. It
 * is an asynchronous function that takes in an object parameter `data` which
 * contains the user data to add to the authentication table. The `data` object
 * should have the `ID_Usuario` property which represents the ID of the user to
 * add. It also has optional properties `Usuario` (the username of the user to
 * add) and `Password` (the password of the user to add). It returns a promise
 * that resolves to the ID of the added user.
 * 
 * The module exports an object that contains the `login` and `db_add` functions.
 */
module.exports = function (InjectionDatabase) {

    let database = InjectionDatabase;

    if (!database) {
        database = require('../../database/mysql');
    }

    /**
         * This is an asynchronous function named "login" that takes two parameters:
         * "Usuario" and "Password". It performs the following steps:
         * 
         * 1. It awaits the result of a database query using the "Usuario" parameter as a
         * filter. The query is performed on a table specified by the "table" variable.
         * 2. If the result of the query is undefined, it throws an error with the message
         * "Usuario o contraseña incorrectos" (User or password incorrect).
         * 3. If the query result is defined, it proceeds to the next step.
         * 4. It awaits the result of another database query using the "ID_Usuario" field
         * from the previous query result as a filter. The query is performed on a table
         * named "cuentas".
         * 5. It uses the bcrypt library to compare the "Password" parameter with the
         * "Password" field from the first query result.
         * 6. If the comparison result is true, it generates a token by calling the
         * "assignToken" function from the "auth" object, passing the entire "authData"
         * object as an argument. It also retrieves the "Nivel" field from the second
         * query result and assigns it to the "level" variable.
         * 7. It returns an object containing the generated token and the "level" value.
         * 8. If the comparison result is false, it throws an error with the message
         * "Usuario o contraseña incorrectos" (User or password incorrect).
         */
    async function login(Usuario, Password) {
        const authData = await database.query(table, { Usuario: Usuario });
        if (authData === undefined) {
            throw new Error('Usuario o contraseña incorrectos');
        }
        else {
            const cuentaData = await database.query('cuentas', { ID_Usuario: authData.ID_Usuario });
            return bcrypt.compare(Password, authData.Password)
                .then((result) => {
                    if (result === true) {
                        const token = auth.assignToken({ ...authData });
                        const level = cuentaData.Nivel;
                        return { token, level };
                    } else {
                        throw new Error('Usuario o contraseña incorrectos');
                    }
                })
        }
    }

    /**
                 * The `db_add` function is an asynchronous function that adds data to a database.
                 * It takes in a `data` parameter, which is an object containing the data to be
                 * added.
                 * 
                 * The function first creates an `authData` object, which will be used to store the
                 * data to be added to the database. It initializes the `ID_Usuario` property of
                 * `authData` with the value of `data.ID_Usuario`.
                 * 
                 * Next, the function checks if the `Usuario` property exists in the `data` object.
                 * If it does, it assigns the value of `data.Usuario` to the `Usuario` property of
                 * `authData`.
                 * 
                 * Similarly, the function checks if the `Password` property exists in the `data`
                 * object. If it does, it uses the `bcrypt.hash` function to hash the `Password`
                 * value and assigns the hashed value to the `Password` property of `authData`.
                 * The `bcrypt.hash` function is awaited, indicating that it is an asynchronous
                 * operation.
                 * 
                 * Finally, the function calls the `database.db_add` function, passing in the
                 * `table` and `authData` as arguments. The result of this function call is
                 * returned.
                 * 
                 * Note: The `table` variable is not defined in the provided code snippet, so its
                 * value is assumed to be defined elsewhere in the code.
                 */
    async function db_add(data) {
        /**
        * AuthData object.
        */
        const authData = {
            ID_Usuario: data.ID_Usuario,
        }
        if (data.Usuario) {
            authData.Usuario = data.Usuario;
        }

        if (data.Password) {
            authData.Password = await bcrypt.hash(data.Password.toString(), 10);
        }
        return database.db_add(table, authData);
    }

    return {
        login,
        db_add
    }
}
