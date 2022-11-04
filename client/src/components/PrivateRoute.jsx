import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const PrivateRoute = () => {
	const { isAuthorized } = useContext(UserContext);

	return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
