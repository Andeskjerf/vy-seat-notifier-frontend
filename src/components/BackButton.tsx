import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BackButton.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface BackButtonProps {
  callback: Function
}

export default function BackButton({ callback }: BackButtonProps) {
  return (
    <>
      <div
        onClick={() => callback()}
        className='elevation round-circle white-bg back-button content-align-center mb-24 text-black pointer-cursor'
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    </>
  )
}
