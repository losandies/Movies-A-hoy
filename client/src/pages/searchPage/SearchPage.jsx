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
	/* ${tw`w-full sm:w-[90%] h-auto flex flex-wrap justify-around overflow-visible md:mt-16 p-0`} */
	${tw`w-full md:w-[90%] justify-around grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 p-0 sm:ml-6`}
`;
const MovieTVToggleContainer = styled.div`
	${tw`h-16 w-40 mb-2 flex `}
`;
const ToggleSwitch = styled.div`
	${tw`w-1/2 h-full transition flex items-center justify-center ease-out text-base cursor-pointer`}
	font-family: 'Poppins';
`;

const SearchPage = () => {
	const { setCurrentSelection, setCurrentPage } = useContext(MoviesContext);

	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searchToggle, setSearchToggle] = useState('Movies');

	const navigate = useNavigate();

	let searchInputRef = useRef();

	const fetchSearchResults = async (e) => {
		e.preventDefault();
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/${
				searchToggle === 'Movies' ? 'movie' : 'tv'
			}?api_key=${
				process.env.REACT_APP_MOVIEDB_API_KEY
			}&language=en-US&query=${searchInput}&include_adult=false`
		);

		setSearchResults(response.data.results);
		searchInputRef.current.value = '';
	};

	useEffect(() => {
		setCurrentPage('search');
	}, []);

	return (
		<div className="flex flex-col h-full">
			<PageContainer className="items-center">
				<NavBar />
				<SearchForm onSubmit={(e) => fetchSearchResults(e)}>
					<MovieTVToggleContainer>
						<ToggleSwitch
							className={
								searchToggle === 'Movies'
									? 'bg-gray-600 text-white rounded-l-lg'
									: 'bg-white text-black rounded-l-lg'
							}
							onClick={() => setSearchToggle('Movies')}
						>
							Movies
						</ToggleSwitch>
						<ToggleSwitch
							className={
								searchToggle === 'TV'
									? 'bg-gray-600 text-white rounded-r-lg'
									: 'bg-white text-black rounded-r-lg'
							}
							onClick={() => setSearchToggle('TV')}
						>
							TV
						</ToggleSwitch>
					</MovieTVToggleContainer>
					<SearchBar
						placeholder={
							searchToggle === 'Movies'
								? 'Search Movies...'
								: 'Search TV Shows...'
						}
						ref={searchInputRef}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
				</SearchForm>

				<ResultsContainer
					className={searchResults.length > 1 ? 'h-auto md:h-full' : 'h-full'}
				>
					{searchResults.map((movie) => (
						<MoviePoster
							key={movie.id}
							src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
							alt={movie.title}
							onClick={() => {
								setCurrentSelection(movie);
								navigate(
									`/${movie.media_type ? movie.media_type : 'media'}/${
										movie.id
									}`
								);
							}}
						/>
					))}
				</ResultsContainer>
				<Footer />
			</PageContainer>
		</div>
	);
};

export default SearchPage;
