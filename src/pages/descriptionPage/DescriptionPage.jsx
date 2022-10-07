import React, { useContext, useState, useEffect } from 'react';
import { BackButton, PageContainer } from '../../components/globalComponents';
import { MoviesContext } from '../../contexts/moviesContext';
import tw from 'twin.macro';
import styled from 'styled-components';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'wouter';
import axios from 'axios';

const MovieHeroImage = styled.img`
	width: 100%;
	height: 320px;
	object-fit: cover;
	object-position: 50% 50%;
	${tw``}
`;
const ImageContainer = styled.div`
	${tw`w-full h-[320px]`}
`;

const ImageOverlay = styled.div`
	background: linear-gradient(rgba(0, 130, 170, 0), #000000);
	position: absolute;
	width: 100%;
	height: 320px;
`;

const MovieTitleContainer = styled.div`
	${tw`absolute z-10 w-full p-4`}
`;

const MovieTitle = styled.h2`
	${tw`text-white text-2xl font-semibold`}
`;

const MovieOverviewContainer = styled.div`
	${tw`w-full h-auto flex p-4`}
`;

const MovieOverview = styled.p`
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;

	${tw`text-white text-base mt-1`}
`;

const GenreContainer = styled.div`
	${tw`flex flex-wrap items-center justify-start`}
`;

const GenreBlock = styled.div`
	${tw`h-8 ml-4 mb-4 p-2 bg-[#ffffff] rounded-md flex justify-center items-center`}
`;

const GenreText = styled.p`
	${tw`text-sm font-bold text-gray-900`}
`;

const DescriptionPage = () => {
	const { currentMovie } = useContext(MoviesContext);
	const [genres, setGenres] = useState([]);

	const getMovieGenres = async () => {
		const genreList = [];
		// Check if movie or TV show
		if (currentMovie.first_air_date) {
			let response = await axios.get(
				`https://api.themoviedb.org/3/tv/${currentMovie.id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
			);
			const genres = response.data.genres;
			genres.forEach((genre) => {
				genreList.push(genre.name);
			});
			setGenres(genreList);
		} else {
			let response = await axios.get(
				`https://api.themoviedb.org/3/movie/${currentMovie.id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
			);
			const genres = response.data.genres;
			genres.forEach((genre) => {
				genreList.push(genre.name);
			});
			setGenres(genreList.slice(0, 2));
		}
	};

	const mediaTitle = currentMovie.title;
	const mediaName = currentMovie.name;

	useEffect(() => {
		getMovieGenres();
		console.log(currentMovie.name.length > 30);
	}, []);

	return (
		<PageContainer>
			<ImageContainer>
				<BackButton>
					<Link href="/">
						<MdArrowBackIosNew />
					</Link>
				</BackButton>
				<MovieTitleContainer
					className={`
				${
					(mediaName && mediaName.length > 30) ||
					(mediaTitle && mediaTitle.length > 30)
						? 'top-56'
						: 'top-64'
				}`}
				>
					<MovieTitle>{mediaName || mediaTitle}</MovieTitle>
				</MovieTitleContainer>
				<ImageOverlay />
				<MovieHeroImage
					src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
					alt={currentMovie.name}
				/>
			</ImageContainer>

			<MovieOverviewContainer>
				<MovieOverview>{currentMovie.overview}</MovieOverview>
			</MovieOverviewContainer>
			<GenreContainer>
				{genres.map((genre) => (
					<GenreBlock>
						<GenreText>{genre}</GenreText>
					</GenreBlock>
				))}
			</GenreContainer>
		</PageContainer>
	);
};

export default DescriptionPage;
