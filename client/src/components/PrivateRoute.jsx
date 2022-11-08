import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = () => {
	const { isAuthorized, checkUserLoggedIn } = useContext(UserContext);

	useEffect(() => {
		checkUserLoggedIn();
		setTimeout(function () {
			window.location = '';
		}, 1800000);
	}, []);

	return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
