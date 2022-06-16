import React from "react";
import renderer from "react-test-renderer";

import TasksContainer from "./TasksContainer";

it(`TasksContainer renders correctly`, () => {
    const tasks = [
        {
            text: "Тестовое задание",
            isFinished: false,
            id: 0,
        },
        {
            text: "Прекрасный код",
            isFinished: true,
            id: 1,
        },
        {
            text: "Покрытие тестами",
            isFinished: false,
            id: 2
        },
    ];
    const tree = renderer
        .create(<TasksContainer tasks={tasks} />)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
