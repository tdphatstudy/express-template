import { Dialect } from 'sequelize';

interface DBConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: Dialect;
}

interface Config {
  [key: string]: DBConfig;
}

const config: Config = {
  development: {
    username: 'root',
    password: null,
    database: 'my_db',
    host: '127.0.0.1',
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

// Support both CommonJS and ES modules
export default config;
export { config };
