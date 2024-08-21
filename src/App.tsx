import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { RoundState } from './components/Search'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrain,
  faBusSimple,
  faPlaneDeparture,
  faLocationPin,
  faTrainTram,
  faFerry,
  faCity,
  faTrainSubway,
} from '@fortawesome/free-solid-svg-icons'
import { SearchLocation } from './models/SearchLocation'
import Button from './components/Button'
import SearchResults from './components/SearchResults'
import { Journey } from './models/Journey'

class SearchState {
  left: SearchLocation | null
  right: SearchLocation | null

  constructor(left: SearchLocation | null, right: SearchLocation | null) {
    this.left = left
    this.right = right
  }

  bothValid(): boolean {
    return this.left != null && this.right != null
  }

  clear() {
    this.left = null
    this.right = null
  }
}

function App() {
  const [activeSearch, setActiveSearch] = useState<number>(-1)
  const [searchState, setSearchState] = useState<SearchState>(
    new SearchState(null, null),
  )
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [journeys, setJourneys] = useState<Journey[]>([])

  setFaIcons()

  function buttonClick() {
    if (!isSearching) {
      setIsSearching(true)
    }
  }

  function updateSearchState(
    location: SearchLocation | null,
    round: RoundState,
  ) {
    const state: SearchState = searchState
    if (round == RoundState.Left) {
      state.left = location
    } else {
      state.right = location
    }
    setSearchState(new SearchState(state.left, state.right))
  }

  function addToJourneys(journey: Journey) {
    const position = journeys.findIndex((entry) => entry.id == journey.id)
    if (position != -1) {
      journeys.splice(position, 1)
    } else {
      journeys.push(journey)
    }
    setJourneys([...journeys])
  }

  return (
    <>
      <div>
        <div className='flex'>
          <Search
            id={0}
            activeCallback={setActiveSearch}
            searchCallback={updateSearchState}
            isActive={activeSearch == 0}
            round={RoundState.Left}
          />
          <Search
            id={1}
            activeCallback={setActiveSearch}
            searchCallback={updateSearchState}
            isActive={activeSearch == 1}
            round={RoundState.Right}
          />
        </div>
        <div className='mt-12'>
          <Button
            label='Søk'
            active={searchState.bothValid()}
            callback={() => buttonClick()}
          />
        </div>
        <div className='flex'>
          {journeys.map((entry) => {
            return <div className='text-black mr-10'>{entry.departure}</div>
          })}
        </div>
        <SearchResults
          setJourneys={addToJourneys}
          searching={isSearching}
          setSearching={setIsSearching}
          from={searchState.left}
          to={searchState.right}
        />
      </div>
    </>
  )
}

function setFaIcons() {
  library.add(
    faTrain,
    faBusSimple,
    faPlaneDeparture,
    faLocationPin,
    faTrainTram,
    faFerry,
    faCity,
    faTrainSubway,
  )
}

export default App
