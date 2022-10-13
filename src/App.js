import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useLocation } from 'wouter';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	redirect,
} from 'react-router-dom';
import DescriptionPage from './pages/descriptionPage/DescriptionPage';
import { MoviesContext } from './contexts/moviesContext';
import SearchPage from './pages/SearchPage';

const AppContainer = styled.div`
	${tw`
  w-full
  h-full
  flex
  flex-col
  `}
`;

function App() {
	const [movieData, setMovieData] = useState({
		nowPlayingMovies: [],
		popularMovies: [],
		topRatedMovies: [],
		upcomingMovies: [],
		trending: [],
		originals: [],
	});

	const [currentMovie, setCurrentMovie] = useState({});
	const [currentPage, setCurrentPage] = useState('home');

	const fetchMovieData = async () => {
		const nowPlaying = await axios.get(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1&region=US`
		);
		const popular = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
		);
		const topRated = await axios.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
		);
		const upcoming = await axios.get(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
		);
		const trending = await axios.get(
			`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`
		);

		const originals = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=6&with_status=0&with_type=4`
		);

		setMovieData({
			nowPlayingMovies: nowPlaying.data.results,
			popularMovies: popular.data.results,
			topRatedMovies: topRated.data.results,
			upcomingMovies: upcoming.data.results,
			trending: trending.data.results,
			originals: originals.data.results,
		});
	};

	const redirectToInfoPage = async (payload) => {
		setCurrentMovie(payload);
	};

	useEffect(() => {
		fetchMovieData();
	}, [movieData]);

	return (
		<Router>
			<MoviesContext.Provider
				value={{
					movieData,
					currentMovie,
					setCurrentMovie,
					currentPage,
					setCurrentPage,
				}}
			>
				<AppContainer>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/:mediaType/:id" element={<DescriptionPage />} />
						<Route path="/search" element={<SearchPage />} />
					</Routes>
				</AppContainer>
			</MoviesContext.Provider>
		</Router>
	);
}

export default App;
