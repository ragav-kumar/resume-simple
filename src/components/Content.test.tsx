import React from "react";
import renderer from "react-test-renderer";
import { Content } from "./Content";
import { BrowserRouter } from "react-router-dom";


it('should render correctly', () => {
	const tree = renderer
		.create(<BrowserRouter><Content/></BrowserRouter>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
