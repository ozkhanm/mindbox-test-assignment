import React from "react";

interface TasksControlPanelTypes {
    tasksNumber: number;
    activeFilterName: string;
    filterButtonClickHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    clearCompletedButtonClickHandler: () => void;
};

const TasksControlPanel: React.FC<TasksControlPanelTypes> = ({tasksNumber, activeFilterName, filterButtonClickHandler, clearCompletedButtonClickHandler}) => {
    return (
        <div className="tasks-control-panel-wrapper">
            <p>{tasksNumber} items left</p>
            <div className="tasks-filter-controls">
                <input type="radio" id="radio-all" name="1" value="all" checked={activeFilterName === "all" ? true : false} 
                    onChange={filterButtonClickHandler} />
                <label htmlFor="radio-all">All</label>    
                <input type="radio" id="radio-active" name="1" value="active" checked={activeFilterName === "active" ? true : false} 
                    onChange={filterButtonClickHandler} />
                <label htmlFor="radio-active">Active</label>
                <input type="radio" id="radio-completed" name="1" value="completed" checked={activeFilterName === "completed" ? true : false}
                    onChange={filterButtonClickHandler} />
                <label htmlFor="radio-completed">Completed</label>
            </div>
            <div>
                <button className="clear-completed-button" type="button" onClick={clearCompletedButtonClickHandler}>Clear completed</button>
            </div>
        </div>
    );
};

export default TasksControlPanel;