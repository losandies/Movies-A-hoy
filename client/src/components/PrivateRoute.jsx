import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = () => {
	const { isLoggedIn, checkUserLoggedIn } = useContext(UserContext);

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
