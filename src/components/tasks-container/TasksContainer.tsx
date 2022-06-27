import React from "react";

import Task from "../task/Task";

import { ITask } from "../../types";

interface TasksContainerProps {
    tasks: ITask[];
    taskFinishButtonClickHandler: (id: number) => void;
};

const TasksContainer: React.FC<TasksContainerProps> = ({tasks, taskFinishButtonClickHandler}) => {
    return (
        <div>
            {tasks.map((it: ITask): React.ReactNode => <Task key={it.id} 
                text={it.text} 
                isFinished={it.isFinished}
                id={it.id} 
                taskFinishButtonClickHandler={taskFinishButtonClickHandler} />)}
        </div>
    );
};

export default TasksContainer;