require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'template_development',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'prod_user',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'prod_db',
    host: process.env.DB_HOST || 'prod-db-host',
    dialect: 'postgres'
  }
};

module.exports = config; 