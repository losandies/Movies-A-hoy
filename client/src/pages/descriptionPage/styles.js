import styled from 'styled-components';
import tw from 'twin.macro';
import { MovieRow } from '../../components/globalComponents';

export const MovieHeroImage = styled.img`
	object-fit: cover;
	object-position: 50% 50%;

	${tw`w-full h-[320px] md:h-[500px]`}
`;
export const ImageContainer = styled.div`
	${tw`w-full h-[320px] md:h-[500px] relative`}
`;

export const ImageOverlay = styled.div`
	background: linear-gradient(rgba(0, 130, 170, 0), #000000);

	${tw`absolute top-0 w-full h-[320px] md:h-[500px]`}
`;

export const MovieTitleContainer = styled.div`
	${tw`absolute md:top-[430px] flex justify-between items-center z-10 w-[80%] p-4`}
`;

export const MovieTitle = styled.h2`
	${tw`text-white text-2xl font-semibold`}
`;

export const LikeIcon = styled.span`
	${tw`text-3xl text-white`}
`;

export const MovieOverviewContainer = styled.div`
	${tw`w-full h-auto flex p-4`}
`;

export const MovieOverview = styled.p`
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;

	${tw`text-white text-base mt-1`}
`;

export const GenreContainer = styled.div`
	${tw`flex w-full flex-wrap items-center justify-start`}
`;

export const GenreBlock = styled.div`
	${tw`h-8 ml-4 mb-4 p-2 bg-[#ffffff] rounded-md flex justify-center items-center`}
`;

export const GenreText = styled.p`
	${tw`text-sm font-bold text-gray-900`}
`;

export const RecommendationContainer = styled(MovieRow)`
	/* ${tw`w-full flex-wrap overflow-visible justify-around p-0`} */
	${tw`w-full flex flex-wrap justify-around sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 overflow-visible sm:content-center p-0 sm:ml-6`}
`;
export const RecommendationTitle = styled.h3`
	${tw`text-xl text-white self-start font-bold ml-4 mt-5 mb-2`}
`;
