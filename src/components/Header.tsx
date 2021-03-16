import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled, { css } from 'styled-components';
import { faEnvelope, faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<Wrap>
			<Name>Ragav Kumar</Name>
			<Title>Full Stack Developer</Title>
			<IconWrap>
				<StyledLink to="/pdf"><FontAwesomeIcon icon={faFilePdf} /></StyledLink>
				<StyledLink to="/contact"><FontAwesomeIcon icon={faEnvelope} /></StyledLink>
			</IconWrap>
		</Wrap>
	);
}
const StyledLink = styled(Link)`
	text-align: center;
	flex: 1;
	background-color: #0001;
	border: 1px solid #999;
`;

const IconWrap = styled.div`
	display: flex;
	align-items: center;
	font-size: 30px;
	margin-top: 1em;
	justify-content: space-evenly;
`;

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
