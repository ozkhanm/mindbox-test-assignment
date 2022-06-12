import Task from "../task/Task";
import TasksControlPanel from "../tasks-control-panel/TasksControlPanel";

const TasksContainer = ({tasks, activeTasks, activeFilterName, taskFinishButtonClickHandler, 
    filterButtonClickHandler, clearCompletedButtonClickHandler}) => {

    return (
        <div>
            {tasks.map((it) => <Task key={it.id} 
                text={it.text} 
                taskStatus={it.isFinished} 
                taskFinishButtonClickHandler={taskFinishButtonClickHandler} 
                id={it.id} />)}
            <TasksControlPanel tasksNumber={activeTasks} 
                activeFilterName={activeFilterName} 
                filterButtonClickHandler={filterButtonClickHandler}
                clearCompletedButtonClickHandler={clearCompletedButtonClickHandler} />
        </div>
    );
};

export default TasksContainer;