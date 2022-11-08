const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			const token = req.headers.authorization.split(' ')[1];

			if (!token) res.status(403).json({ error: 'Not Authorized' });

			const payload = jwt.verify(token, process.env.jwtSecret);
			console.log(payload);

			req.user = payload.user;
		} catch (err) {
			console.error(err.message);
			res.status(403).json(false);
		}
	}
	next();
};
