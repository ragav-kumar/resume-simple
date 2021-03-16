import React from 'react'
import styled, { css } from 'styled-components';

export const Header = () => {
	return (
		<Wrap>
			<Name>Ragav Kumar</Name>
			<Title>Full Stack Developer</Title>
		</Wrap>
	);
}

const Wrap = styled.div`
	font-size: 1.1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-shadow: 2px 2px 2px #0000007F;
	margin-bottom: 1em;
	width: 100%;
`
const textStyle = css`
	text-align: center;
	margin: 0;
`;
const Name = styled.p`
	${textStyle};
	margin-bottom: .2em;
`;
const Title = styled.p`
	${textStyle};
	font-size: .8em;
`;