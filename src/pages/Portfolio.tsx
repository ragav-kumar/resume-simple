import React, { useContext } from "react";
import { DbContext } from "../utils/db";
import { ContentWrap } from "./pageStyles";
import { PortfolioItem } from "../utils/types";
import styled from "styled-components";

export const Portfolio = () => {

	const { portfolio } = useContext(DbContext);

	return (
		<ContentWrap>
			{portfolio.delivered.map(( portfolioData, index ) => <Item key={index} {...portfolioData} />)}
		</ContentWrap>
	);
}
const Item = ( { title, description, url, imgUrl }: PortfolioItem ) => (
	<ItemWrap>
		<Title>{title}</Title>
		<ImageWrap href={url || undefined} target="_blank">
			<Img src={imgUrl}/>
		</ImageWrap>
		<Description>{description}</Description>
	</ItemWrap>
);
const ItemWrap = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-areas:
			"title title"
			"image description";
	align-items: center;
`;
const Img = styled.img`
	max-width: 200px;
	max-height: 200px;
`;
const Title = styled.h2`
	grid-area: title;
`;
const ImageWrap = styled.a`
	grid-area: image;
`;
const Description = styled.p`
	grid-area: description;
`;
