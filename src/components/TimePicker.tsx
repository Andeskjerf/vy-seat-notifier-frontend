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

  const chevronClick = (increment: boolean) => {
    let _minute = minute
    let _hour = hour

    if (minute > 0 && minute < 30) {
      _minute = increment ? 30 : 0
    } else if (minute > 30 && minute < 60) {
      _minute = increment ? 0 : 30
      if (increment) {
        _hour += 1
      }
    } else {
      increment ? (_minute += 30) : (_minute -= 30)
      if (_minute >= 60) {
        _hour += 1
        _minute = 0
      } else if (_minute < 0) {
        _hour -= 1
        _minute = 30
      }
    }
    if (_hour < 0) {
      _hour = 23
    } else if (_hour > 23) {
      _hour = 0
    }

    setHour(_hour)
    setMinute(_minute)
  }

  return (
    <div className='round-both white-bg width-fit-content flex border'>
      <Chevron icon={faChevronLeft} onClick={() => chevronClick(false)} />
      <div className='flex text-black no-select ptb-8'>
        <div className='hover round-both'>{String(hour).padStart(2, '0')}</div>
        <div>:</div>
        <div className='hover round-both'>
          {String(minute).padStart(2, '0')}
        </div>
      </div>
      <Chevron icon={faChevronRight} onClick={() => chevronClick(true)} />
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
