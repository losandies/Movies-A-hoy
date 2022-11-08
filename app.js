const express = require('express');
const cors = require('cors');
const db = require('./db');
const colors = require('colors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', require('./routes/jwtAuth'));

(async () => {
	try {
		await db.connect();
		console.log(
			`PostgreSQL database (${db.database}) is connected on port ${db.port}`
				.brightYellow.underline.bold
		);
	} catch (err) {
		console.log(`Error Connecting: ${err.message}`);
	}
})();

if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Application is running on port: ${PORT}`.brightBlue.bold);
});
