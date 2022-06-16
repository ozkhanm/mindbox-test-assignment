import React from "react";
import renderer from "react-test-renderer";

import TasksControlPanel from "./TasksControlPanel";

it(`TasksControlPanel renders correctly`, () => {
    const tree = renderer
        .create(<TasksControlPanel />)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
