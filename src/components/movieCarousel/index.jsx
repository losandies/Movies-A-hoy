import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import tw from 'twin.macro';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { Autoplay, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../contexts/moviesContext';

const CarouselContainer = styled.div`
	${tw`w-full h-64 min-h-[16rem]`}
`;

const StyledSwiper = styled(Swiper)`
	${tw`w-[95%] h-full rounded-md`}
`;

const StyledSlide = styled(SwiperSlide)`
	${tw`text-center bg-white`}
`;

const MovieImage = styled.img`
	${tw`w-full h-full absolute`}
`;

const MovieTitle = styled.h3`
	font-family: 'Poppins';
	${tw` text-white font-semibold text-lg ml-2`}
`;

const TitleContainer = styled.div`
	${tw`w-full h-12 bg-[#1a1a1a] z-10 flex items-center`}
`;

const RatingContainer = styled.div`
	${tw`w-10 h-10 rounded-full bg-[#1a1a1a] z-10 absolute bottom-5 right-5 flex justify-center items-center`}
`;

const Rating = styled.h3`
	font-family: 'Poppins';
	${tw`text-white font-semibold text-base`}
`;

const NowPlayingText = styled.h3`
	/* font-family: 'Poppins'; */
	/* ${tw`text-2xl text-white font-semibold mx-4`} */
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4`}
`;

const NowPlayingContainer = styled.div`
	${tw`w-full h-10 mb-4 md:p-4`}
`;

// Note
// Change carousel UI, #IDEA - Create gradient overlay light to dark going downward, put movie info in dark area

export default function MovieCarousel({ movies }) {
	const top10Movies = movies.slice(0, 10);
	const { setCurrentMovie } = useContext(MoviesContext);
	const navigate = useNavigate();

	return (
		<>
			<NowPlayingContainer>
				<NowPlayingText>In Theatres Now</NowPlayingText>
			</NowPlayingContainer>
			<CarouselContainer>
				<StyledSwiper
					slidesPerView={1}
					spaceBetween={20}
					loop={true}
					pagination={{
						clickable: true,
						dynamicBullets: true,
					}}
					autoplay={{
						delay: 5500,
						disableOnInteraction: true,
						pauseOnMouseEnter: true,
					}}
					modules={[Pagination, Autoplay]}
					className="mySwiper"
				>
					{top10Movies.map((movie) => (
						<StyledSlide
							key={movie.id}
							onClick={() => {
								setCurrentMovie(movie);
								navigate(
									`/${movie.media_type ? movie.media_type : 'media'}/${
										movie.id
									}`
								);
							}}
						>
							<TitleContainer>
								<MovieTitle>{movie.title}</MovieTitle>
							</TitleContainer>
							<RatingContainer>
								<Rating>
									{Number.isInteger(movie.vote_average)
										? `${movie.vote_average}.0`
										: movie.vote_average}
								</Rating>
							</RatingContainer>
							<MovieImage
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt="movie-img"
							/>
						</StyledSlide>
					))}
				</StyledSwiper>
			</CarouselContainer>
		</>
	);
}
