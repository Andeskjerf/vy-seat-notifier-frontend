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
  faArrowLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { SearchLocation } from './models/SearchLocation'
import Button from './components/Button'
import SearchResults from './components/SearchResults'
import { Journey } from './models/Journey'
import SelectedJourney from './components/SelectedJourney'

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

interface AppProps {
  setPage: Function
}

export default function App({ setPage }: AppProps) {
  const [activeSearch, setActiveSearch] = useState<number>(-1)
  const [searchState, setSearchState] = useState<SearchState>(
    new SearchState(null, null),
  )
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [selectedJourneys, setJourneys] = useState<Journey[]>([])

  setFaIcons()

  function buttonClick() {
    if (!isSearching) {
      setIsSearching(true)
      setJourneys([])
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
    const position = selectedJourneys.findIndex(
      (entry) => entry.id == journey.id,
    )
    if (position != -1) {
      selectedJourneys.splice(position, 1)
    } else {
      selectedJourneys.push(journey)
    }
    setJourneys([...selectedJourneys])
  }

  function removeFromJourneys(journey: Journey) {
    const position = selectedJourneys.findIndex(
      (entry) => entry.id == journey.id,
    )
    if (position != -1) {
      selectedJourneys.splice(position, 1)
      setJourneys([...selectedJourneys])
    } else {
      console.log('warn: unable to find journey in journeys state')
    }
  }

  return (
    <div className='flex flex-column'>
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
        <Button
          className='mt-12'
          label='Søk'
          active={searchState.bothValid()}
          callback={() => buttonClick()}
        />
        <div className='selected-journeys-container flex flex-space-between'>
          <div className='flex'>
            {selectedJourneys.length > 0 ? (
              selectedJourneys.map((entry) => {
                return (
                  <SelectedJourney
                    removeJourney={removeFromJourneys}
                    journey={entry}
                  />
                )
              })
            ) : (
              <div className='text-black self-align-center'>
                Ingen reiser valgt
              </div>
            )}
          </div>
          <div className='flex-align-end'>
            <Button
              label='Finn seter'
              callback={() => setPage(selectedJourneys)}
              active={selectedJourneys.length > 0}
            />
          </div>
        </div>
      </div>
      <div className='overflow-scroll flex-grow p-10'>
        <SearchResults
          setJourneys={addToJourneys}
          searching={isSearching}
          selectedJourneys={selectedJourneys}
          setSearching={setIsSearching}
          from={searchState.left}
          to={searchState.right}
        />
      </div>
    </div>
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
    faArrowLeft,
    faCheck,
  )
}
