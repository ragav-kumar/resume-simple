import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { sections } from '../utils/db';
import { Competency, Education, History, Profile } from "../pages";
import styled from "styled-components";

export const Content = () => {
	// For the menu, Profile goes on top. In here, it needs to be at the bottom because of react-router
	return (
		<Wrap>
			<Switch>
				{sections.slice(1).map<JSX.Element>(( { path } ) => (
					<Route path={path}>
						{mapContent(path)}
					</Route>
				))}
				<Route path={sections[0].path}>{mapContent(sections[0].path)}</Route>
			</Switch>
		</Wrap>
	);
}

const mapContent = ( path: string ): JSX.Element => {
	switch ( path ) {
		case "/competencies":
			return <Competency/>;
		case "/education":
			return <Education/>;
		case "/experience":
			return <History/>;
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