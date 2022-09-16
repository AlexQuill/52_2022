import React from 'react'
import WordCard from './WordCard'
import {v4 as uuidv4} from 'uuid';
import '../App.css'
import Draggable from 'react-draggable'

// to use state, we need to import the usestate hook

// we can get the props that we've passed in here! 
export default function WordList({ words, editWord, editDescription, deleteWord, group, editGroup, allGroups }) {
    return (
        // Key allows react to only re-render the components that are actually changing in a list
        // todos.map(todo => <><Todo key = {todo.id} todo={todo} toggleTodo = {toggleTodo}/> <br /></>)
        <>
            <h2>
                {group.name}
            </h2>
            <div className="wordcardHolder">
                {words.map(word => 
                <Draggable>
                    <div className="dragBox">
                        <WordCard key = {uuidv4()} word={word} editWord={editWord} editDescription={editDescription} editGroup={editGroup} deleteWord = {deleteWord} thisGroup={group} allGroups={allGroups}/>
                    </div>
                </Draggable>
                )}
            </div>
        </>
    );
}