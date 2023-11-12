
/**
 * This function creates the html template of the todo
 * @param {Todo} todo 
 * @returns {HTMLLIElement} liElement
 */
export const templateTodo = todo => {
    if (!todo) throw new Error('A todo object is required')

    const { id, description, done } = todo;

    const todoHTML = `  
    <div class="view">
        <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
        <label>${description}</label>
        <button class="destroy papa pepe pito"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`;

    const liElement = document.createElement('li');
    liElement.setAttribute('data-id', id)
    liElement.innerHTML = todoHTML;

    if (done)
        liElement.classList.add('completed')

    return liElement;

}