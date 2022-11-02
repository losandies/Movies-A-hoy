module.exports = (req, res, next) => {
	const { email, firstName, lastName, password } = req.body;

	const validEmail = (email) => {
		return /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u.test(
			email
		);
	};

	if (req.path === '/register') {
		if (![email, firstName, lastName, password].every(Boolean)) {
			return res.status(401).json('Missing Credentials');
		} else if (!validEmail(email)) {
			return res.status(401).json('Invalid Email');
		}
	} else if (req.path === '/login') {
		if (![email, password].every(Boolean)) {
			return res.status(401).json('Missing Credentials');
		} else if (!validEmail(email)) {
			return res.status(401).json('Invalid Email');
		}
	}
	next();
};
