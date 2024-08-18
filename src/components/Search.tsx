import { useState } from 'react'
import './Search.css'
import { API_URL } from '../Consts'
import { SearchLocation } from '../models/SearchLocation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  results: SearchLocation[]
  callback: Function
}

interface SuggestionEntryProps {
  result: SearchLocation
  isLast: boolean
  callback: Function
}

function makeSearchUrl(search: string): string {
  return `${API_URL}/services/location/places/autosuggest?query=${search}&searchOrigin=default`
}

function dummyApiResponse(name: string, description: string): SearchLocation {
  const response = {
    id: '',
    name: `${name}`,
    categories: [
      {
        id: 'railway-station',
        name: 'Togstasjon',
      },
      {
        id: 'bus-stop',
        name: '',
      },
    ],
    position: {
      latitude: 0,
      longitude: 0,
    },
    shortDescription: `${description}`,
    externalReferences: [],
    debugInfo: {
      origin: '',
    },
  }

  return SearchLocation.fromJson(response)
}

async function makeApiRequest(search: string): Promise<SearchLocation[]> {
  // we're not allowed to make a GET request to Vy from our website
  // we need our own server that does it on our behalf
  // in the meantime, dummy function
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          dummyApiResponse('Oslo S', 'Knutepunkt i Oslo'),
          dummyApiResponse(
            'Scandic Oslo Airport',
            'Stoppested i Nannestad, Akershus',
          ),
        ]),
      500,
    )
  })

  // return await fetch(makeSearchUrl(search), {
  // mode: "no-cors",
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
}

function SuggestionEntry({ result, isLast, callback }: SuggestionEntryProps) {
  const class_ = isLast ? 'round-bottom' : ''

  const categories = result.categories.map((entry, index) => {
		let icon = ''
		switch (entry.id) {
			case 'railway-station':
				icon = 'train'
				break
			case 'bus-stop':
				icon = 'bus-simple'
				break
		}
    return <FontAwesomeIcon icon={icon} key={entry.id} className='self-align-center pl-6' />
  })

  return (
    <>
      <div
        onClick={() => callback(result)}
        className={`${class_} hover-overlay text-align-start text-black p-10 no-select pointer-cursor round-both m-6 flex flex-space-between`}
      >
        <div className='flex flex-column'>
          <div>{result.name}</div>
          <div className='text-label'>{result.description}</div>
        </div>
        <div className='flex'>{categories}</div>
      </div>
    </>
  )
}

function SuggestionsBox({ isVisible, results, callback }: SuggestionsBoxProps) {
  if (!isVisible) {
    return null
  }

  const entries = results.map((entry, index) => (
    <>
      <SuggestionEntry
        key={index}
        result={entry}
        isLast={index == results.length - 1}
        callback={callback}
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
  const [searchResults, setSearchResults] = useState<SearchLocation[]>([])
  const [selectedEntry, setSelectedEntry] = useState<SearchLocation>()

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

  function setEntry(result: SearchLocation) {
    const input = document.getElementById(
      `search-${id}`,
    ) as HTMLInputElement | null
    if (input != null) {
      input.value = result.name
      setSelectedEntry(result)
      activeCallback(-1)
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
