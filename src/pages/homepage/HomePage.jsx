import React, { useEffect, useState, useContext } from 'react';
import { NavBar } from '../../components/navbar';
import MovieCarousel from '../../components/movieCarousel';
import MovieSection from '../../components/movieSection';
import { MoviesContext } from '../../contexts/moviesContext';
import axios from 'axios';
import { PageContainer } from '../../components/globalComponents';

export default function HomePage() {
	const { movieData } = useContext(MoviesContext);

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
