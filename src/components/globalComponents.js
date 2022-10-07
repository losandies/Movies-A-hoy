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

export const BackButton = styled.span`
	${tw`absolute z-20 text-white text-2xl p-4`}

	&:hover {
		transform: scale(1.2);
	}
`;
