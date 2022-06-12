import { useState, useEffect } from "react";

import TasksContainer from "../tasks-container/TasksContainer";

const Form = () => {
    const [activeFilterName, setActiveFilterName] = useState(`all`);
    const [tasks, setTasks] = useState([
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
    ]);
    
    useEffect(() => {
        setTasks(tasks);
    });

    const taskFinishButtonClickHandler = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.slice();
            const index = updatedTasks.findIndex((it) => it.id === id);

            updatedTasks[index].isFinished = !updatedTasks[index].isFinished;

            return updatedTasks;
        });
    };

    const filterButtonClickHandler = (evt) => {
        const filterName = evt.target.value;

        switch (filterName) {
            case `all`:
                setActiveFilterName(`all`);

                break;

            case `active`:
                setActiveFilterName(`active`);

                break;

            case `completed`:
                setActiveFilterName(`completed`);

                break;
        };
    };

    const clearCompletedButtonClickHandler = () => {
        setTasks(tasks.filter((it) => it.isFinished !== true));
    };

    const taskSubmitButtonClickHandler = (evt) => {
        const taskText = evt.target.value;
        const ENTER_BUTTON_KEYCODE = 13;

        if ((evt.keyCode === ENTER_BUTTON_KEYCODE) && (taskText.length !== 0)) {
            const maxTaskId = Math.max.apply(null, tasks.map((it) => it.id));
            const newTask = {
                text: taskText,
                isFinished: false,
                id: maxTaskId + 1
            };

            setTasks(prevTasks => [...prevTasks, newTask]);
            evt.target.value = ``;
        }
    };

    const activeTasks = tasks.reduce((acc, nextValue) => {
        if (nextValue.isFinished === false) {
            acc += 1;
        }

        return acc;
    }, 0);

    const getTasks = (filterName) => {
        switch (filterName) {
            case `all`:
                return tasks;

            case `active`:
                return tasks.filter((it) => it.isFinished !== true);

            case `completed`:
                return tasks.filter((it) => it.isFinished === true);
        };
    };
    
    return (
        <div className="input-wrapper">
            <button className="expand-button" type="button" />
            <input className="input" type="text" placeholder="What needs to be done?" onKeyDown={taskSubmitButtonClickHandler}/>
            <TasksContainer tasks={getTasks(activeFilterName)}
                activeTasks={activeTasks} 
                activeFilterName={activeFilterName} 
                taskFinishButtonClickHandler={taskFinishButtonClickHandler} 
                filterButtonClickHandler={filterButtonClickHandler}
                clearCompletedButtonClickHandler={clearCompletedButtonClickHandler} />
        </div>
    );
};

export default Form;