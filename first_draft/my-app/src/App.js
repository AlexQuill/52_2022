import React, { useState, useRef } from 'react'
import {v4 as uuidv4} from 'uuid';
import WordList from './components/WordList'

function App() {

  const [words, setWords] = useState([])
  const wordRef = useRef() // expose this variable to be (1) attached to an html element and (2) modified in js

  function handleAddWord() {
    const newWord = wordRef.current.value
    setWords (prevWords => {
      return [...prevWords, {id: uuidv4(), text: newWord}] // newword soon to be part of an object with an ID and a "word" field 
    })
  }

  function inputWord(e) {
    if(e.key === 'Enter') {
      handleAddWord()
    }
  }

  return (
    <>
      <WordList words = {words}/>
      <input ref = {wordRef} type="text" onKeyDown = {inputWord}/>
      <button onClick = {handleAddWord}> Add Word </button>
    </>
  );
}

export default App;
