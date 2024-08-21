import { useRef, useState } from 'react'
import './Search.css'
import { SearchLocation } from '../models/SearchLocation'
import SuggestionsBox from './SuggestionsBox'
import { getAutosuggestApi, makeAutosuggestUrl } from '../Api'

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
  searchCallback: Function
}

function levenshteinDistance(a: string, b: string) {
  const arr: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  )

  for (let i = 0; i <= a.length; i++) {
    arr[i][0] = i
  }

  for (let j = 0; j <= b.length; j++) {
    arr[0][j] = j
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      let cost = 0
      if (a[i - 1] == b[j - 1]) {
        cost = 0
      } else {
        cost = 1
      }

      arr[i][j] = Math.min(
        arr[i - 1][j] + 1,
        arr[i][j - 1] + 1,
        arr[i - 1][j - 1] + cost,
      )
    }
  }

  return arr[a.length][b.length]
}

function Search({
  round,
  isActive,
  activeCallback,
  searchCallback,
  id,
}: SearchProps) {
  const autosuggest = useRef<number | undefined>()
  const searched = useRef<string[]>([])
  const cachedResults = useRef<SearchLocation[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<SearchLocation[]>([])
  const [selectedEntry, setSelectedEntry] = useState<SearchLocation>()

  function handleInput(text: string) {
    clearTimeout(autosuggest.current)
    searchCallback(null, round)
    if (text == '') {
      setShowSuggestions(false)
      setSearchResults([])
      return
    }

    setShowSuggestions(true)
    setSearchResults([])

    if (!searched.current.includes(text)) {
      autosuggest.current = setTimeout(async () => {
        const results = await getAutosuggestApi(text)
        addToCache(results)
        searched.current = [...searched.current, text]
        setSearchResults(results)
      }, 1000)
    } else if (searched.current.includes(text)) {
      const maxDistance = 5
      const lower = text.toLowerCase()
      setSearchResults(
        cachedResults.current.sort(
          (a, b) =>
            levenshteinDistance(a.name, lower) -
            levenshteinDistance(b.name, lower),
        ),
      )
    }
  }

  function setEntry(result: SearchLocation) {
    const input = document.getElementById(
      `search-${id}`,
    ) as HTMLInputElement | null
    if (input != null) {
      input.value = result.name
      searchCallback(result, round)
      setSelectedEntry(result)
      activeCallback(-1)
    }
  }

  function addToCache(location: SearchLocation[]) {
    for (const elem of location) {
      if (!cachedResults.current.find((e) => e.id == elem.id)) {
        cachedResults.current.push(elem)
      }
    }
  }

  if (!isActive && showSuggestions) {
    setShowSuggestions(false)
    clearTimeout(autosuggest.current)
  }

  if (isActive && !showSuggestions && searchResults.length > 0) {
    setShowSuggestions(true)
  }

  return (
    <div
      className='search-container'
      onFocus={() => activeCallback(id)}
      // onBlur={() => activeCallback(-1)}
    >
      <div
        className={`${isActive ? 'active-border ' : ''} ${isActive && showSuggestions ? 'no-round-bottom' : ''} ${round} white-bg border-hover`}
      >
        <input
          id={`search-${id}`}
          placeholder='Skriv for å søke...'
          onChange={(text) => handleInput(text.target.value)}
          className='input-nobg text-black p-18 search-input'
          type='text'
        />
      </div>
      <SuggestionsBox
        isVisible={showSuggestions}
        results={searchResults}
        callback={setEntry}
      />
    </div>
  )
}

export default Search
