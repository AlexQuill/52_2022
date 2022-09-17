import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ allGroups }) {
  const [open, setOpen] = useState(false);

  const wordRef = useRef()
  const descripRef = useRef()
  const groupRef = useRef()

  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleSubmit() {
    const word = wordRef
    const descrip = descripRef
    const group = groupRef
    console.log(word.current.value)
    console.log(descrip.current.value)
    console.log(group)
  };

  function renderGroupDropdown() {
    return (
      <select name="groups" id="groupsDropDown" inputRef = {groupRef} >
        {allGroups.map((group) => {
          return <option value={group.name} selected>{group.name}</option>
        }
         )}
      </select>
    )
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a word
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Word</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your word, description, and group
          </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                inputRef= {wordRef}
                id="name"
                label="Word"
                type="word"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                inputRef= {descripRef}
                id="name"
                label="Description"
                type="description"
                fullWidth
                variant="standard"
            />
            {renderGroupDropdown()}
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
