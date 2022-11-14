import React, { useContext } from 'react';
import { Autoplay, Navigation } from 'swiper';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../contexts/moviesContext';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../../App.css';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../responsive/screens';
import {
	CarouselContainer,
	ImageOverlay,
	MovieImage,
	MovieTitle,
	MovieTitleContainer,
	NowPlayingContainer,
	NowPlayingText,
} from './carouselStyles';

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
				<Swiper
					slidesPerView={isMobile ? 1 : 3}
					spaceBetween={20}
					loop={true}
					navigation={true}
					autoplay={{
						delay: 4000,
						pauseOnMouseEnter: true,
						disableOnInteraction: false,
					}}
					modules={[Navigation, Autoplay]}
					className="mySwiper w-[95%] h-full rounded-md"
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
				</Swiper>
			</CarouselContainer>
		</>
	);
}
