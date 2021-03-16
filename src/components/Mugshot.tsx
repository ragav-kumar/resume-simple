import React from 'react'
import styled from 'styled-components';
import pointPic from '../img/ragav-pointing-bw.png';
import readPic from '../img/ragav-reading-bw.png';

interface MugshotProps {
	pose: "pointing"|"reading"
	width: string;
}

export const Mugshot = ( {pose, width }: MugshotProps ) => {
	return (
		<Wrap width={width}>
			<Head src={pose === 'reading' ? readPic : pointPic} alt="Picture of Ragav Kumar" title="Picture of Ragav Kumar" />
		</Wrap>
	)
};

const Wrap = styled.div<{ width: string }>`
	width: ${p => p.width};
	height: auto;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
`;
const Head = styled.img`
	max-width: 100%;
	margin-bottom: -10px;
	opacity: 0.6;
`;