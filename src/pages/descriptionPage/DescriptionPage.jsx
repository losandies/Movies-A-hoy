import React, { useContext, useState, useEffect } from 'react';
import {
	BackButton,
	PageContainer,
	MovieRow,
	MoviePoster,
} from '../../components/globalComponents';
import { MoviesContext } from '../../contexts/moviesContext';
import tw from 'twin.macro';
import styled from 'styled-components';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link, useLocation } from 'wouter';
import axios from 'axios';

const MovieHeroImage = styled.img`
	width: 100%;
	height: 320px;
	object-fit: cover;
	object-position: 50% 50%;

	${tw``}
`;
const ImageContainer = styled.div`
	${tw`w-full h-[320px] relative`}
`;

const ImageOverlay = styled.div`
	background: linear-gradient(rgba(0, 130, 170, 0), #000000);
	position: absolute;
	top: 0;
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
	${tw`flex w-[95%] flex-wrap items-center justify-start`}
`;

const GenreBlock = styled.div`
	${tw`h-8 ml-4 mb-4 p-2 bg-[#ffffff] rounded-md flex justify-center items-center`}
`;

const GenreText = styled.p`
	${tw`text-sm font-bold text-gray-900`}
`;

const RecommendationContainer = styled(MovieRow)`
	${tw`w-full flex-wrap overflow-visible justify-around p-0`}
`;
const RecommendationTitle = styled.h3`
	${tw`text-xl text-white font-bold ml-4 mt-5 mb-2`}
`;

const DescriptionPage = () => {
	const { currentMovie, getCurrentMovie } = useContext(MoviesContext);
	const [genres, setGenres] = useState([]);
	const [recommendations, setRecommendations] = useState([]);

	const [location, setLocation] = useLocation();

	const getMovieGenresAndRecommendations = async () => {
		const genreList = [];

		// Check if movie or TV show
		const isTVShow = currentMovie.first_air_date;

		let genres = await axios.get(
			`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${
				currentMovie.id
			}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
		);
		let recommendations = await axios.get(
			`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${
				currentMovie.id
			}/recommendations?api_key=${
				process.env.REACT_APP_MOVIEDB_API_KEY
			}&language=en-US&page=1`
		);

		const genreData = genres.data.genres;
		const recommData = recommendations.data.results;

		genreData.forEach((genre) => {
			genreList.push(genre.name);
		});
		setGenres(genreList);
		setRecommendations(recommData);
	};

	// Some objects have 'name' properties some have 'titles' instead
	const mediaTitle = currentMovie.title;
	const mediaName = currentMovie.name;

	const redirectToInfoPage = async (movie) => {
		await getCurrentMovie(movie);
		setLocation(
			`/${movie.media_type ? movie.media_type : 'media'}/${movie.id}`
		);
	};

	useEffect(() => {
		getMovieGenresAndRecommendations();
	}, [currentMovie]);

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
						<GenreText key={genre}>{genre}</GenreText>
					</GenreBlock>
				))}
			</GenreContainer>
			<RecommendationTitle>More Like This</RecommendationTitle>
			<RecommendationContainer>
				{recommendations.map((movie) => (
					<MoviePoster
						key={movie.id}
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={movie.title}
						onClick={() => redirectToInfoPage(movie)}
					/>
				))}
			</RecommendationContainer>
		</PageContainer>
	);
};

export default DescriptionPage;
