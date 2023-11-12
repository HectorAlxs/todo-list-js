
import { Todo } from '../todo/models/todo.model';

export const filters = {
    all: 'all',
    completed: 'completed',
    pending: 'pending'
}

const state = {
    todos: [
        new Todo('Tus pendientes se mostraran aqui'),
    ],
    filter: filters.all,
}

/**
 * Not implement
 */
const initStore = () => {
    loadStore();
}

/**
 * Not implement
 */
const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos = [], filter = filters.all} = 
        JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
}

const saveToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

/**
 * This function takes todo's based on the passed filter
 * @param {filters} filter 
 * @returns 
 */
const getTodos = (filter = filters.all) => {
    switch (filter) {
        case filters.all:
            return [...state.todos];
        case filters.completed:
            return state.todos.filter(todo => todo.done);
        case filters.pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}

/**
 * This function creates todo and adds them to the todo's
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));

    saveToLocalStorage();
}

/**
 * This function changes the status of a todo
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    const toogle = state.todos
        .find(todo => todo.id === todoId); 
    toogle.done = !toogle.done;
    // state.todos = state.todos.map(todo => {
    //     if (todo.id === todoId) {
    // /         todo.done = !todo.done;
    //     }
    //     return todo;
    // });
    
    saveToLocalStorage();
}

/**
 * This function delete a todo
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveToLocalStorage();
}

/**
 * This function delete all todo's completed
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveToLocalStorage();
}

/**
 * This function set a filter for todo's
 * @param {filters} filter 
 */
const setFilter = (filter = filters.all) => {
    if (!filters.hasOwnProperty(filter)) throw new Error('invalid filter');
    state.filter = filter;
    // 'propiedad' in objeto
    // objeto.hasOwnProperty('propiedad')
    // objeto.propiedad !== undefined
    // /!(objeto.[propiedad] ?? false)
    // Object.key(objeto).includes(propiedad)
    // objeto?.propiedad operador de encadenamiento

    saveToLocalStorage();
}

/**
 * This function return the current filter
 * @returns {filters} filter
 */
const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}