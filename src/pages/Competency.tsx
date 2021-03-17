import React, { useContext } from 'react';
import { ContentWrap} from './pageStyles';
import { DbContext } from "../utils/db";
import styled from "styled-components";
import { CompetencyItem } from "../utils/types";
import { Tabs } from "../components/Tabs";


export const Competency = () => {
	const { competencies } = useContext(DbContext);
	return (
		<ContentWrap>
			<Tabs tabs={competencies.map(({name, items}) => ({
				label: name,
				content: items.map<JSX.Element>(item => <CompetencyBullet item={item} />)
			}))} />
		</ContentWrap>
	);
}

// We want a hanging indent!
const ItemWrap = styled.div`
	margin: 1em;
	padding-left: 2em;
	text-indent: -2em;
`;
const Label = styled.span`
	font-weight: bold;
`;
const Text = styled.span``;

interface CompetencyBulletProps {
	item: CompetencyItem;
}
const CompetencyBullet = ( { item:{ label, text } }:CompetencyBulletProps) => (
	<ItemWrap>
		<Label>{label}: </Label>
		<Text>{text}</Text>
	</ItemWrap>
);
