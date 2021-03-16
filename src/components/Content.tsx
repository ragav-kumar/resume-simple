import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { sections } from '../utils/db';
import { Competency, Contact, Education, History, Profile } from "../pages";
import styled from "styled-components";
import { routes } from "../utils/types";

export const Content = () => {
	const menuList = sections.slice(1).map<string>(( { path } ) => path);
	// For the menu, Profile goes on top. In here, it needs to be at the bottom because of react-router
	// PDF and contact are not defined in sections because of reasons.
	const notInList = [
		routes.contact,
		routes.pdf,
		sections[0].path,
	];
	return (
		<Wrap>
			<Switch>
				{[ ...menuList, ...notInList ].map<JSX.Element>(( path, index ) => (
					<Route key={index} path={path}>
						{mapContent(path)}
					</Route>
				))}
			</Switch>
		</Wrap>
	);
}

const mapContent = ( path: string ): JSX.Element => {
	switch ( path ) {
		case routes.competency:
			return <Competency/>;
		case routes.education:
			return <Education/>;
		case routes.history:
			return <History/>;
		case routes.contact:
			return <Contact/>;
		default:
			return <Profile/>;
	}
}
const Wrap = styled.div`
	height: 100%;
	align-self: flex-start;
	padding: 10vh 0;
	overflow-y: auto;
	margin: 0 1vw;
`;
