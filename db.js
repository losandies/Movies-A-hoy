const { Client } = require('pg');

const db = new Client({
	user: 'sir9eleven',
	password: 'sir9eleven',
	host: 'localhost',
	port: 5432,
	database: 'moviesahoy',
});

module.exports = db;
