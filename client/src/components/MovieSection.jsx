import * as React from 'react';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContext';
import styled from 'styled-components';
import tw from 'twin.macro';
import { MoviePoster, MovieRow } from './globalComponents';
import { useNavigate } from 'react-router-dom';

const SectionContainer = styled.div`
	${tw`mt-4 md:mt-8 md:mx-2 h-60 md:h-auto`}
`;

const SectionTitle = styled.h2`
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4 md:mx-8`}
`;

export default function MovieSection({ movies, sectionTitle }) {
	const { setCurrentSelection } = useContext(MoviesContext);
	const navigate = useNavigate();

	return (
		<SectionContainer>
			<SectionTitle>{sectionTitle}</SectionTitle>
			<MovieRow>
				{movies.map((movie) => (
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
			</MovieRow>
		</SectionContainer>
	);
}
