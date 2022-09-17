import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css'

export default function WordCard({ word, editWord, editDescription, editGroup, deleteWord, thisGroup, allGroups }) {

  // every card has a word that is a state variable
  // initiatilized as word
  // when you hit edit, that 

  const [currWord, setWord] = useState(word)
  const [showEditWordField, flipEditWord] = useState(false)
  const [showEditDescription, flipEditDescription] = useState(false)
  const [showDescription, flipDescription] = useState(false)

  const wordRef = useRef()
  const descripRef = useRef()
  const groupRef = useRef()

  function allowEditDescription() {
    // reveal edit form for description
    // console.log('showing edit description')
    flipEditDescription(!showEditDescription)
  }

  function revealDescription() {
    // reveal description itself
    flipDescription(!showDescription)
  }

  function allowEditWord() {
    // reveal edit form for word
    flipEditWord(!showEditWordField)
  }

  function changeWord(){
    const oldWord = currWord
    const newWord = wordRef.current.value
    if (newWord === '' || newWord === ' ') return
    editWord(oldWord, newWord)
    flipEditWord(!showEditWordField)
    setWord((oldWord) => {
        return {...oldWord, text: newWord} // newword soon to be part of an object with an ID and a "word" field 
      })
  }

  function changeDescription(){
    const oldWord = currWord
    const newDescrip = descripRef.current.value
    if (newDescrip === '' || newDescrip === ' ') return
    editDescription(oldWord, newDescrip)
    flipEditDescription(!showEditDescription)
    setWord((oldWord) => {
        return {...oldWord, description: newDescrip}
      })
  }

  function changeGroup(){
    const oldWord = currWord
    const newGroup = groupRef.current.value
    editGroup(oldWord, newGroup)
    setWord((oldWord) => {
        return {...oldWord, group: newGroup} // newword soon to be part of an object with an ID and a "word" field 
      })
  }

  function handleDeleteWord(){
    deleteWord(currWord)
  }

  function renderGroupDropdown() {
    return (
      <select name="groups" id="groupsDropDown" ref = {groupRef} onChange={changeGroup}>
        {allGroups.map((group) => {
          console.log(thisGroup)
          console.log("groupname: " + group.name)
          if (group.name === thisGroup.name) return <option value={group.name} selected>{group.name}</option>
          else return <option value={group.name}>{group.name}</option>
        }
         )}
      </select>
    )
  }

  return (
    <Card sx={{ maxWidth: 345 }} className="wordCard" >
      <CardMedia
        component="img"
        alt="red panda"
        height="140"
        image = {require('../static/images/redPanda.jpg')} // will eventually use a path variable as the photo name
      />
      <CardContent>
        <div style={{display: 'flex', flexdirection: 'row', justifyContent: 'space-between'}}>
          <Typography gutterBottom variant="h5" id="word" component="div"> {currWord ? currWord.text: null}</Typography>
          {renderGroupDropdown()}
        </div>
        {showEditWordField ? <><input type = "text" ref = {wordRef} className="wordChangeInput" /><button onClick={changeWord}>Update word</button></> : null}
        {showDescription ? <Typography variant="body2" color="text.secondary"> {currWord.description} </Typography> : <Typography variant="body2" color="text.secondary"><i>Description hidden</i></Typography>}
        {showEditDescription ? <><input type = "text" ref = {descripRef} className="descriptionChangeInput" /><button onClick={changeDescription}>Update Description</button></> : null}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={revealDescription}>Reveal Description</Button>
        <Button size="small" onClick={allowEditDescription}>Edit Description</Button>
        <Button size="small" onClick={allowEditWord}>Edit Word</Button>
      </CardActions>
      <CardActions>
        <Button size="small" onClick={handleDeleteWord}>Delete word</Button>
      </CardActions>
    </Card>
  );
}
