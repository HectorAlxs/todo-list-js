import { renderTodo } from './use-cases'
import html from './app.html?raw';
import todoStore, { filters } from './store/todo.store';

const elementIdS = {
    todoList: '.todo-list',
    newTodoInput: '.new-todo',
    clearCompleted: '.clear-completed',
    todoFilters: '.filtro',
}

/**
 * This function render and starts the application
 * @param {String} elementId 
 */
export const app = (elementId) => {
    todoStore.initStore();
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

    const newDescriptionInput = document.querySelector(elementIdS.newTodoInput);
    const todoListUl = document.querySelector(elementIdS.todoList);
    const clearCompletedButton = document.querySelector(elementIdS.clearCompleted);
    const filtersLi = document.querySelectorAll(elementIdS.todoFilters);

    newDescriptionInput.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) return;
        if (!e.target.value.trim()) return;

        todoStore.addTodo(e.target.value);
        displayTodos();
        e.target.value = '';
    });

    todoListUl.addEventListener('click', (e) => {
        const element = e.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUl.addEventListener('click', (e) => {
        const destroyElement = e.target;
        if (!destroyElement.classList.contains('destroy')) return;
        const liElemento = destroyElement.closest('[data-id]');
        todoStore.deleteTodo(liElemento.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLi.forEach(element => {
        element.addEventListener('click', (e) => {
            filtersLi.forEach(element => element.classList.remove('selected'));
            e.target.classList.add('selected');

            switch (e.target.getAttribute('id')) {
                case 'all':
                    todoStore.setFilter(filters.all);
                    break;
                case 'pending':
                    todoStore.setFilter(filters.pending);
                    break;
                case 'completed':
                    todoStore.setFilter(filters.completed);
                    break;
            }
            console.log(e.target.getAttribute('id'))

            displayTodos();
        });
    });



}