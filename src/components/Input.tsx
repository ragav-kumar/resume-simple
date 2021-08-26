import React from "react";
import { useField, useFormikContext } from "formik";
import styled, { css } from "styled-components";

interface BaseInputProps {
	name: string;
	// Typescript complains when matching the ref types
	ref?: any;
}

type InputProps = BaseInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextareaProps = BaseInputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

/**
 * Formik Text input field
 */
export const Input = ( props: InputProps ) => {
	const { submitCount } = useFormikContext<{ [field: string]: string; }>();
	const [ field, { error, touched } ] = useField<string>(props);
	const isError = !!error && touched && submitCount > 0;

	return (
		<StyledInput
			{...field}
			{...props}
			isError={isError}
			data-testid={props.name}
		/>
	);
}

export const Textarea = ( props: TextareaProps ) => {
	const { submitCount } = useFormikContext<{ [field: string]: string; }>();
	const [ field, { error, touched } ] = useField<string>(props);
	const isError = !!error && touched && submitCount > 0;

	return (
		<StyledTextarea
			{...field}
			{...props}
			isError={isError}
			data-testid={props.name}
		/>
	);
}

interface StyledInputProps {
	isError: boolean;
}

const inputCss = ( { isError }:StyledInputProps) => css`
	border-color: ${isError ? "red" : "#767676"};
	font-size: 20px;
	padding: .2em;
	margin: .2em 0;
	border-style: solid;
	border-width: 1px;
	box-shadow: none;
`;

const StyledInput = styled.input<StyledInputProps>`
	${inputCss};
`;

const StyledTextarea = styled.textarea<StyledInputProps>`
	${inputCss};
	height: 4em;
	resize: vertical;
`;
