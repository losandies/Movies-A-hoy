import React, { useContext, useState, useEffect } from 'react';
import {
	BackButton,
	PageContainer,
	MoviePoster,
} from '../../components/globalComponents';
import { MoviesContext } from '../../contexts/moviesContext';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DescriptionOverlay from './DescriptionOverlay';
import {
	GenreBlock,
	GenreContainer,
	GenreText,
	ImageContainer,
	ImageOverlay,
	MovieHeroImage,
	MovieOverview,
	MovieOverviewContainer,
	MovieTitle,
	MovieTitleContainer,
	RecommendationContainer,
	RecommendationTitle,
} from './styles';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../responsive/screens';
import Footer from '../../components/footer/Footer';

const DescriptionPage = () => {
	const { currentSelection, setCurrentSelection, currentPage } =
		useContext(MoviesContext);
	const [genres, setGenres] = useState([]);
	const [recommendations, setRecommendations] = useState([]);
	const [descriptionIsClicked, setDescriptionIsClicked] = useState(false);
	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	const navigate = useNavigate();

	const getMovieGenresAndRecommendations = async () => {
		const genreList = [];
		let getMovieById = await axios.get(
			`https://api.themoviedb.org/3/find/${currentSelection.id}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&external_source=imdb_id`
		);

		const isTVShow = currentSelection.first_air_date;

		let genres = await axios.get(
			`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${
				currentSelection.id
			}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
		);
		let recommendations = await axios.get(
			`https://api.themoviedb.org/3/${isTVShow ? 'tv' : 'movie'}/${
				currentSelection.id
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

		if (!recommData) {
			let sameGenre = await axios.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&with_genres=${genreData[0]}&language=en-US&region=US`
			);

			const sameGenreData = sameGenre.data.results;

			setRecommendations(
				isMobile ? sameGenreData.slice(0, 18) : sameGenreData.slice(0, 20)
			);
		} else {
			setRecommendations(
				isMobile ? recommData.slice(0, 18) : recommData.slice(0, 20)
			);
		}
	};

	// Some objects have 'name' properties some have 'titles' instead
	const mediaTitle = currentSelection.title;
	const mediaName = currentSelection.name;

	const closeDescriptionOverlay = () => {
		setDescriptionIsClicked(false);
	};

	useEffect(() => {
		getMovieGenresAndRecommendations();
	}, [currentSelection]);

	return (
		<>
			{descriptionIsClicked ? (
				<DescriptionOverlay
					description={currentSelection.overview}
					closeDescriptionOverlay={closeDescriptionOverlay}
				/>
			) : null}
			<PageContainer>
				<ImageContainer>
					<BackButton>
						<Link to={currentPage === 'home' ? '/' : '/search'}>
							<MdArrowBackIosNew />
						</Link>
					</BackButton>
					<MovieTitleContainer
						className={`
				${
					(mediaName && mediaName.length > 25) ||
					(mediaTitle && mediaTitle.length > 25)
						? 'top-56'
						: 'top-64'
				}`}
					>
						<MovieTitle>{mediaName || mediaTitle}</MovieTitle>
					</MovieTitleContainer>
					<ImageOverlay />
					<MovieHeroImage
						src={`https://image.tmdb.org/t/p/original/${currentSelection.backdrop_path}`}
						alt={currentSelection.name}
					/>
				</ImageContainer>

				<MovieOverviewContainer>
					<MovieOverview onClick={() => setDescriptionIsClicked(true)}>
						{currentSelection.overview}
					</MovieOverview>
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
				</RecommendationContainer>
				<Footer />
			</PageContainer>
		</>
	);
};

export default DescriptionPage;
