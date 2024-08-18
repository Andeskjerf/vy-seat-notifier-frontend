import { useState } from 'react'
import './Search.css'
import { API_URL } from '../Consts'

export enum RoundState {
  Left = 'round-left',
  Right = 'round-right',
  Both = 'round-both',
}

interface SearchProps {
  id: number
  round: RoundState
  isActive: boolean
  activeCallback: Function
}

interface SuggestionsBoxProps {
  isVisible: boolean
  results: string[]
}

interface SuggestionEntryProps {
  text: string
  isLast: boolean
}

function makeSearchUrl(search: string): string {
  return `${API_URL}/services/location/places/autosuggest?query=${search}&searchOrigin=default`
}

async function makeApiRequest(search: string[]) {
  // we're not allowed to make a GET request to Vy from our website
  // we need our own server that does it on our behalf
  // in the meantime, dummy function
  return new Promise((resolve) => {
    setTimeout(() => resolve(['some suggestions', 'yooo']), 500)
  })

  // return await fetch(makeSearchUrl(search), {
  // mode: "no-cors",
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
}

function SuggestionEntry({ text, isLast }: SuggestionEntryProps) {
  const class_ = isLast ? 'round-bottom' : ''
  return (
    <>
      <div
        className={`${class_} hover-overlay text-align-start text-black p-10 no-select pointer-cursor`}
      >
        {text}
      </div>
    </>
  )
}

function SuggestionsBox({ isVisible, results }: SuggestionsBoxProps) {
  if (!isVisible) {
    return null
  }

  const entries = results.map((entry, index) => (
    <>
      <SuggestionEntry
        key={index}
        text={entry}
        isLast={index == results.length - 1}
      />
      {index != results.length - 1 ? <div className='seperator'></div> : null}
    </>
  ))

  return (
    <div className='suggestions-container round-bottom white-bg border'>
      {results.length == 0 ? <span className='loader'></span> : <>{entries}</>}
    </div>
  )
}

function Search({ round, isActive, activeCallback, id }: SearchProps) {
  const [autosuggest, setAutosuggest] = useState<number | undefined>()
  const [searched, setSearched] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<string[]>([])

  function handleInput(text: string) {
    clearTimeout(autosuggest)
    if (text != '' && !searched.includes(text)) {
      setShowSuggestions(true)
      setSearched([...searched, text])
      setSearchResults([])
      setAutosuggest(
        setTimeout(async () => {
          setSearchResults(await makeApiRequest(text))
        }, 1000),
      )
    } else if (text == '') {
      setShowSuggestions(false)
      setSearchResults([])
    }
  }

  if (!isActive && showSuggestions) {
    setShowSuggestions(false)
    clearTimeout(autosuggest)
  }

  if (isActive && !showSuggestions && searchResults.length > 0) {
    setShowSuggestions(true)
  }

  return (
    <div className='search-container'>
      <div
        className={`${isActive ? 'active-border' : ''} ${round} white-bg border-hover`}
      >
        <input
          onChange={(text) => handleInput(text.target.value)}
          onFocus={() => activeCallback(id)}
          className='input-nobg text-black p-10'
          type='text'
        />
      </div>
      <SuggestionsBox isVisible={showSuggestions} results={searchResults} />
    </div>
  )
}

export default Search
