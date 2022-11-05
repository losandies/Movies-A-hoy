import userService from './userService';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'CHECK_AUTHENTICATED':
			state = userService.checkAuthenticated();
			return state;
		default:
			return state;
	}
};
