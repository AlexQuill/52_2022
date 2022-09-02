import React from 'react'
import Todo from './Todo.js'
// to use state, we need to import the usestate hook

// we can get the props that we've passed in here! 
export default function TodoList({ todos, toggleTodo }) {
    return (
        // Key allows react to only re-render the components that are actually changing in a list
        todos.map(todo => <><Todo key = {todo.id} todo={todo} toggleTodo = {toggleTodo}/> <br /></>)
    );
}