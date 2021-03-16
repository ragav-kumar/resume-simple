import React, { useContext } from 'react'
import styled from 'styled-components';
import { ContentWrap } from './pageStyles';
import { DbContext } from "../utils/db";

export const Education = () => {
	const { education } = useContext(DbContext);
	return (
		<ContentWrap>
			{education.map(( item ) => <LineItem {...item} />)}
		</ContentWrap>
	);
}

interface LineItemProps {
	title: string;
	location: string;
	start: string;
	end: string | null;
	dateOverride: string | null;
}

const ItemWrap = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	padding: 1em;
`;
const Degree = styled.div`
	font-weight: bold;
`;
const Duration = styled.div`
	text-align: right;
`;
const LineItem = ( { title, start, end, location, dateOverride }: LineItemProps ) =>
	(
		<ItemWrap>
			<Degree>{title}</Degree>
			<Duration>{dateString(start, end, dateOverride)}</Duration>
			<div>{location}</div>
		</ItemWrap>
	);

/**
 * Parse date inputs and arrange in the desire style
 * Requirements:
 * 	- year ony (unless overridden)
 * 	- if start == end, then only print once
 * 	- if invalid, print nothing
 */
const dateString = ( start: string, end: string | null, override: string | null ): string => {
	if ( override !== null ) return override;

	try {
		const startDate = (new Date(start)).getFullYear();
		if ( end !== null ) {
			const endDate = (new Date(end)).getFullYear();
			return startDate + (endDate > startDate ? ` - ${endDate}` : "");
		}
		return `${startDate} - present`;
	} catch ( e ) {
		return "";
	}
}