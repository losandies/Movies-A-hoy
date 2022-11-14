import styled from 'styled-components';
import tw from 'twin.macro';

export const CarouselContainer = styled.div`
	${tw`w-full min-h-[16rem] md:min-h-[30rem] xl:min-h-[35rem] 2xl:min-h-[45rem] mb-[25px]`}
`;

export const MovieImage = styled.img`
	object-fit: cover;
	${tw`w-full h-full absolute`}
`;
export const ImageOverlay = styled.div`
	background: linear-gradient(rgba(0, 130, 170, 0), #000000);
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;
export const MovieTitleContainer = styled.div`
	${tw`absolute bottom-1 z-10 w-full p-4`}
`;
export const MovieTitle = styled.h2`
	${tw`text-white text-xl font-semibold`}
`;
export const NowPlayingText = styled.h3`
	${tw`text-base md:text-2xl text-white font-bold uppercase mx-4`}
`;
export const NowPlayingContainer = styled.div`
	${tw`w-full h-10 mb-4 md:mb-8 md:ml-2 md:p-4`}
`;
