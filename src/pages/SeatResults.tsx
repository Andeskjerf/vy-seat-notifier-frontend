import { useEffect, useRef, useState } from 'react'
import { Journey } from '../models/Journey'
import './SeatResults.css'
import { getSeatsApi, SeatsLayout } from '../Api'
import SeatMap from '../components/SeatMap'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { createPortal } from 'react-dom'
import Overlay from '../components/Overlay'
import EmailConfirmed from './EmailConfirmed'
import Seats from '../models/Seats'

interface SeatResultsProps {
  selectedJourneys: Journey[]
}

function getJourneyIndexFromLegId(
  selectedJourneys: Journey[],
  id: string,
): number {
  let journeyIndex = -1
  for (let i = 0; i < selectedJourneys.length; i++) {
    for (let l of selectedJourneys[i].legs) {
      if (l.id == id) {
        journeyIndex = i
        break
      }
    }
    if (journeyIndex != -1) {
      break
    }
  }
  return journeyIndex
}

export default function SeatResults({ selectedJourneys }: SeatResultsProps) {
  const [journeySeats, setJourneySeats] = useState<SeatsLayout>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [emailInputted, setEmailInputted] = useState<boolean>(false)
  const [emailInput, setEmailInput] = useState<string>('')
  const legAvailableSeats = useRef(new Map())

  useEffect(() => {
    if (!loading && Object.keys(journeySeats).length == 0) {
      setLoading(true)
      getSeatsApi(selectedJourneys).then((result) => {
        Object.entries(result).forEach((e) => {
          let seatCount = 0
          let legId = e[0]
          e[1].forEach((res: Seats) => {
            seatCount += res.numberOfSeats
          })
          let index = getJourneyIndexFromLegId(selectedJourneys, legId)
          let legIndex = selectedJourneys[index].legs.findIndex(
            (leg) => leg.id == legId,
          )
          selectedJourneys[index].legs[legIndex].seatCount = seatCount
          legAvailableSeats.current.set(legId, seatCount)
        })
        setJourneySeats(result)
        setLoading(false)
      })
    }
  }, [selectedJourneys])

  const cards: JSX.Element[] = []
  if (journeySeats) {
    Object.keys(journeySeats).forEach((key) => {
      let index = getJourneyIndexFromLegId(selectedJourneys, key)
      cards.push(
        <SeatMap journey={selectedJourneys[index]} seats={journeySeats[key]} />,
      )
    })
  }

  function isValidEmail(text: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(text)
  }

  return (
    <>
      {loading ? (
        <span className='loader'></span>
      ) : (
        <div className='flex'>
          <InputField
            callback={setEmailInput}
            className='flex-grow'
            active={true}
            placeholder='Skriv epost for varsling...'
          />
          <Button
            label='Følg reiser'
            className='self-align-center ml-16'
            callback={() => setEmailInputted(true)}
            active={isValidEmail(emailInput)}
          />
        </div>
      )}
      {cards}
      {emailInputted
        ? createPortal(
            <Overlay>
              <EmailConfirmed
                email={emailInput}
                selectedJourneys={selectedJourneys}
                legAvailableSeats={legAvailableSeats.current}
              />
            </Overlay>,
            document.body,
          )
        : ''}
    </>
  )
}
