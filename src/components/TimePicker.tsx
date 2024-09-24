import {
  faChevronLeft,
  faChevronRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import './TimePicker.css'
import { isCharNumeric } from '../utils/string'

interface Props {}

export default function TimePicker({}: Props) {
  const date = new Date()

  const [hour, setHour] = useState<number>(date.getHours())
  const [minute, setMinute] = useState<number>(date.getMinutes())
  const [focused, setFocused] = useState<HTMLDivElement>()
  const timeInput = useRef<number[]>([0, 0])
  const timeIndex = useRef<number>(1)

  const changeTime = (increment: boolean) => {
    // we want to unfocus any of the inputs if they're focused
    if (focused != undefined) {
      unfocusElement()
      setFocused(undefined)
    }

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

  const handleTimeInput = (text: KeyboardEvent) => {
    if (!focused) throw 'there is no focused element'
    if (!isCharNumeric(text.key)) return

    const isHourInput = focused.id == 'hour_input'

    const key = Number.parseInt(text.key)
    const i = timeIndex.current
    if (
      (isHourInput && i == 0 && key > 2) ||
      (isHourInput && i == 1 && timeInput.current[0] == 2 && key > 3) ||
      (!isHourInput && i == 0 && key > 5)
    ) {
      return
    }

    timeInput.current[i] = key
    timeIndex.current = i == 1 ? 0 : 1

    focused.innerText = timeInput.current.join('')
  }

  const unfocusElement = () => {
    focused?.classList.remove('selected-input')
    focused?.removeEventListener('keydown', handleTimeInput)
  }

  const focusElement = (elem: HTMLDivElement) => {
    unfocusElement()

    if (elem == focused) {
      setFocused(undefined)
      return
    }

    setFocused(elem)
  }

  useEffect(() => {
    timeInput.current = [0, 0]
    timeIndex.current = 1
    focused?.classList.add('selected-input')
    focused?.addEventListener('keydown', handleTimeInput)
  }, [focused])

  return (
    <div className='round-both white-bg width-fit-content flex border'>
      <Chevron
        id='time_hour'
        icon={faChevronLeft}
        onClick={() => changeTime(false)}
      />
      <div className='flex text-black no-select ptb-8'>
        <TimeInput time={hour} id='hour_input' focusElem={focusElement} />
        <div>:</div>
        <TimeInput time={minute} id='minute_input' focusElem={focusElement} />
      </div>
      <Chevron
        id='time_minute'
        icon={faChevronRight}
        onClick={() => changeTime(true)}
      />
    </div>
  )
}

interface ChevronProps {
  icon: IconDefinition
  id: string
  onClick: Function
}

function Chevron({ icon, id, onClick }: ChevronProps) {
  return (
    <div
      id={id}
      className='flex chevron-btn pointer-cursor'
      onClick={() => onClick()}
    >
      <FontAwesomeIcon
        className='text-black self-align-center pr-8 '
        icon={icon}
      />
    </div>
  )
}

interface TimeInputProps {
  time: number
  id: string
  focusElem: Function
}

function TimeInput({ time, id, focusElem }: TimeInputProps) {
  return (
    <div
      id={id}
      tabIndex={0}
      onClick={(elem) => focusElem(elem.currentTarget)}
      className='hover round-both'
    >
      {String(time).padStart(2, '0')}
    </div>
  )
}
