const pg = require('pg');
const { Pool } = pg;
require("dotenv").config();
let localPoolConfig = {
  user: 'postgres',
  password: 'edialeomo12',
  host: 'localhost',
  port: '5432',
  database: 'hyperislandtodoapp'
};

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} : localPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool