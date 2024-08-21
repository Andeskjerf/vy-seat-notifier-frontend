import { Journey } from '../models/Journey'
import { timeFromDateTime } from '../utils/date'
import './SelectedJourney.css'

interface SelectedJourneyProps {
  journey: Journey
  removeJourney: Function
}

export default function SelectedJourney({
  journey,
  removeJourney,
}: SelectedJourneyProps) {
  const fromTime = timeFromDateTime(journey.departure).substring(0, 5)
  const toTime = timeFromDateTime(journey.arrival).substring(0, 5)

  function toggleRemoveButton(show: boolean) {
    const elem = document.getElementById(`selected-delete-${journey.id}`)
    if (elem && show) {
      elem.classList.add('show')
    } else if (elem && !show) {
      elem.classList.remove('show')
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => toggleRemoveButton(true)}
        onMouseLeave={() => toggleRemoveButton(false)}
        className='white-bg round-both mr-12 mt-12 p-10 text-black flex flex-column elevation no-select relative'
      >
        <div className='text-medium'>{fromTime}</div>
        <div className='text-medium'>{toTime}</div>
        <div className='text-bold'>{journey.legs[0].line.name}</div>
        <div
          onClick={() => removeJourney(journey)}
          id={`selected-delete-${journey.id}`}
          className='white-bg absolute x-remove elevation pointer-cursor text-medium'
        >
          x
        </div>
      </div>
    </>
  )
}
