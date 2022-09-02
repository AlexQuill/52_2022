import React from 'react'

export default function Pagination({ goToNextPage, goToPrevPage }) {
    return (
        <div>
            <button onClick = {goToPrevPage}> Prev </button>
            <button onClick = {goToNextPage}> Next </button> 
        </div>
    )
}
