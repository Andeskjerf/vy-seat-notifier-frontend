import { useEffect } from 'react'
import { Journey } from '../models/Journey'
import './SeatResults.css'
import { getSeatsApi } from '../Api'

interface SeatResultsProps {
  selectedJourneys: Journey[]
}

export default function SeatResults({ selectedJourneys }: SeatResultsProps) {
  useEffect(() => {
		getSeatsApi(selectedJourneys)
  }, [selectedJourneys])

  return (
    <>
      <span className='loader'></span>
      <div></div>
    </>
  )
}
