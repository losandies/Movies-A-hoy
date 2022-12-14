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
	${tw`flex overflow-x-auto p-2 md:px-4`}

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const MoviePoster = styled.img`
	${tw`m-2 md:m-2 md:my-4 w-28 sm:w-40 sm:m-4 rounded-sm cursor-pointer`}

	@media (min-width: 500px) {
		&:hover {
			transition: ease-in-out 150ms;
			transform: scale(1.15);
		}
	}
`;

export const BackButton = styled.span`
	${tw`absolute z-20 flex items-center text-white text-3xl p-2 mt-2`}

	&:hover {
		transform: scale(1.2);
	}
`;
