import React, { useState, useContext, useRef, useEffect } from 'react';
import { MoviesContext } from '../contexts/moviesContext';
import tw from 'twin.macro';
import styled from 'styled-components';
import { NavBar } from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	PageContainer,
	MovieRow,
	MoviePoster,
} from '../components/globalComponents';

const SearchForm = styled.form`
	${tw`w-full h-40 flex flex-col items-center justify-center p-5`}
`;
const SearchBar = styled.input`
	${tw`bg-white h-16 w-[90%] p-4 rounded-2xl text-lg`}
`;
const ResultsContainer = styled(MovieRow)`
	${tw`w-full flex-wrap overflow-visible justify-around p-0`}
`;

const SearchPage = () => {
	const { setCurrentMovie, setCurrentPage } = useContext(MoviesContext);

	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const navigate = useNavigate();

	let searchInputRef = useRef();

	const fetchSearchResults = async (e) => {
		e.preventDefault();
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${searchInput}&include_adult=false`
		);

		setSearchResults(response.data.results);
		searchInputRef.current.value = '';
	};

	useEffect(() => {
		setCurrentPage('search');
	}, []);

	return (
		<PageContainer>
			<NavBar />
			<SearchForm onSubmit={(e) => fetchSearchResults(e)}>
				<SearchBar
					placeholder="Search..."
					ref={searchInputRef}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</SearchForm>
			<ResultsContainer>
				{searchResults.map((movie) => (
					<MoviePoster
						key={movie.id}
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={movie.title}
						onClick={() => {
							setCurrentMovie(movie);
							navigate(
								`/${movie.media_type ? movie.media_type : 'media'}/${movie.id}`
							);
						}}
					/>
				))}
			</ResultsContainer>
		</PageContainer>
	);
};

export default SearchPage;
