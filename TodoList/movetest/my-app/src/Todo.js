import React from 'react'
// to use state, we need to import the usestate hook

// we can get the props that we've passed in here! 
export default function Todo({ todo, toggleTodo }) {

    function handleTodoClick() {
        toggleTodo(todo.id) // call it here, but function is run in the outer scope 
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange = {handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    );
}