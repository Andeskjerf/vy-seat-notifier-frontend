import { useEffect, useState } from 'react'
import { SearchLocation } from '../models/SearchLocation'
import { Journey } from '../models/Journey'
import { getSearchApi } from '../Api'

interface SearchResultProps {
  from: SearchLocation | null
  to: SearchLocation | null
  searching: boolean
  setSearching: Function
}

export default function SearchResult({
  from,
  to,
  searching,
  setSearching,
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

  const entries = results.map((entry, index) => {
    return entry.id
  })

  return (
    <>
      {!hasSearched && searching ? (
        <span className='loader'></span>
      ) : (
        <>{entries}</>
      )}
      <div></div>
    </>
  )
}
