import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { RoundState } from './components/Search'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrain, faBusSimple, faPlaneDeparture, faLocationPin } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [activeSearch, setActiveSearch] = useState<number>(-1)
  library.add(faTrain, faBusSimple, faPlaneDeparture, faLocationPin)

  return (
    <>
      <div className='flex'>
        <Search
          id={0}
          activeCallback={setActiveSearch}
          isActive={activeSearch == 0}
          round={RoundState.Left}
        />
        <Search
          id={1}
          activeCallback={setActiveSearch}
          isActive={activeSearch == 1}
          round={RoundState.Right}
        />
      </div>
    </>
  )
}

export default App
