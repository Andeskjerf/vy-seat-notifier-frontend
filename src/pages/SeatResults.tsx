import { useEffect, useState } from 'react'
import { Journey } from '../models/Journey'
import './SeatResults.css'
import { apiMakeOrder, getSeatsApi, SeatsLayout } from '../Api'
import SeatMap from '../components/SeatMap'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { createPortal } from 'react-dom'
import Overlay from '../components/Overlay'
import EmailConfirmed from './EmailConfirmed'

interface SeatResultsProps {
  selectedJourneys: Journey[]
}

export default function SeatResults({ selectedJourneys }: SeatResultsProps) {
  const [journeySeats, setJourneySeats] = useState<SeatsLayout>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [emailInputted, setEmailInputted] = useState<boolean>(false)
  const [emailInput, setEmailInput] = useState<string>('')

  useEffect(() => {
    if (!loading && Object.keys(journeySeats).length == 0) {
      setLoading(true)
      getSeatsApi(selectedJourneys).then((result) => {
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
        setLoading(false)
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

  function isValidEmail(text: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(text)
  }

  function handleEmailInput(text: string) {
    setEmailInput(text)
  }

  function makeOrder(email: string) {
    setEmailInputted(true)
    apiMakeOrder(email, selectedJourneys).then((res) => {
      console.log(res)
    })
  }

  return (
    <>
      {loading ? (
        <span className='loader'></span>
      ) : (
        <div className='flex'>
          <InputField
            callback={handleEmailInput}
            className='flex-grow'
            active={true}
            placeholder='Skriv epost for varsling...'
          />
          <Button
            label='Følg reiser'
            className='self-align-center ml-16'
            callback={() => makeOrder(emailInput)}
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
              />
            </Overlay>,
            document.body,
          )
        : ''}
    </>
  )
}
