import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from "react-router-dom";

import { Menu } from './components/Menu';
import { Content } from './components/Content';
import { blankContext, DbContext, DbContextType } from "./utils/db";
import { apiFetch } from "./utils/apiFetch.mock";
import { ContentRequest, ContentResponse } from "./utils/types";
import { Header } from "./components/Header";

export const App = () => {
	const [ appContent, setAppContent ] = useState<DbContextType>(blankContext);

	useEffect(() => {
		document.body.style.backgroundColor = "#f5f5f5";
	}, []);

	// const [ mugshotWidth, setMugshotWidth ] = useState(100);
	/*const [ cardBackSize, setCardBackSize ] = useState<CardSizeProps>({
		width: 1600,
		height: 900,
		isPortrait: false,
	});*/

	// Controlling the size of the main card layout
	/*const { ref: cardRef } = useDimensions<HTMLDivElement>({
		onResize: ( { width, height } ) => {
			setMugshotWidth(width * .2);
			setCardBackSize({
				width: clamp(300, width, 1600),
				height: clamp(0, height, 900),
				isPortrait: width < height,
			});
		},
	});*/
	// On first run, retrieve appContent data
	useEffect(() => {
		apiFetch<ContentRequest, ContentResponse>("content")
			.then(
				response => setAppContent(response),
				( err: string ) => alert(err)
			);
	}, []);

	/* Wrap fills the entire screen, no problem. However, we want CardBack to be defined as follows:
		- Width: 300px - 1600px, at least 80% of available screen-width
		- Height: 95% of available height, to a max of 900px
	*/
	return (
		<BrowserRouter>
			<DbContext.Provider value={appContent}>
				<GlobalStyle/>
				<Wrap>
					<Header/>
					<Menu/>
					<Content/>
				</Wrap>
			</DbContext.Provider>
		</BrowserRouter>
	);
}

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: "Exo 2", Arial, Helvetica, sans-serif;
		background-color: #f5f5f5;
		height: 100vh;
	}

	#root {
		height: 100%;
	}

	* {
		box-sizing: border-box;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;

const Wrap = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: auto 5em 1fr;
	grid-template-areas:
			"header ."
			"header content"
			"menu content";
	align-items: center;
	justify-content: center;
	height: 100%;
`;


const clamp = ( min: number, value: number, max: number ): number => {
	if ( value < min ) {
		return min;
	} else if ( value > max ) {
		return max;
	}
	return value;
}
