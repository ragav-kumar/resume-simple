import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled, { css } from 'styled-components';
import { faEnvelope, faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

export const Header = () => {
	const pdfHandler = ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
		event.preventDefault();
		window.open(process.env.REACT_APP_API_URL! + "/resume.pdf");
	}
	return (
		<Wrap>
			<Name>Ragav Kumar</Name>
			<Title>Full Stack Developer</Title>
			<IconWrap>
				<StyledLink to="/pdf" target="_blank" onClick={pdfHandler}><FontAwesomeIcon
					icon={faFilePdf}/></StyledLink>
				<StyledLink to="/contact"><FontAwesomeIcon icon={faEnvelope}/></StyledLink>
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
	width: 80%;
	justify-content: space-evenly;
`;

const Wrap = styled.div`
	grid-area: header;
	font-size: 44px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-shadow: 2px 2px 2px #0000007F;
	margin-bottom: 1em;
	max-width: 10em;
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
