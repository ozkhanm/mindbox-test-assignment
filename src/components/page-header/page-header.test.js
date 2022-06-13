import React from "react";
import renderer from "react-test-renderer";

import PageHeader from "./PageHeader";

it(`PageHeader renders correctly`, () => {
    const tree = renderer
        .create(<PageHeader />)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
