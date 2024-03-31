#!/usr/bin/env node
import inquirer from 'inquirer';
// Array of todo items
const todoList = [];
// Main menu function
async function mainMenu() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Add Task', 'View List', 'Insert Task', 'Update Task', 'Search Task', 'Mark as Completed', 'Delete Task', 'Exit'],
    });
    switch (action) {
        case 'Add Task':
            await addTask();
            break;
        case 'View List':
            viewList();
            break;
        case 'Insert Task':
            await insertTask();
            break;
        case 'Update Task':
            await updateTask();
            break;
        case 'Search Task':
            await searchTask();
            break;
        case 'Mark as Completed':
            await markCompleted();
            break;
        case 'Delete Task':
            await deleteTask();
            break;
        case 'Exit':
            console.log('Goodbye!');
            return;
    }
    // Loop back to the main menu
    mainMenu();
}
// Function to add a task
const addTask = async () => {
    const { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter the task:',
    });
    todoList.push({ task, completed: false });
    console.log('Task added successfully!');
};
// Function to view the todo list
const viewList = () => {
    console.log('*** To-Do List ***');
    todoList.forEach((item, index) => {
        console.log(`${index + 1}. [${item.completed ? 'x' : ' '}] ${item.task}`);
    });
    console.log('******************');
};
// Function to insert a task
const insertTask = async () => {
    const { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter the task you want to insert:',
    });
    const { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the position to insert the task (1 - end of list):',
    });
    if (index < 1 || index > todoList.length + 1) {
        console.log('Invalid position. Please try again.');
        return;
    }
    todoList.splice(index - 1, 0, { task, completed: false });
    console.log('Task inserted successfully!');
};
// Function to update a task
const updateTask = async () => {
    const { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the task number to update:',
    });
    if (index < 1 || index > todoList.length) {
        console.log('Invalid task number. Please try again.');
        return;
    }
    const { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter the new task description:',
    });
    todoList[index - 1].task = task;
    console.log('Task updated successfully!');
};
// Function to search for a task
const searchTask = async () => {
    const { query } = await inquirer.prompt({
        type: 'input',
        name: 'query',
        message: 'Enter the task you want to search for:',
    });
    const matchingTasks = todoList.filter(item => item.task.toLowerCase().includes(query.toLowerCase()));
    if (matchingTasks.length === 0) {
        console.log('No matching tasks found.');
    }
    else {
        console.log('*** Matching Tasks ***');
        matchingTasks.forEach((item, index) => {
            console.log(`${index + 1}. [${item.completed ? 'x' : ' '}] ${item.task}`);
        });
        console.log('**********************');
    }
};
// Function to mark a task as completed
const markCompleted = async () => {
    const { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the task number to mark as completed:',
    });
    if (index < 1 || index > todoList.length) {
        console.log('Invalid task number. Please try again.');
        return;
    }
    todoList[index - 1].completed = true;
    console.log('Task marked as completed!');
};
// Function to delete a task
const deleteTask = async () => {
    const { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the task number to delete:',
    });
    if (index < 1 || index > todoList.length) {
        console.log('Invalid task number. Please try again.');
        return;
    }
    todoList.splice(index - 1, 1);
    console.log('Task deleted successfully!');
};
// Start the main menu
mainMenu();
