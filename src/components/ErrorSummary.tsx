import React from 'react'
import { useFormikContext } from 'formik';
import styled from 'styled-components';

const Wrap = styled.div` &&& {
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
	font-weight: 500;
	color: red;
	line-height: 2em;
	margin-top: 2em;
	text-align: center;
}`;

export const ErrorSummary = () => {
	const { errors } = useFormikContext();
	if ( !errors ) {
		return null;
	}
	return (
		<Wrap>
			{getMessages(errors).map((msg, index) => <div key={index}>{msg}</div>)}
		</Wrap>
	);
}

interface ErrorObject {
	[x: string]: any;
}

const getMessages = ( errors: null|undefined|ErrorObject|(ErrorObject|string)[] ): string[] => {
	// Convert errors into array
	if (!errors) return [];
	const errorsArray = !Array.isArray(errors) ? Object.values<ErrorObject>(errors) : errors;
	// We now have the values array! parse.
	return errorsArray.flatMap((error:string|ErrorObject) => {
		if (typeof error === 'string') {
			return error;
		} else if (typeof error === "object" || Array.isArray(error)) { // might be a redundant check...
			return getMessages(error);
		} else {
			return "Unidentified error";
		}
	});

}
