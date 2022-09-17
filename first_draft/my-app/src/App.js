import React, { useState, useRef, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid';
import WordList from './components/WordList'
import SubmitWordForm from './components/SubmitWordForm'
import './App.css'


function App() {

  const [words, setWords] = useState([])
  const [wordGroups, setGroups] = useState([{id: uuidv4(), name: "sports", description: "Sports words"},{id: uuidv4(), name: "Family", description: "Family words"}, {id: uuidv4(), name: "weather", description: "Weather words"}])
  const [alreadyExistsWarning, setAEWarning] = useState(false)
  const wordRef = useRef() // expose this variable to be (1) attached to an html element and (2) modified in js
  const groupRef = useRef() // expose this variable to be (1) attached to an html element and (2) modified in js

  function handleAddWord() {
    const newWord = wordRef.current.value
    if (newWord === '' || newWord === ' ') return
    for (const word of words) {
      if (word.text === newWord) {
        setAEWarning(!alreadyExistsWarning)
        return
      }
    }
    setAEWarning(false)
    document.getElementById('wordInput').value = ''
    setWords(prevWords => {
      return [...prevWords, {id: uuidv4(), text: newWord, group: "sports", description: "this the Default description for a card"}] 
    })
  }

  function handleDeleteWord(oldWord) {
    setWords(words.filter((word) => word.text !== oldWord.text))
  }

  function inputWord(e) {
    if(e.key === 'Enter') {
      handleAddWord()
    }
  }


  function handleAddGroup() {
    const newGroup = groupRef.current.value
    if (newGroup === '' || newGroup === ' ') return
    for (const group of wordGroups) {
      if (group.name === newGroup) {
        return
      }
    }
    document.getElementById('groupInput').value = ''
    setGroups(prevGroups => {
      return [...prevGroups, {id: uuidv4(), name: newGroup, description: "This group contains words related to +++++"}]
    })
  }

  function inputGroup(e) {
    if(e.key === 'Enter') {
      handleAddGroup()
    }
  }

  useEffect(() => { 
    console.log(words)
  }, [words])

  function editWord(oldWord, newWord) {
    for (const word of words) {
      if (word.text === newWord) {
        setAEWarning(!alreadyExistsWarning)
        return
      }
    }
    setWords(words.map(word => word.text === oldWord.text ? {...oldWord, text: newWord} : word))
  }
  function editDescription(oldWord, newDescrip) {
    setWords(words.map(word => word.text === oldWord.text ? {...oldWord, description: newDescrip} : word))
  }

  function editGroup(oldWord, newGroup) {
    setWords(words.map(word => word.text === oldWord.text ? {...oldWord, group: newGroup} : word))
  }


  function renderGroups() {
    console.log(words)
    return wordGroups.map((group) => 
      <WordList key = {uuidv4()} words = {
        words.filter((word) => {
          return word.group === group.name
        })
      }
      editWord = {editWord} 
      editDescription = {editDescription} 
      editGroup = {editGroup}
      deleteWord = {handleDeleteWord}
      group={group}
      allGroups = {wordGroups}/>
    )
  }

  return (
    <>
      {/* this will become a form */}
      <input ref = {wordRef} type = "text" id = 'wordInput' onKeyDown = {inputWord}/>
      <button onClick = {handleAddWord}> Add Word </button> {alreadyExistsWarning ? <div>Word already exists</div> : null}
      <input ref = {groupRef} type = "text" id = 'groupInput' onKeyDown = {inputGroup}/>
      <button onClick = {() => alert('adding group')}> Add Group </button> 
      <SubmitWordForm allGroups = {wordGroups}/>
      {renderGroups()}
    </>
  );
}

export default App;
