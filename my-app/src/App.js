import React, { useState, useRef, useEffect }from 'react';
import TodoList from './TodoList.js'
import {v4 as uuidv4} from 'uuid';

// this is where we're going to load the master component, or the root of the site. 

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([]) // [state variable, function that runs to change state variable]
  const todoNameRef = useRef() // expose this variable to be (1) attached to an html element and (2) modified in js

  useEffect(() => {
    console.log(localStorage);
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos)
  },[]) // empty dependencies means it only runs once on load of page

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) // must be saved to local storage as a string
    // every single time one of our dependencies changes, this function runs
  }, [todos]) // this array is all of our dependencies

  function toggleTodo(id) {
    console.log('toggled')
    const newTodos = [...todos] // never directly modify a state variable
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => { // "prev todos" is just the placeholder for the old version of the state variable we're modifying
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}] // spread the array to say "bring in all the old values of this array and add this new thing"
    })
    todoNameRef.current.value = null
  }

function handleRemoveTodo(e) {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return ( // can only return 1 thing.
    <>
    {/* props - pass a variable from the outer scope into the component */}
      <TodoList toggleTodo = {toggleTodo} todos ={todos}/>
      <input ref = {todoNameRef} type="text" />
      <button onClick = {handleAddTodo}> Add TODO </button>
      <button onClick = {handleRemoveTodo}> Clear completed TODOs </button>
      <div> {todos.filter(todo => !todo.complete).length} left TODO </div>
    </>
  );
}

export default App;
