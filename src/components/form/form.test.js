import React from "react";
import renderer from "react-test-renderer";

import Form from "./Form";

it(`Form renders correctly`, () => {
    const tree = renderer
        .create(<Form />)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
