const environment = 'development';
let config = require('../knexfile')[environment];
module.exports = require('knex')(config);