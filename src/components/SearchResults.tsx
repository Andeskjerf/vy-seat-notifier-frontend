import { ReactElement, useEffect, useState } from 'react'
import { SearchLocation } from '../models/SearchLocation'
import { Journey } from '../models/Journey'
import { getSearchApi } from '../Api'
import JourneyCard from './JourneyCard'
import Button from './Button'

interface SearchResultProps {
  from: SearchLocation | null
  to: SearchLocation | null
  isoDate: string
  searching: boolean
  setSearching: Function
  setJourneys: Function
  selectedJourneys: Journey[]
}

function showDate(date: string): ReactElement {
  return (
    <div className='text-medium text-large text-align-start mt-24 text-black'>
      {date}
    </div>
  )
}

export default function SearchResult({
  from,
  to,
  isoDate,
  searching,
  selectedJourneys,
  setSearching,
  setJourneys,
}: SearchResultProps) {
  const [results, setResults] = useState<Journey[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (from && to && searching) {
      getSearchApi(from, to, isoDate).then((results) => {
        setResults(results)
        setSearching(false)
      })
    }
  }, [from, to, searching])

  const loadMoreJourneys = () => {
    if (from && to) {
      setLoading(true)
      let date = results[results.length - 1].departure
      getSearchApi(from, to, date).then((newResults) => {
        // slice away the first result from API call
        // it's the same as the last entry of results
        setResults([...results, ...newResults.slice(1)])
        setLoading(false)
      })
    } else {
      alert('how did this happen')
    }
  }

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

  if (searching) {
    return <span className='loader'></span>
  }

  return (
    <>
      {entries}
      <div className='mt-24'>
        {loading ? (
          <span className='loader'></span>
        ) : (
          <Button
            label='Last flere'
            callback={() => loadMoreJourneys()}
            active={true}
          />
        )}
      </div>
    </>
  )
}
