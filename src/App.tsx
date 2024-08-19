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

class SearchState {
  left: SearchLocation | null
  right: SearchLocation | null

  constructor() {
    this.left = null
    this.right = null
  }
}

function App() {
  const [activeSearch, setActiveSearch] = useState<number>(-1)
  const [searchState, setSearchState] = useState<SearchState>(new SearchState())

  setFaIcons()

  return (
    <>
      <div>
        <div className='flex'>
          <Search
            id={0}
            activeCallback={setActiveSearch}
            searchCallback={setSearchState}
            isActive={activeSearch == 0}
            round={RoundState.Left}
          />
          <Search
            id={1}
            activeCallback={setActiveSearch}
            searchCallback={setSearchState}
            isActive={activeSearch == 1}
            round={RoundState.Right}
          />
        </div>
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
