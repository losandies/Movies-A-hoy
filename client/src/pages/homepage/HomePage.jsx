import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { NavBar } from '../../components/navbar/Navbar';
import MovieCarousel from './MovieCarousel';
import MovieSection from '../../components/MovieSection';
import { MoviesContext } from '../../contexts/moviesContext';
import { PageContainer } from '../../components/globalComponents';
import { UserContext } from '../../contexts/userContext';

export default function HomePage() {
	const { user } = useContext(UserContext);
	const { setCurrentPage } = useContext(MoviesContext);

	const userFirstName = user.name.split(' ')[0];

	const [movieData, setMovieData] = useState({
		suggestedMovies: [],
		nowPlayingMovies: [],
		forYouMovies: [],
		popularMovies: [],
		topRatedMovies: [],
		upcomingMovies: [],
		trending: [],
		originals: [],
	});

	const fetchMovieData = async () => {
		const suggestedForYou = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&with_genres=${user.favorite_genre}&language=en-US&primary_release_date.gte=2005&primary_release_date.lte=2022-11-01&region=US`
		);
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
			suggestedMovies: suggestedForYou.data.results,
			nowPlayingMovies: nowPlaying.data.results,
			popularMovies: popular.data.results,
			topRatedMovies: topRated.data.results,
			upcomingMovies: upcoming.data.results,
			trending: trending.data.results,
			originals: originals.data.results,
		});
	};

	useEffect(() => {
		fetchMovieData();
		setCurrentPage('home');
	}, []);

	return (
		<>
			<PageContainer>
				<NavBar />
				<MovieCarousel movies={movieData.nowPlayingMovies} />
				<MovieSection
					movies={movieData.suggestedMovies}
					sectionTitle={`Suggested for ${userFirstName}`}
				></MovieSection>
				<MovieSection
					movies={movieData.trending}
					sectionTitle="Trending This Week"
				/>
				<MovieSection
					movies={movieData.upcomingMovies}
					sectionTitle="Upcoming Releases"
				/>
				<MovieSection
					movies={movieData.originals}
					sectionTitle="Original TV Shows"
				/>
				<MovieSection
					movies={movieData.popularMovies}
					sectionTitle="Popular Movies"
				/>
				<MovieSection
					movies={movieData.topRatedMovies}
					sectionTitle="Top Rated Movies"
				/>
			</PageContainer>
		</>
	);
}
