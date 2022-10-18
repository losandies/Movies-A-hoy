import tw from 'twin.macro';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { Autoplay, Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../contexts/moviesContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../../App.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../responsive/screens';

const CarouselContainer = styled.div`
	${tw`w-full min-h-[16rem] md:min-h-[30rem] lg:min-h-[45rem] mb-[25px]`}
`;
const StyledSwiper = styled(Swiper)`
	${tw`w-[95%] h-full rounded-md`}
`;
const MovieImage = styled.img`
	object-fit: cover;
	${tw`w-full h-full absolute`}
`;
const ImageOverlay = styled.div`
	background: linear-gradient(rgba(0, 130, 170, 0), #000000);
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;
const MovieTitleContainer = styled.div`
	${tw`absolute bottom-1 z-10 w-full p-4`}
`;
const MovieTitle = styled.h2`
	${tw`text-white text-xl font-semibold`}
`;
const NowPlayingText = styled.h3`
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4`}
`;
const NowPlayingContainer = styled.div`
	${tw`w-full h-10 mb-4 md:p-4`}
`;

export default function MovieCarousel({ movies }) {
	const { setCurrentSelection } = useContext(MoviesContext);

	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	const navigate = useNavigate();

	return (
		<>
			<NowPlayingContainer>
				<NowPlayingText>In Theatres Now</NowPlayingText>
			</NowPlayingContainer>
			<CarouselContainer>
				<StyledSwiper
					slidesPerView={isMobile ? 1 : 3}
					spaceBetween={20}
					loop={true}
					navigation={true}
					autoplay={{
						delay: 3000,
						pauseOnMouseEnter: true,
						disableOnInteraction: false,
					}}
					modules={[Navigation, Autoplay]}
					className="mySwiper"
				>
					{movies.map((movie) => (
						<SwiperSlide
							className="cursor-pointer"
							key={movie.id}
							onClick={() => {
								setCurrentSelection(movie);
								navigate(
									`/${movie.media_type ? movie.media_type : 'media'}/${
										movie.id
									}`
								);
							}}
						>
							<ImageOverlay className={isMobile ? null : 'hidden'} />
							<MovieTitleContainer className={isMobile ? null : 'hidden'}>
								<MovieTitle>{movie.title}</MovieTitle>
							</MovieTitleContainer>

							<MovieImage
								src={`https://image.tmdb.org/t/p/original/${
									isMobile ? movie.backdrop_path : movie.poster_path
								}`}
								alt="movie-img"
							/>
						</SwiperSlide>
					))}
				</StyledSwiper>
			</CarouselContainer>
		</>
	);
}
