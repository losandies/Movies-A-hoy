module.exports = (req, res, next) => {
	const { email, firstName, lastName, password, favorite_genre } = req.body;

	const validEmail = (email) => {
		return /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u.test(
			email
		);
	};

	const validPassword = (password) => {
		return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/u.test(password);
	};

	if (req.path === '/register') {
		if (
			![email, firstName, lastName, password, favorite_genre].every(Boolean)
		) {
			return res.status(401).json('Missing one or more fields');
		} else if (!validEmail(email)) {
			return res.status(401).json('Invalid Email');
		} else if (!validPassword(password)) {
			return res
				.status(401)
				.json(
					'Password must be 8 or more characters and contain at least one letter and one number'
				);
		} else if (!favorite_genre) {
			return res.status(401).json('Please select yuor favorite genre');
		}
	} else if (req.path === '/login') {
		if (![email, password].every(Boolean)) {
			return res.status(401).json('Missing one or more fields');
		} else if (!validEmail(email)) {
			return res.status(401).json('Invalid Email');
		}
	}
	next();
};
