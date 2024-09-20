import { ReactElement, useEffect, useState } from 'react'
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

function showDate(date: string): ReactElement {
  return (
    <div className='text-medium text-large text-align-start mt-24 text-black'>{date}</div>
  )
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
      getSearchApi(from, to, new Date().toISOString()).then((results) => {
        setResults(results)
        setHasSearched(true)
        setSearching(false)
      })
    }
  }, [from, to, searching])

  let lastDate: string | null = null
  const entries = results.map((entry, _) => {
    let date = entry.departure.split('T')[0]
    let res = (
      <>
        {lastDate != date ? showDate(date) : ''}
        <JourneyCard
          setJourneys={() => setJourneys(entry)}
          key={entry.id}
          selectedJourneys={selectedJourneys}
          journey={entry}
        />
      </>
    )
    lastDate = date
    return res
  })

  if (!hasSearched && searching) {
    return <span className='loader'></span>
  }

  return <>{entries}</>
}
