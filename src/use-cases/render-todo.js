
import { templateTodo } from './';

let element;
/**
* This function renders the html template of the todo's
* @param {String} elementId 
* @param {Array<Todo>} todos 
*/
export const renderTodo = (elementId, todos = []) => {

    if (!element)
        element = document.querySelector(elementId);

    if (!element)
        throw new Error(`Element ${elementId} not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.appendChild(templateTodo(todo));
    })


}