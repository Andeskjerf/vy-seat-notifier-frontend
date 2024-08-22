import { useEffect, useState } from 'react'
import { Journey } from '../models/Journey'
import './SeatResults.css'
import { getSeatsApi, SeatsLayout } from '../Api'
import Seats from '../models/Seats'
import SeatMap from '../components/SeatMap'

interface SeatResultsProps {
  selectedJourneys: Journey[]
}

export default function SeatResults({ selectedJourneys }: SeatResultsProps) {
  const [journeySeats, setJourneySeats] = useState<SeatsLayout>()

  useEffect(() => {
    getSeatsApi(selectedJourneys).then((result) => setJourneySeats(result))
  }, [selectedJourneys])

  const cards: JSX.Element[] = []
  if (journeySeats) {
    Object.keys(journeySeats).forEach((key) => {
      cards.push(
        <SeatMap
          journey={selectedJourneys.find((entry) => entry.id == key)}
          seats={journeySeats[key]}
        />,
      )
    })
  }

  return <>{cards.length == 0 ? <span className='loader'></span> : cards}</>
}
