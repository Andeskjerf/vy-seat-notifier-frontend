import { useEffect, useState } from 'react'
import { Journey } from '../models/Journey'
import './SeatResults.css'
import { getSeatsApi, SeatsLayout } from '../Api'
import SeatMap from '../components/SeatMap'

interface SeatResultsProps {
  selectedJourneys: Journey[]
}

export default function SeatResults({ selectedJourneys }: SeatResultsProps) {
  const [journeySeats, setJourneySeats] = useState<SeatsLayout>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      getSeatsApi(selectedJourneys).then((result) => {
        setLoading(false)
        Object.keys(result).sort((a, b) => {
          let j1 = Math.floor(
            new Date(
              selectedJourneys.find((entry) => entry.id == a)?.departure,
            ).getTime() / 1000,
          )
          let j2 = Math.floor(
            new Date(
              selectedJourneys.find((entry) => entry.id == b)?.departure,
            ).getTime() / 1000,
          )

          return j1 - j2
        })
        setJourneySeats(result)
      })
    }
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

  return <>{loading ? <span className='loader'></span> : cards}</>
}
