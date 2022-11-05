import axios from 'axios';

const checkAuthenticated = async () => {
	try {
		const res = await axios.get('http://localhost:9000/auth/verify', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return res.data && true;
	} catch (error) {
		console.log(error);
	}
};

const userService = {
	checkAuthenticated,
};

export default userService;
