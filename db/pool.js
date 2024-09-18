const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Fredboom11',
  host: 'localhost',
  database: 'company_management'
});

module.exports = pool;