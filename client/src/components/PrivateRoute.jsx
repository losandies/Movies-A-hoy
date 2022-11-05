import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = () => {
	const { checkAuthenticated, isAuthorized } = useContext(UserContext);

	useEffect(() => {
		checkAuthenticated();
		console.log(isAuthorized);
	});

	return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
