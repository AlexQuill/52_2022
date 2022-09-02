import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {

  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [isPrevPage, setIsPrevPage] = useState(true)


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c) //Axios.canceltoken is a function that initializes our "cancel button" ("cancel")
    }).then(res => {
      const pokeNames = res.data.results.map(returnedPoke => returnedPoke.name)
      setPokemon(pokeNames)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setLoading(false)
    })
    return () => cancel()

  },[currentPageUrl])

  function goToNextPage() {
    if (nextPageUrl){
      setCurrentPageUrl(nextPageUrl)
      setIsPrevPage(true)
    }
  }

  function goToPrevPage() {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl)
    else setIsPrevPage(false)
  }

  if (loading) return "loading..."

  return (
    <>
      <PokemonList pokemon = {pokemon} />
      <Pagination 
        goToNextPage = {goToNextPage}
        goToPrevPage = {goToPrevPage}
      />
      {isPrevPage ? null : <h3>No previous page!</h3>}
    </>
  );
}

export default App;
