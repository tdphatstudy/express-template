const config = {
  development: {
    username: 'postgres',
    password: null,
    database: 'template_development',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: 'prod_user',
    password: 'secret',
    database: 'prod_db',
    host: 'prod-db-host',
    dialect: 'postgres'
  }
};

module.exports = config; 