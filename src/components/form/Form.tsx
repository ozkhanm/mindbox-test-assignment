import React, { useState, useEffect } from "react";

import TasksContainer from "../tasks-container/TasksContainer";
import TasksControlPanel from "../tasks-control-panel/TasksControlPanel";

import { FilterName, ITask } from "../../types";

const Form: React.FC = () => {
    const [activeFilterName, setActiveFilterName] = useState<string>(FilterName.ALL);
    const [tasks, setTasks] = useState<ITask[]>([
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
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        setTasks(tasks);
    }, [tasks]);

    const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(evt.target.value);
    };

    const taskFinishButtonClickHandler = (id: number): void => {
        const updatedTasks: ITask[] = tasks.slice();
        const index: number = updatedTasks.findIndex((it: ITask) => it.id === id);

        updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
        setTasks(updatedTasks);
    };

    const filterButtonClickHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const filterName: string = evt.target.value;

        switch (filterName) {
            case FilterName.ALL:
                setActiveFilterName(FilterName.ALL);

                break;

            case FilterName.ACTIVE:
                setActiveFilterName(FilterName.ACTIVE);

                break;

            case FilterName.COMPLETED:
                setActiveFilterName(FilterName.COMPLETED);

                break;

            default:
                setActiveFilterName(FilterName.ALL);
        };
    };

    const clearCompletedButtonClickHandler = (): void => {
        setTasks(tasks.filter((it: ITask) => it.isFinished !== true));
    };

    const taskSubmitButtonClickHandler = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
        if ((evt.key === "Enter") && (input.length !== 0)) {
            const maxTaskId: number = Math.max.apply(null, tasks.map((it: ITask) => it.id)) ^ 0;
            const newTask: ITask = {
                text: input,
                isFinished: false,
                id: maxTaskId + 1
            };

            setTasks(prevTasks => [...prevTasks, newTask]);
            setInput("");
        }
    };

    const activeTasks: number = tasks.reduce((acc: number, nextValue: ITask): number => {
        if (nextValue.isFinished === false) {
            acc += 1;
        }

        return acc;
    }, 0);

    const getTasks = (filterName: string): ITask[] => {
        switch (filterName) {
            case FilterName.ALL:
                return tasks;

            case FilterName.ACTIVE:
                return tasks.filter((it: ITask) => it.isFinished !== true);

            case FilterName.COMPLETED:
                return tasks.filter((it: ITask) => it.isFinished === true);

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