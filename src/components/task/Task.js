const Task = ({text, taskStatus, id, taskFinishButtonClickHandler}) => {
    return (
        <div className="task-container">
            <input className="task-status-element" type="checkbox" checked={taskStatus} id={`task${id}`} 
                onChange={() => taskFinishButtonClickHandler(id)} />
            <label className={taskStatus ? "task-text-finished" : ""} htmlFor={`task${id}`}>{text}</label>
        </div>
    );
};

export default Task;