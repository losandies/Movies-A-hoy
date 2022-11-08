import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import styled from 'styled-components';
import tw from 'twin.macro';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import DescriptionPage from './pages/descriptionPage/DescriptionPage';
import { MoviesContext } from './contexts/moviesContext';
import SearchPage from './pages/searchPage/SearchPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import LoginPage from './pages/loginPage/LoginPage';
import { UserContext } from './contexts/userContext';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
	${tw`w-full h-full flex flex-col`}
`;

function App() {
	const [currentSelection, setCurrentSelection] = useState({});
	const [currentPage, setCurrentPage] = useState('home');
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [user, setUser] = useState({});

	const checkUserLoggedIn = async () => {
		try {
			const res = await axios.get('http://localhost:9000/auth/me', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (res) {
				setUser(res.data);
				setIsAuthorized(true);
			}
		} catch (err) {
			setIsAuthorized(false);
		}
	};

	return (
		<UserContext.Provider
			value={{
				setIsAuthorized,
				isAuthorized,
				user,
				checkUserLoggedIn,
				setUser,
			}}
		>
			<MoviesContext.Provider
				value={{
					currentSelection,
					setCurrentSelection,
					currentPage,
					setCurrentPage,
				}}
			>
				<AppContainer>
					<Router>
						<Routes>
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/" element={<PrivateRoute />}>
								<Route path="/" element={<HomePage />} />
							</Route>
							<Route path="/:mediaType/:id" element={<PrivateRoute />}>
								<Route path="/:mediaType/:id" element={<DescriptionPage />} />
							</Route>
							<Route path="/search" element={<PrivateRoute />}>
								<Route path="/search" element={<SearchPage />} />
							</Route>
						</Routes>
					</Router>
				</AppContainer>
				<ToastContainer />
			</MoviesContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
