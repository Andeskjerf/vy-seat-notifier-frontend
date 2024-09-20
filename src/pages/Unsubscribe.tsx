import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { isValidEmail } from '../utils/string'
import {
  faBan,
  faCheck,
  faGhost,
  faPoo,
} from '@fortawesome/free-solid-svg-icons'
import { unsubscribeApi } from '../Api'

interface Props {
  email: string
}

enum ValidType {
  LOADING = -1,
  SUCCESS = 0,
  NO_EMAIL = 1,
  INVALID_EMAIL = 2,
  BAD_REQUEST = 3,
}

export default function Unsubscribe({ email }: Props) {
  const [isValid, setIsValid] = useState<ValidType>(-1)
  const splitEmail = useRef<string>('')

  useEffect(() => {
    let res = email.split('=')
    if (res.length != 2 || res[0] != 'email') {
      setIsValid(ValidType.BAD_REQUEST)
    } else if (!isValidEmail(res[1])) {
      setIsValid(ValidType.INVALID_EMAIL)
    }
    splitEmail.current = res[1]

    const makeApiCall = async () => {
      const response = await unsubscribeApi(splitEmail.current)
      switch (response.status) {
        case 404:
          setIsValid(ValidType.NO_EMAIL)
          break
        case 200:
          setIsValid(ValidType.SUCCESS)
          break
      }
    }

    makeApiCall()
  })

  const headerTexts = [
    'Du er meldt ut',
    'Ingen e-post funnet',
    'Ugyldig e-post',
    'Ugyldig URL',
  ]
  const icon = [faCheck, faGhost, faBan, faPoo]
  const iconColor = ['green', 'black', 'red', 'black']
  const paragraphTexts = [
    `E-posten ${splitEmail.current} har blitt meldt ut fra fremtidige oppdateringer.`,
    `E-posten du prøvde å melde ut (${splitEmail.current}) eksisterer ikke i våre systemer.`,
    `E-posten du prøvde å melde ut (${splitEmail.current}) er ikke en gyldig e-post adresse.`,
    'Linken du har brukt inneholder feil, ingenting er gjort.',
  ]
  const index = isValid

  if (isValid == ValidType.LOADING) {
    return <span className='loader'></span>
  }

  return (
    <>
      <div className='white-bg round-both elevation text-black p-18 email-confirmed-container text-align-start'>
        <div className='flex'>
          <FontAwesomeIcon
            icon={icon[index]}
            className={`${iconColor[index]} self-align-center p-18 heading drop-shadow`}
          />
          <div className='heading self-align-center'>{headerTexts[index]}</div>
        </div>
        <p>{paragraphTexts[index]}</p>
        <p>Ta gjerne kontakt om du opplever andre problemer.</p>
      </div>
    </>
  )
}
