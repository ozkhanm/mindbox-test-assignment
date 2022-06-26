import { useState, useEffect } from "react";

import TasksContainer from "../tasks-container/TasksContainer";
import TasksControlPanel from "../tasks-control-panel/TasksControlPanel";

const Form = () => {
    const [activeFilterName, setActiveFilterName] = useState("all");
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
    const [input, setInput] = useState("");

    useEffect(() => {
        setTasks(tasks);
    }, [tasks]);

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    };

    const taskFinishButtonClickHandler = (id: number) => {
        const updatedTasks = tasks.slice();
        const index = updatedTasks.findIndex((it) => it.id === id);

        updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
        setTasks(updatedTasks);
    };

    const filterButtonClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const filterName = evt.target.value;

        switch (filterName) {
            case "all":
                setActiveFilterName("all");

                break;

            case "active":
                setActiveFilterName("active");

                break;

            case "completed":
                setActiveFilterName("completed");

                break;

            default:
                setActiveFilterName("all");
        };
    };

    const clearCompletedButtonClickHandler = () => {
        setTasks(tasks.filter((it) => it.isFinished !== true));
    };

    const taskSubmitButtonClickHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const ENTER_BUTTON_KEYCODE = 13;

        if ((evt.keyCode === ENTER_BUTTON_KEYCODE) && (input.length !== 0)) {
            const maxTaskId = Math.max.apply(null, tasks.map((it) => it.id)) ^ 0;
            const newTask = {
                text: input,
                isFinished: false,
                id: maxTaskId + 1
            };

            setTasks(prevTasks => [...prevTasks, newTask]);
            setInput("");
        }
    };

    const activeTasks = tasks.reduce((acc, nextValue) => {
        if (nextValue.isFinished === false) {
            acc += 1;
        }

        return acc;
    }, 0);

    const getTasks = (filterName: string) => {
        switch (filterName) {
            case "all":
                return tasks;

            case "active":
                return tasks.filter((it) => it.isFinished !== true);

            case "completed":
                return tasks.filter((it) => it.isFinished === true);

            default:
                return tasks;
        };
    };
    
    return (
        <div className="input-wrapper">
            <input className="input small-container" type="text" placeholder="What needs to be done?" 
            value={input}
            onKeyDown={taskSubmitButtonClickHandler}
            onChange={inputChangeHandler} />
            <TasksContainer tasks={getTasks(activeFilterName)} taskFinishButtonClickHandler={taskFinishButtonClickHandler} />
            <TasksControlPanel tasksNumber={activeTasks} 
                activeFilterName={activeFilterName} 
                filterButtonClickHandler={filterButtonClickHandler}
                clearCompletedButtonClickHandler={clearCompletedButtonClickHandler} />
        </div>
    );
};

export default Form;