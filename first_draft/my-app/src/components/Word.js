import React from 'react'
// to use state, we need to import the usestate hook

// we can get the props that we've passed in here! 
export default function Word({ word }) {
    return (
        <div>{word.text}</div>
    );
}