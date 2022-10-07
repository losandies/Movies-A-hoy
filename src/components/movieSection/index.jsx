import * as React from 'react';
import { useContext, useState } from 'react';
import { MoviesContext } from '../../contexts/moviesContext';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Link, useLocation } from 'wouter';

const SectionContainer = styled.div`
	${tw`mt-8`}
`;

const SectionTitle = styled.h2`
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4 md:mx-8`}
`;

const MovieRow = styled.div`
	${tw`flex overflow-x-auto p-2 md:mt-4 md:p-4`}

	&::-webkit-scrollbar {
		display: none;
	}
`;

const MoviePoster = styled.img`
	${tw`m-2 w-28 md:w-40 rounded-sm cursor-pointer`}
	transition: ease-in-out 150ms;

	&:hover {
		transform: scale(1.15);
	}
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
