import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../../responsive/screens';
import { HiSearch } from 'react-icons/hi';
import NavItems from '../navbar/NavItems.jsx';

const NavContainer = styled.div`
	min-height: 68px;
	${tw`w-full flex flex-row items-center justify-between mb-[25px]`}
`;
const LogoContainer = styled.div`
	${tw`flex items-center ml-3 md:mx-8`};
`;
const LogoLettering = styled.h3`
	font-family: 'Poppins';
	${tw`text-lg md:text-3xl font-semibold tracking-tighter text-white`};
`;

export function NavBar() {
	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	if (isMobile)
		return (
			<NavContainer>
				<NavItems />
				<LogoContainer>
					<Link to="/">
						<LogoLettering>Movies A'hoy</LogoLettering>
					</Link>
				</LogoContainer>
				<LogoContainer>
					<Link to="/search">
						<HiSearch className="text-2xl font-semibold text-white mr-3" />
					</Link>
				</LogoContainer>
			</NavContainer>
		);

	return (
		<NavContainer>
			<LogoContainer>
				<Link to="/">
					<LogoLettering>Movies A'hoy</LogoLettering>
				</Link>
			</LogoContainer>
			<NavItems />
		</NavContainer>
	);
}
