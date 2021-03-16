import React, { useContext } from 'react'
import styled from 'styled-components';
import { ContentWrap } from './pageStyles';
import { DbContext } from "../utils/db";
import { Experience } from "../utils/types";

export const History = () => {
	const { experience } = useContext(DbContext);
	return (
		<ContentWrap>
			{experience.map(item => <HistoryItem {...item} />)}
		</ContentWrap>
	);
}

type HistoryItemProps = Experience;

const ItemWrap = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	column-gap: 1em;
	padding: 1em 1em 0;
`;
const Title = styled.span`
	font-weight: bold;
`;
const HistoryItem = ( { employer, location, title, ...dateProps }: HistoryItemProps ) =>
	(
		<ItemWrap>
			<Title>{title}</Title>
			<span>{dateString(dateProps)}</span>
			<span>{employer}, {location}</span>
		</ItemWrap>
	);

interface DateProps {
	start: string;
	end: string|null;
	dateOverride: string|null;
}
/**
 * Parse date inputs and arrange in the desire style
 * Requirements:
 * 	- format: Mon, year (unless overridden)
 * 	- if end is null, print "present" as end date
 * 	- if invalid, print nothing
 */
const dateString = ( { start, end, dateOverride }:DateProps):string => {
	if (dateOverride !== null) return dateOverride;
	const options:Intl.DateTimeFormatOptions = {
		month: 'short',
		year: 'numeric',
	}

	try {
		const startDate = (new Date(start)).toLocaleString('en-CA', options);
		const endDate = end === null ? "present" : (new Date(end)).toLocaleString('en-CA', options);
		return `${startDate} - ${endDate}`;
	} catch ( e ) {
		console.log(e);
		return "";
	}
}