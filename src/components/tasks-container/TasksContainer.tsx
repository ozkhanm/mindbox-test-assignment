import React from "react";
import Task from "../task/Task";

interface TaskType {
    text: string;
    isFinished: boolean;
    id: number;
};

interface TasksContainerTypes {
    tasks: TaskType[];
    taskFinishButtonClickHandler: (id: number) => void;
};

const TasksContainer: React.FC<TasksContainerTypes> = ({tasks, taskFinishButtonClickHandler}) => {
    return (
        <div>
            {tasks.map((it: TaskType) => <Task key={it.id} 
                text={it.text} 
                taskStatus={it.isFinished} 
                taskFinishButtonClickHandler={taskFinishButtonClickHandler} 
                id={it.id} />)}
        </div>
    );
};

export default TasksContainer;