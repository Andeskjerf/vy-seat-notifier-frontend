import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Journey } from '../models/Journey'
import { faCheck, faQuestion, faX } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { apiMakeOrder } from '../Api'
import './EmailConfirmed.css'

interface EmailConfirmedProps {
  email: string
  selectedJourneys: Journey[]
  totalAvailableSeats: number
}

export default function EmailConfirmed({
  email,
  selectedJourneys,
  totalAvailableSeats,
}: EmailConfirmedProps) {
  const [data, setData] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const initialized = useRef<boolean>(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true

      const apiCall = async () => {
        setData(await apiMakeOrder(email, selectedJourneys, totalAvailableSeats))
        setLoading(false)
      }

      if (loading && data === -1) {
        apiCall()
      }
    }
  }, [email])

  if (loading) {
    return <span className='loader'></span>
  }

  const headerTexts = [
    'Noe galt skjedde!',
    'Reiser følges!',
    'E-post eksisterer!',
  ]

  const paragraphTexts = [
    'En ukjent feil har oppstatt!',
    'Vi har sendt deg en e-post som bekrefter hvilke reiser vi skal varsle deg om. Har du ikke mottatt noe e-post, så kan det hende at den har havnet i søppelpost.',
    'E-posten du prøvde å legge til eksisterer allerede! Ingen endringer gjort.',
  ]

  const iconColor = ['red', 'green', 'text-black']
  const icon = [faX, faCheck, faQuestion]

  let responseIndex
  switch (data) {
    case 409:
      responseIndex = 2
      break
    case 200:
      responseIndex = 1
      break
    default:
      responseIndex = 0
      break
  }

  return (
    <>
      <div className='white-bg round-both elevation text-black p-18 email-confirmed-container'>
        <div className='flex'>
          <FontAwesomeIcon
            icon={icon[responseIndex]}
            className={`${iconColor[responseIndex]} self-align-center p-18 heading drop-shadow`}
          />
          <div className='heading self-align-center'>
            {headerTexts[responseIndex]}
          </div>
        </div>
        <p>{paragraphTexts[responseIndex]}</p>
        <p>Ta gjerne kontakt om du opplever andre problemer.</p>
      </div>
    </>
  )
}
