import { useEffect, useState } from 'react'
import { SearchLocation } from '../models/SearchLocation'
import { Journey } from '../models/Journey'
import { getSearchApi } from '../Api'
import JourneyCard from './JourneyCard'

interface SearchResultProps {
  from: SearchLocation | null
  to: SearchLocation | null
  searching: boolean
  setSearching: Function
  setJourneys: Function
	selectedJourneys: Journey[]
}

export default function SearchResult({
  from,
  to,
  searching,
	selectedJourneys,
  setSearching,
  setJourneys,
}: SearchResultProps) {
  const [hasSearched, setHasSearched] = useState<boolean>()
  const [results, setResults] = useState<Journey[]>([])

  useEffect(() => {
    if (from && to && searching) {
      setHasSearched(false)
      getSearchApi(from, to).then((results) => {
        setResults(results)
        setHasSearched(true)
        setSearching(false)
      })
    }
  }, [from, to, searching])

  const entries = results.map((entry, _) => {
    return (
      <JourneyCard
        setJourneys={() => setJourneys(entry)}
        key={entry.id}
				selectedJourneys={selectedJourneys}
        journey={entry}
      />
    )
  })

  return (
    <>
      {!hasSearched && searching ? (
        <span className='loader'></span>
      ) : (
        <>{entries}</>
      )}
    </>
  )
}
