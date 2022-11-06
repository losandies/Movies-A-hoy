import React, { useState, useContext, useRef, useEffect } from 'react';
import { MoviesContext } from '../../contexts/moviesContext';
import tw from 'twin.macro';
import styled from 'styled-components';
import { NavBar } from '../../components/navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	PageContainer,
	MovieRow,
	MoviePoster,
} from '../../components/globalComponents';
import Footer from '../../components/footer/Footer';

const SearchForm = styled.form`
	${tw`w-full h-40 flex flex-col items-center justify-center p-5 md:mt-10`}
`;
const SearchBar = styled.input`
	${tw`bg-white h-16 w-[90%] md:w-[60%] p-4 rounded-2xl text-lg`}
`;
const ResultsContainer = styled.div`
	${tw`w-full sm:w-[90%] flex flex-wrap justify-around overflow-visible md:mt-16 p-0`}
`;

const SearchPage = () => {
	const { setCurrentSelection, setCurrentPage } = useContext(MoviesContext);

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
							setCurrentSelection(movie);
							navigate(
								`/${movie.media_type ? movie.media_type : 'media'}/${movie.id}`
							);
						}}
					/>
				))}
			</ResultsContainer>
			<Footer />
		</PageContainer>
	);
};

export default SearchPage;
