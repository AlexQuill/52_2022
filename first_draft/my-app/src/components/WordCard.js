import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function WordCard({ word }) {

  // every card has a word that is a state variable
  // initiatilized as word
  // when you hit edit, that 

  const [currWord, setWord] = useState(word)
  const [allowInput, flipInput] = useState(false)
  const [showDescription, flipDescription] = useState(false)

  const wordRef = useRef()

  function edit() {
    flipInput(true)
  }

  function changeWord(){
    const newWord = wordRef.current.value
    console.log(newWord)
    if (newWord === '' || newWord === ' ') return
    console.log('sending to DB')
    const wordInput = document.getElementById('wordChange')
    wordInput.value='';
    setWord((oldWord) => {
        return {...oldWord, text: newWord} // newword soon to be part of an object with an ID and a "word" field 
      })
  }

  function changeDescription() {
    flipDescription(!showDescription)
    // set input form body to oldWord
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="red panda"
        height="140"
        image = {require('../static/images/redPanda.jpg')} // will eventually use a path variable as the photo name
      />
      <CardContent>
        <Typography gutterBottom variant="h5" id="word" component="div">
          {currWord ? currWord.text: null}
        </Typography>
        {showDescription ? <Typography variant="body2" color="text.secondary"> Description showing</Typography> : <Typography variant="body2" color="text.secondary">Description hidden</Typography>}
        {allowInput ? <><input type = "text" ref = {wordRef} id="wordChange" /><button onClick={changeWord}>Submit</button></> : null}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={changeDescription}>Description</Button>
        <Button size="small" onClick={edit}>Edit</Button>
      </CardActions>
    </Card>
  );
}
