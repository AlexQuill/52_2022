import React from 'react'
// to use state, we need to import the usestate hook

// we can get the props that we've passed in here! 
export default function WordList({ words }) {
    console.log(words[0])
    return (
        // Key allows react to only re-render the components that are actually changing in a list
        // todos.map(todo => <><Todo key = {todo.id} todo={todo} toggleTodo = {toggleTodo}/> <br /></>)
        words.map(word => <div>{word.text}</div>)
    );
}