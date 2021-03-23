const { Pool } = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  database: "coloreando-db",
  password: '123'
};

const pool = new Pool(config);

module.exports.db = {
  query: (query, params) => pool.query(query, params),
}