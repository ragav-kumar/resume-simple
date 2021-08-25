import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';
import styled from "styled-components";
import { Honeypot } from "../components/Honeypot";
import { Input, Textarea } from "../components/Input";
import { ContactRequest, ContactResponse } from "../utils/types";
import { apiFetch } from "../utils/apiFetch.mock";
import { ErrorSummary } from "../components/ErrorSummary";

// Using hashed
interface ContactFormState {
	// Honeypot name
	name: string;
	phone: string;
	// Honeypot email
	email: string;
	message: string;
	// Actual email
	xQCDEmailCaravan: string;
}

const initialValues: ContactFormState = {
	name: "",
	phone: "",
	email: "",
	xQCDEmailCaravan: "",
	message: "",
} as const;

const schema = Yup.object<ContactFormState>({
	name: Yup.string().required("Please enter your name."),
	email: Yup.string(),
	message: Yup.string().required("Please enter a message."),
	phone: Yup.string(),
	xQCDEmailCaravan: Yup.string().email("Please enter a valid e-mail address.")
		.required("Please enter your email address."),
});

/**
 * Contact form page!
 */
export const Contact = () => {
	const [ submitOk, setSubmitOk ] = useState<boolean | null>(null);
	return (
		<Formik<ContactFormState>
			initialValues={initialValues}
			onSubmit={async ( values, form ) => {
				// check honeypot. Ignore if honeypot set.
				if ( values.email ) {
					// Honeypot value is not set, do submission
					const request: ContactRequest = {
						...values,
						email: values.xQCDEmailCaravan,
					}
					const response = await apiFetch<ContactRequest, ContactResponse>("contact", request);
					setSubmitOk(response);
				}
				form.setSubmitting(false);
			}}
			validationSchema={schema}
		>
			{() => (
				<StyledForm>
					<Blurb>
						Thanks for your interest! Please fill out the form below to get in touch with me. You can also
						find my contact information in the downloadable PDF of my resume.
					</Blurb>
					<LabelledField label="Name">
						<Input name="name"/>
					</LabelledField>
					<LabelledField label="Phone">
						<Input name="phone"/>
					</LabelledField>
					<LabelledField label="Email">
						<Input name="xQCDEmailCaravan"/>
					</LabelledField>
					<LabelledField label="Message">
						<Textarea name="message"/>
					</LabelledField>
					<Honeypot name="email"/>
					{submitOk !== null ? (
						<SubmitMessage okay={submitOk}>
							{submitOk ?
							 "Thank you for your interest! I'll get back to you ASAP." :
							 "An error occurred while attempting to submit your message. Please refresh the page and try again."}
						</SubmitMessage>
					) : null}
					<ErrorSummary/>
					<Submit>Submit</Submit>
				</StyledForm>
			)}
		</Formik>
	);
}
const StyledForm = styled(Form)`
	max-width: 768px;
	margin: 0 auto;
`;
const Blurb = styled.p`
	font-size: 20px;
	line-height: 2;
	margin: 1em 0;
`;

const Label = styled.label`
	display: grid;
	grid-template-columns: 1fr 3fr;
`;
const LabelText = styled.div`
	font-size: 24px;
`;
const SubmitMessage = styled.div<{ okay: boolean }>`
	text-align: center;
	color: ${p => p.okay ? "green" : "red"};
`;
const Submit = styled.button`
	background-color: transparent;
	border: 1px solid black;
	padding: .3em 1em;
	font-size: 24px;
	border-radius: 10px;
	margin: 0 auto;
	display: block;
`;

interface LabelledFieldProps {
	label: string;
	children?: React.ReactNode;
}

const LabelledField = ( { label, children }: LabelledFieldProps ) => (
	<Label>
		<LabelText>{label}</LabelText>
		{children}
	</Label>
)
