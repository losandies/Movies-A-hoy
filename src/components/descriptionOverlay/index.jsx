import React from 'react';
import tw from 'twin.macro';
import { PageContainer } from '../globalComponents';
import styled from 'styled-components';

const Overlay = styled.div`
	${tw`absolute w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-30`}
`;

const DescriptionContainer = styled.div`
	${tw`w-[90%] p-6 bg-[#282C34] rounded-sm`}
`;

const DescriptionText = styled.p`
	${tw`text-white text-base`}
`;

const DescriptionOverlay = ({ description, closeDescriptionOverlay }) => {
	return (
		<Overlay onClick={closeDescriptionOverlay}>
			<DescriptionContainer>
				<DescriptionText>{description}</DescriptionText>
			</DescriptionContainer>
		</Overlay>
	);
};

export default DescriptionOverlay;
