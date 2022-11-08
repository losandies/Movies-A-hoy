const express = require('express');
const db = require('../db');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/register', validInfo, async (req, res) => {
	try {
		const { firstName, lastName, email, password, favorite_genre } = req.body;

		const fullName = `${firstName} ${lastName}`;

		const user = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);

		if (user.rows.length !== 0) {
			return res.status(401).json('User already exists');
		}

		const encryptedPassword = bcrypt.hashSync(password, 10);

		const newUser = await db.query(
			'INSERT INTO users (name, email, password, favorite_genre) VALUES ($1, $2, $3, $4) RETURNING *',
			[fullName, email, encryptedPassword, favorite_genre]
		);

		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ ...newUser.rows[0], token });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

router.post('/login', validInfo, async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);

		if (user.rows.length === 0) {
			return res.status(401).json('Either the email or password are incorrect');
		}

		const validPassword = await bcrypt.compare(password, user.rows[0].password);

		if (!validPassword) {
			res.status(401).json('Either the email or password are incorrect');
		}

		const token = jwtGenerator(user.rows[0].user_id);
		res.json({ ...user.rows[0], token });
	} catch (err) {
		console.log(err.message);
		res.send(500).send('Server Error');
	}
});

router.get('/verify', authorization, async (req, res) => {
	console.log('hit');
	try {
		res.json(true);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.get('/me', authorization, async (req, res) => {
	console.log('hit');
	try {
		const user = await db.query(
			'SELECT name, favorite_genre FROM users WHERE user_id = $1',
			[req.user]
		);

		res.json(user.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
