import React, { useState, useContext, useRef, useEffect } from 'react';
import {
	PageContainer,
	MovieRow,
	MoviePoster,
} from '../components/globalComponents';
import { MoviesContext } from '../contexts/moviesContext';
import tw from 'twin.macro';
import styled from 'styled-components';
import { NavBar } from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
	${tw``}
`;
const SearchForm = styled.form`
	${tw`w-full h-40 flex flex-col items-center justify-center p-5`}
`;
const ButtonContainer = styled.div`
	${tw`w-[80%] h-12 bg-red-400 flex justify-around`}
`;
const SearchByButton = styled.div`
	${tw`w-16 h-12 bg-blue-500`}
`;
const SearchBar = styled.input`
	${tw`bg-white h-16 w-[90%] p-4 rounded-2xl text-lg`}
`;

const ResultsContainer = styled(MovieRow)`
	${tw`w-full flex-wrap overflow-visible justify-around p-0`}
`;

const SearchPage = () => {
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const { setCurrentMovie, setCurrentPage } = useContext(MoviesContext);
	let searchInputRef = useRef();
	const navigate = useNavigate();

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
	});

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
