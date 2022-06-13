import React from "react";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Form from "../components/form/Form";

describe(`<Form/>`, () => {
    beforeEach(() => {
        render(<Form />);
    });

    test(`"All" filter button render tasks correctly`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        
        expect(tasksContainer.children.length).toBe(3);
    });

    test(`Task submit adds new task to list if text exists`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const taskInput = document.querySelector(".input");

        userEvent.type(taskInput, "Test suite");

        expect(taskInput).toHaveValue("Test suite");
        
        userEvent.keyboard("[Enter]");

        expect(taskInput).toHaveValue("");

        const tasksNumber = tasksContainer.children.length;

        expect(tasksNumber).toBe(4);
    });
    
    test(`Task submit adds new task to list if text does not exist`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const taskInput = document.querySelector(".input");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");

        expect(taskInput).toHaveValue("");
        
        userEvent.keyboard("[Enter]");

        expect(taskInput).toHaveValue("");

        const tasksNumber = tasksContainer.children.length;
        const unfinishedTasksNumber = parseInt(taskFinishStatusElement.textContent);

        expect(tasksNumber).toBe(3);
        expect(unfinishedTasksNumber).toBe(2);
    });

    test(`"Active" filter button render tasks correctly`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const activeRadioButton = document.querySelector(".tasks-filter-controls #radio-active");

        userEvent.click(activeRadioButton);

        const tasksNumber = tasksContainer.children.length;
        
        expect(tasksNumber).toBe(2);
    });

    test(`Task submits correctly while "active" filter button toggled`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const taskInput = document.querySelector(".input");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");
        const activeRadioButton = document.querySelector(".tasks-filter-controls #radio-active");

        userEvent.click(activeRadioButton);
        userEvent.type(taskInput, "Test suite");

        expect(taskInput).toHaveValue("Test suite");
        
        userEvent.keyboard("[Enter]");

        expect(taskInput).toHaveValue("");

        const updatedTasksNumber = tasksContainer.children.length;
        const unfinishedTasksNumber = parseInt(taskFinishStatusElement.textContent);

        expect(updatedTasksNumber).toBe(3);
        expect(unfinishedTasksNumber).toBe(3);
    });

    test(`"Completed" filter button render tasks correctly`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const completedRadioButton = document.querySelector(".tasks-filter-controls #radio-completed");

        userEvent.click(completedRadioButton);

        const tasksNumber = tasksContainer.children.length;
        
        expect(tasksNumber).toBe(1);
    });

    test(`Task submits correctly while "completed" filter button toggled`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const completedRadioButton = document.querySelector(".tasks-filter-controls #radio-completed");
        const taskInput = document.querySelector(".input");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");

        userEvent.click(completedRadioButton);
        userEvent.type(taskInput, "Test suite");

        expect(taskInput).toHaveValue("Test suite");
        
        userEvent.keyboard("[Enter]");

        expect(document.querySelector(".input")).toHaveValue("");

        const updatedTasksNumber = tasksContainer.children.length;
        const unfinishedTasksNumber = parseInt(taskFinishStatusElement.textContent);

        expect(updatedTasksNumber).toBe(1);
        expect(unfinishedTasksNumber).toBe(3);
    });

    test(`Clear completed button click renders new task list correctly while "all" filter button toggled`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const clearCompletedButton = document.querySelector(".clear-completed-button");
        
        expect(tasksContainer.children.length).toBe(3);

        userEvent.click(clearCompletedButton);

        expect(tasksContainer.children.length).toBe(2);
    });

    test(`Clear completed button click renders new task list correctly while "active" filter button toggled`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const activeRadioButton = document.querySelector(".tasks-filter-controls #radio-active");
        const clearCompletedButton = document.querySelector(".clear-completed-button");
        
        userEvent.click(activeRadioButton);
        
        expect(tasksContainer.children.length).toBe(2);

        userEvent.click(clearCompletedButton);

        expect(tasksContainer.children.length).toBe(2);
    });

    test(`Clear completed button click renders new task list correctly while "completed" filter button toggled`, () => {
        const tasksContainer = document.querySelector(".input-wrapper div");
        const completedRadioButton = document.querySelector(".tasks-filter-controls #radio-completed");
        const clearCompletedButton = document.querySelector(".clear-completed-button");

        userEvent.click(completedRadioButton);
        
        expect(tasksContainer.children.length).toBe(1);

        userEvent.click(clearCompletedButton);

        expect(tasksContainer.children.length).toBe(0);
    });

    test(`Task finish scenario works correctly while "all" filter button toggled`, () => {
        const firstTaskCheckbox = document.querySelector(".task-container #task0");
        const firstTaskLabel = document.querySelector(".task-container #task0 + label");
        const tasksContainer = document.querySelector(".input-wrapper div");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");

        expect(parseInt(taskFinishStatusElement.textContent)).toBe(2);
        expect(tasksContainer.children.length).toBe(3);

        userEvent.click(firstTaskCheckbox);

        expect(tasksContainer.children.length).toBe(3);
        expect(firstTaskCheckbox.checked).toBe(true);
        expect(firstTaskLabel.classList).toContain("task-text-finished");
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(1);
    });

    test(`Task set active scenario works correctly while "all" filter button toggled`, () => {
        const completedTaskLabel = document.querySelector(".task-container #task1 + label");
        const tasksContainer = document.querySelector(".input-wrapper div");
        const completedTaskCheckbox = document.querySelector(".task-container #task1");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");
        
        expect(tasksContainer.children.length).toBe(3);
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(2);

        userEvent.click(completedTaskCheckbox);

        expect(tasksContainer.children.length).toBe(3);
        expect(completedTaskCheckbox.checked).toBe(false);
        expect(completedTaskLabel.className).toBe("");
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(3);
    });

    test(`Task finish scenario works correctly while "active" filter button toggled`, () => {
        const activeRadioButton = document.querySelector(".tasks-filter-controls #radio-active");

        userEvent.click(activeRadioButton);

        const tasksContainer = document.querySelector(".input-wrapper div");
        const firstTaskCheckbox = document.querySelector(".task-container #task0");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");
        
        expect(tasksContainer.children.length).toBe(2);
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(2);

        userEvent.click(firstTaskCheckbox);

        expect(tasksContainer.children.length).toBe(1);
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(1);
    });

    test(`Task set active scenario works correctly while "completed" filter button toggled`, () => {
        const completedRadioButton = document.querySelector(".tasks-filter-controls #radio-completed");

        userEvent.click(completedRadioButton);

        const tasksContainer = document.querySelector(".input-wrapper div");
        const completedTaskCheckbox = document.querySelector(".task-container #task1");
        const taskFinishStatusElement = document.querySelector(".tasks-control-panel-wrapper p");
        
        expect(tasksContainer.children.length).toBe(1);
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(2);

        userEvent.click(completedTaskCheckbox);

        expect(tasksContainer.children.length).toBe(0);
        expect(parseInt(taskFinishStatusElement.textContent)).toBe(3);
    });
});