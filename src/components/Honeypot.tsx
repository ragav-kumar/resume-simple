import React from "react";
import styled from "styled-components";
import { useField } from "formik";

interface HoneypotProps {
	name: string;
}

/**
 * Fairly simple form honeypot to filter out the dumber spammers
 */
export const Honeypot = ( { name }: HoneypotProps ) => {
	const [ field ] = useField<string>(name);
	return (
		<Label>
			<input
				{...field}
				autoComplete="off"
				type="text"
				placeholder="Your name here"
			/>
		</Label>
	);
}
const Label = styled.label`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	height: 0;
	width: 0;
	z-index: -1;
`;

