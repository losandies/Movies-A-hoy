import tw from 'twin.macro';
import styled from 'styled-components';

export const PageContainer = styled.div`
	${tw`
		flex
		flex-col
		w-full
		h-full
		overflow-x-hidden
        bg-gray-900
	`}

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const MovieRow = styled.div`
	${tw`flex overflow-x-auto p-2 md:mt-4 md:p-4`}

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const MoviePoster = styled.img`
	${tw`m-2 w-28 md:w-40 md:m-4 rounded-sm cursor-pointer`}
	transition: ease-in-out 150ms;

	&:hover {
		transform: scale(1.15);
	}
`;

export const BackButton = styled.span`
	${tw`absolute z-20 flex items-center text-white text-3xl p-2 mt-2`}

	&:hover {
		transform: scale(1.2);
	}
`;
