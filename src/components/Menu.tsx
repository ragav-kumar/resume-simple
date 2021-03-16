import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { sections } from "../utils/db";
import { Header } from "./Header";
import { Mugshot } from "./Mugshot";

export const Menu = () => {
	let { pathname } = useLocation();
	// Correction from PUBLIC_URL
	if (pathname === '/build') pathname = '/';
	return (
		<Wrap>
			<Header/>
			<MenuWrap>
				{sections.map<JSX.Element>(( { menuLabel, path }, index ) => (
					<MenuItem
						key={index}
						active={path === pathname}
					>
						<Link to={path}>{menuLabel}</Link>
					</MenuItem>
				))}
			</MenuWrap>
			<Mugshot pose="pointing" width="200px" />
		</Wrap>
	);
}
const Wrap = styled.div`
	display: grid;
	grid-template-rows: auto 1fr 1fr;
	height: 100%;
	align-items: center;
	justify-items: center;
	font-size: 40px;
	padding: 0;
	position: relative;
	margin-left: 5vw;
`;
const MenuWrap = styled.ul`
	list-style-type: none;
`;
const MenuItem = styled.li<{ active: boolean }>`
	font-weight: ${p => p.active ? "bold" : "normal"};
	cursor: pointer;
	width: 100%;
	font-size: 1em;
	padding: 10px 0;
	backdrop-filter: blur(1px);
`