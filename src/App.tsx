import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { RoundState } from './components/Search'

function App() {
  const [activeSearch, setActiveSearch] = useState<number>(-1)

  return (
    <>
      <div className='flex'>
        <Search id={0} activeCallback={setActiveSearch} isActive={activeSearch == 0} round={RoundState.Left} />
        <div className='search-divider'></div>
        <Search id={1} activeCallback={setActiveSearch} isActive={activeSearch == 1} round={RoundState.Right} />
      </div>
    </>
  )
}

export default App
