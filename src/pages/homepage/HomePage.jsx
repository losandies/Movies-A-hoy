import React, { useEffect, useContext } from 'react';
import { NavBar } from '../../components/navbar';
import MovieCarousel from './MovieCarousel';
import MovieSection from '../../components/movieSection';
import { MoviesContext } from '../../contexts/moviesContext';
import { PageContainer } from '../../components/globalComponents';

export default function HomePage() {
	const { movieData, setCurrentPage } = useContext(MoviesContext);

	useEffect(() => {
		setCurrentPage('home');
	});

	return (
		<PageContainer>
			<NavBar />
			<MovieCarousel movies={movieData.nowPlayingMovies} />
			<MovieSection
				movies={movieData.trending}
				sectionTitle="Trending This Week"
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
			<MovieSection
				movies={movieData.upcomingMovies}
				sectionTitle="Upcoming Releases"
			/>
		</PageContainer>
	);
}
