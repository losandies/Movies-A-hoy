import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { NavItems } from './navItems';

const NavContainer = styled.div`
	min-height: 68px;
	${tw`
        w-full
        max-w-screen-2xl
        flex
        flex-row
        items-center
        lg:pl-12
        lg:pr-12
        justify-between
    `}
`;

const LogoContainer = styled.div`
	${tw`flex items-center ml-3 md:mx-8`};
`;

const LogoLettering = styled.h3`
	font-family: 'Poppins';
	${tw`text-lg md:text-3xl font-semibold tracking-tighter text-white`};
`;

export function NavBar() {
	return (
		<NavContainer>
			<LogoContainer>
				<LogoLettering>Hello</LogoLettering>
			</LogoContainer>
			<NavItems />
		</NavContainer>
	);
}
