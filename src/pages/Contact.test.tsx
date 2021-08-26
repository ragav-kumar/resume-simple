import React from "react";
import renderer from 'react-test-renderer';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Contact, ContactFormState } from "./Contact";
import userEvent from "@testing-library/user-event";
import { apiFetch } from "../utils/apiFetch.mock";
import { mocked } from "ts-jest/utils";
import clearAllMocks = jest.clearAllMocks;

const labelNames: { [key in keyof ContactFormState]: RegExp } = {
	name: /Name/i,
	phone: /Phone/i,
	message: /Message/i,
	email: /E-mail/i, // Added a hyphen to distinguish the honeypot...
	xQCDEmailCaravan: /Email/i,
}

const okayData: ContactFormState = {
	name: "Joe Bloggs",
	email: "",
	phone: "123 456 7890",
	message: "Hello World",
	xQCDEmailCaravan: "joe@bloggs.com",
} as const;
const validationFailData: ContactFormState = {
	name: "",
	email: "",
	phone: "",
	message: "",
	xQCDEmailCaravan: "",
} as const;
const honeypotData: ContactFormState = {
	name: "Joe Bloggs",
	email: "joe@bloggs.com",
	phone: "123 456 7890",
	message: "Hello World",
	xQCDEmailCaravan: "joe@bloggs.com",
} as const;

const enterDataThenSubmit = ( data: ContactFormState ) => act(() => {
	for ( const dataKey in data ) {
		if ( data.hasOwnProperty(dataKey) ) {
			const key = dataKey as keyof ContactFormState;
			const dataValue = data[key];
			const label = labelNames[key]
			userEvent.paste(screen.getByLabelText(label), dataValue);
		}
	}
	userEvent.click(screen.getByRole('button', { name: /submit/i }));
});

jest.mock("../utils/apiFetch.mock", () => ({
	apiFetch: jest.fn(() => Promise.resolve(true))
}));

// Pull the snapshot check outside the describe to allow simple setup and teardown
it('should render correctly', () => {
	const tree = renderer
		.create(<Contact/>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

describe('<Contact />', () => {

	beforeEach(() => {
		render(<Contact/>);
	});
	// afterEach(clearAllMocks);

	it('should trigger validation on incomplete input', async () => {
		enterDataThenSubmit(validationFailData);
		// Since we're expecting validation errors, we use waitFor so they'll arrive eventually
		await waitFor(() => {
			expect(screen.getAllByText(/Please enter your name/i)).toHaveLength(1);
			expect(screen.getAllByText(/Please enter a message/i)).toHaveLength(1);
			expect(screen.getAllByText(/Please enter your email address/i)).toHaveLength(1);
		});
	});

	it('should pass in all field values on submit', async () => {
		enterDataThenSubmit(okayData);
		await waitFor(() => {
			expect(mocked(apiFetch)).toBeCalledWith("contact", {
				...okayData,
				email: okayData.xQCDEmailCaravan,
			});
		});
	});

	it('should show success message on successful submit', async () => {
		enterDataThenSubmit(okayData);
		await waitFor(() => {
			expect(screen.getAllByText(/Thank you for your interest! I'll get back to you ASAP\./i)).toHaveLength(1);
		});
	});

	it('should not submit if honeypot set', async () => {
		enterDataThenSubmit(honeypotData);
		await waitFor(() => {
			expect(mocked(apiFetch)).toBeCalledTimes(0);
		})
	});

	it('should show failure message on failed submit', async () => {
		mocked(apiFetch).mockReturnValue(Promise.resolve(false));
		enterDataThenSubmit(okayData);
		await waitFor(() => {
			expect(screen.getAllByText(/An error occurred/i)).toHaveLength(1);
		});
	});
});

