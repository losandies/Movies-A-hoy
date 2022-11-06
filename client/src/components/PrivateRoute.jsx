import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = () => {
	const { checkAuthenticated, isAuthorized, checkUserLoggedIn } =
		useContext(UserContext);

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
