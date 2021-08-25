import React from "react";
import renderer from 'react-test-renderer';
import { Honeypot } from "./Honeypot";

jest.mock('formik', () => ({
	...jest.requireActual<any>('formik'),
	useField: <T extends unknown>( name: string ): [ any, {}, {} ] => [ {
		name,
		value: "dummy",
		onChange: jest.fn,
		onBlur: jest.fn,
		multiple: undefined,
		checked: undefined,
	}, {}, {} ]
}));

describe('<Honeypot /', () => {
	it('should render correctly', () => {
		const tree = renderer
			.create(<Honeypot name="test-honeypot"/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
})


