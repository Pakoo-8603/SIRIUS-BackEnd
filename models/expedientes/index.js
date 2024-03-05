/**
 * Module that exports the authentication controller with the database connection.
 * @module models/expedientes/index
 */

const db = require('../../database/mysql');
const ctrl = require('./controller');

module.exports = ctrl(db);