const { Client } = require('pg');
require('dotenv').config();

const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

const prodConfig = {
	connectionString: process.env.DATABASE_URL,
};

const db = new Client(
	process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

module.exports = db;
