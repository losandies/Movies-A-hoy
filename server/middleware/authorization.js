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

			req.user = payload.user;
			next();
		} catch (err) {
			console.error(err.message);
			res.status(403).json(false);
		}
	}
};
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// //this middleware will on continue on if the token is inside the local storage

// module.exports = function (req, res, next) {
// 	// Get token from header
// 	const token = req.header('token');
// 	console.log(token);

// 	// Check if not token
// 	if (!token) {
// 		return res.status(403).json({ msg: 'authorization denied' });
// 	}

// 	// Verify token
// 	try {
// 		//it is going to give use the user id (user:{id: user.id})
// 		const verify = jwt.verify(token, process.env.jwtSecret);

// 		req.user = verify.user;
// 		next();
// 	} catch (err) {
// 		res.status(401).json({ msg: 'Token is not valid' });
// 	}
// };
