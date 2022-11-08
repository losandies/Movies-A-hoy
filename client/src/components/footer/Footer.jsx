import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

const FooterContainer = styled.div`
	${tw`flex justify-center items-center relative bottom-0 w-full h-[60px] bg-gray-700`}
`;

const SocialsList = styled.ul`
	${tw`flex justify-between items-center list-none h-[50px] w-[300px] max-w-[300px] md:w-[500px] md:max-w-[500px]`}
`;

const SocialLink = styled.a`
	${tw`text-white hover:text-gray-400 text-2xl`}
`;

const Footer = () => {
	return (
		<FooterContainer>
			<SocialsList>
				<SocialLink
					href="https://github.com/losandies"
					target="_blank"
					rel="noreferrer"
				>
					<BsGithub />
				</SocialLink>
				<SocialLink
					href="https://www.linkedin.com/in/brandon-newsome-58806a1a2/"
					target="_blank"
					rel="noreferrer"
				>
					<BsLinkedin />
				</SocialLink>
				<SocialLink
					href="https://twitter.com/307px"
					target="_blank"
					rel="noreferrer"
				>
					<BsTwitter />
				</SocialLink>
			</SocialsList>
		</FooterContainer>
	);
};

export default Footer;
