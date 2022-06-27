import React from "react";

import { ITask } from "../../types";

interface ITaskProps extends ITask {
    taskFinishButtonClickHandler: (id: number) => void;
};

const Task: React.FC<ITaskProps> = ({text, isFinished, id, taskFinishButtonClickHandler}) => {
    return (
        <div className="task-container small-container">
            <input className="task-status-element" type="checkbox" checked={isFinished} id={`task${id}`} 
                onChange={(): void => taskFinishButtonClickHandler(id)} />
            <label className={isFinished ? "task-text-finished" : ""} htmlFor={`task${id}`}>{text}</label>
        </div>
    );
};

export default Task;