import Task from "../task/Task";

const TasksContainer = ({tasks, taskFinishButtonClickHandler}) => {
    return (
        <div>
            {tasks.map((it) => <Task key={it.id} 
                text={it.text} 
                taskStatus={it.isFinished} 
                taskFinishButtonClickHandler={taskFinishButtonClickHandler} 
                id={it.id} />)}
        </div>
    );
};

export default TasksContainer;