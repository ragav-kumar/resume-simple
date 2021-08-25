import React from "react";
import renderer from 'react-test-renderer';
import { Input } from "./Input";
import { FormikContextType, useField, useFormikContext } from "formik";
import { mocked } from "ts-jest/utils";
import { FormikUseFieldArgType, FormikUseFieldReturnType } from "../utils/testTypes";

jest.mock('formik', () => ({
	...jest.requireActual<any>('formik'),
	useFormikContext: jest.fn(),
	useField: jest.fn()
}));

describe('<Input />', () => {
	it('should render correctly', () => {
		mocked(useFormikContext).mockReturnValue({ submitCount: 0 } as FormikContextType<unknown>);
		mocked(useField).mockImplementation((name:FormikUseFieldArgType) => [{
			name,
			value: "dummy",
		}, {
			error: undefined,
			touched: false,
		}, {}] as FormikUseFieldReturnType);
		const tree = renderer
			.create(<Input name="test-input"/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it ('should change style on error', () => {
		mocked(useFormikContext).mockReturnValue({ submitCount: 1 } as FormikContextType<unknown>);
		mocked(useField).mockImplementation((name:FormikUseFieldArgType) => [{
			name,
			value: "dummy",
		}, {
			error: "test-error",
			touched: true,
		}, {}] as FormikUseFieldReturnType);
		const tree = renderer
			.create(<Input name="test-input"/>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
