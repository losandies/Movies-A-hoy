import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { slide as Menu } from 'react-burger-menu';
import { SCREENS } from '../../responsive/screens';
import menuStyles from './menuStyles';
import { Link } from 'react-router-dom';

const ListContainer = styled.ul`
	${tw`
        flex
        list-none
    `}
`;

const NavItem = styled.li`
	${tw`
        text-xs
        md:text-base
        text-black
        font-medium
        mr-1
        md:mr-5
        cursor-pointer
        transition
        duration-300
        ease-in-out
        hover:text-gray-700
		
        `}

	${({ menu }) =>
		menu &&
		css`
			${tw`
        text-white
        text-xl
        mb-3
        focus:text-white`})
		`}
`;

export function NavItems() {
	const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

	if (isMobile)
		return (
			<Menu styles={menuStyles}>
				<ListContainer>
					<NavItem menu>
						<Link to="/">Home</Link>
					</NavItem>
					<NavItem menu>
						<Link to="/search">Search</Link>
					</NavItem>
					<NavItem menu>
						<Link to="#">Services</Link>
					</NavItem>
					<NavItem menu>
						<Link to="#">Contact Us</Link>
					</NavItem>
				</ListContainer>
			</Menu>
		);

	return (
		<ListContainer>
			<NavItem>
				<Link to="/">Home</Link>
			</NavItem>
			<NavItem>
				<Link to="/search">Search</Link>
			</NavItem>
			<NavItem>
				<Link to="#">Services</Link>
			</NavItem>
			<NavItem>
				<Link to="#">Contact Us</Link>
			</NavItem>
		</ListContainer>
	);
}
