import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DescriptionPage from './pages/descriptionPage/DescriptionPage';
import { MoviesContext } from './contexts/moviesContext';
import SearchPage from './pages/searchPage/SearchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { UserContext } from './contexts/userContext';

const AppContainer = styled.div`
	${tw`w-full h-full flex flex-col`}
`;

function App() {
	const [currentSelection, setCurrentSelection] = useState({});
	const [currentPage, setCurrentPage] = useState('home');
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
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
							<Route path="/home" element={<HomePage />} />
							<Route path="/register" element={<RegisterPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/:mediaType/:id" element={<DescriptionPage />} />
							<Route path="/search" element={<SearchPage />} />
						</Routes>
					</Router>
				</AppContainer>
			</MoviesContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
