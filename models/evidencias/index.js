/**
 * Module that exports the authentication controller with the database connection.
 * @module models/evidencias/index
 */

const db = require('../../database/mysql');
const ctrl = require('./controller');

module.exports = ctrl(db);