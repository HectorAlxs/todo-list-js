import { renderTodo } from './use-cases'
import html from './app.html?raw';
import todoStore from './store/todo.store';

const elementIdS = {
    todoList: '.todo-list',
    newTodoInput: '.new-todo'
}

/**
 * This function render and starts the application
 * @param {String} elementId 
 */
export const app = (elementId) => {
    /**
     * This function renders the todo's based on current filter
     */
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodo(elementIdS.todoList, todos);
    }

    /**
     * This function starts the application in the app container
     */
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).appendChild(app);
        displayTodos();
    })();
}
