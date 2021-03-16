import React from 'react'
import styled from "styled-components";

export const electricBlue = "#59bef6" as const;

export const ContentWrap = styled.div`
	font-size: 24px;
	backdrop-filter: blur(2px);
	overflow-y: auto;
	margin-bottom: 20px;
	margin-right: 20px;
`;
export const MinorHeading = styled.h4`

`;
const Ul = styled.ul``;
const Li = styled.li`
	margin: 5px 0;
`;
interface BulletListProps {
	items: (JSX.Element|string)[];
}
export const BulletList = ({ items }:BulletListProps) => (
	<Ul>
		{items.map<JSX.Element>((item, index) => (
			<Li key={index}>{item}</Li>
		))}
	</Ul>
);