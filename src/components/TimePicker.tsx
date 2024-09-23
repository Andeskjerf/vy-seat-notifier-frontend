import {
  faChevronLeft,
  faChevronRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './TimePicker.css'

interface Props {}

export default function TimePicker({}: Props) {
  const date = new Date()

  const [hour, setHour] = useState<number>(date.getHours())
  const [minute, setMinute] = useState<number>(date.getMinutes())

  const changeTime = (increment: boolean) => {
    let totalMinutes = hour * 60 + minute
    const remainder = totalMinutes % 60

    if (remainder > 0 && remainder < 30) {
      totalMinutes += increment ? 30 - remainder : -remainder
    } else if (remainder > 30 && remainder < 60) {
      totalMinutes += increment ? 60 - remainder : 30 - remainder
    } else {
      totalMinutes += increment ? 30 : -30
    }

    if (totalMinutes < 0) {
      totalMinutes = 24 * 60 - 30
    } else if (totalMinutes >= 24 * 60) {
      totalMinutes = 0
    }

    setMinute(totalMinutes % 60)
    setHour(Math.floor(totalMinutes / 60))
  }

  return (
    <div className='round-both white-bg width-fit-content flex border'>
      <Chevron
        icon={faChevronLeft}
        onClick={() => changeTime(false)}
      />
      <div className='flex text-black no-select ptb-8'>
        <div className='hover round-both'>{String(hour).padStart(2, '0')}</div>
        <div>:</div>
        <div className='hover round-both'>
          {String(minute).padStart(2, '0')}
        </div>
      </div>
      <Chevron
        icon={faChevronRight}
        onClick={() => changeTime(true)}
      />
    </div>
  )
}

interface ChevronProps {
  icon: IconDefinition
  onClick: Function
}

function Chevron({ icon, onClick }: ChevronProps) {
  return (
    <div className='flex chevron-btn pointer-cursor' onClick={() => onClick()}>
      <FontAwesomeIcon
        className='text-black self-align-center pr-8 '
        icon={icon}
      />
    </div>
  )
}
