import React from "react";
import renderer from "react-test-renderer";

import Task from "./Task";

it(`Task component renders correctly`, () => {
    const tree = renderer
        .create(<Task />)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
