import React from "react";

interface TaskTypes {
    text: string;
    taskStatus: boolean;
    id: number;
    taskFinishButtonClickHandler: (id: number) => void;
};

const Task: React.FC<TaskTypes> = ({text, taskStatus, id, taskFinishButtonClickHandler}) => {
    return (
        <div className="task-container small-container">
            <input className="task-status-element" type="checkbox" checked={taskStatus} id={`task${id}`} 
                onChange={() => taskFinishButtonClickHandler(id)} />
            <label className={taskStatus ? "task-text-finished" : ""} htmlFor={`task${id}`}>{text}</label>
        </div>
    );
};

export default Task;