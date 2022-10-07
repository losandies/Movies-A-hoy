import * as React from 'react';
import { useContext, useState } from 'react';
import { MoviesContext } from '../../contexts/moviesContext';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link, useLocation } from 'wouter';
import { MovieRow } from '../globalComponents';
import { MoviePoster } from '../globalComponents';

const SectionContainer = styled.div`
	${tw`mt-8`}
`;

const SectionTitle = styled.h2`
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4 md:mx-8`}
`;

export default function MovieSection({ movies, sectionTitle }) {
	// const [currentMovie, setCurrentMovie] = useState({});

	const { getCurrentMovie, currentMovie } = useContext(MoviesContext);
	const [location, setLocation] = useLocation();

	const redirectToInfoPage = async (movie) => {
		await getCurrentMovie(movie);
		console.log(currentMovie);
		setLocation(
			`/${movie.media_type ? movie.media_type : 'media'}/${movie.id}`
		);
	};

	return (
		<SectionContainer>
			<SectionTitle onClick={() => console.log(currentMovie)}>
				{sectionTitle}
			</SectionTitle>
			<MovieRow>
				{movies.map((movie) => (
					<MoviePoster
						key={movie.id}
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={movie.title}
						onClick={() => redirectToInfoPage(movie)}
					/>
				))}
			</MovieRow>
		</SectionContainer>
	);
}
