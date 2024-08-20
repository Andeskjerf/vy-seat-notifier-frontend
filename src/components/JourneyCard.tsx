import { Journey } from '../models/Journey'
import './JourneyCard.css'

interface JourneyCardProps {
  journey: Journey
}

function timeFromDateTime(input: string): string {
  const match = input.match(/T(\d{2}:\d{2}:\d{2})/)
  if (match) {
    return match[1]
  } else {
    console.log('no time found in datetime')
    return '-1'
  }
}

export default function JourneyCard({ journey }: JourneyCardProps) {
  const fromTime = timeFromDateTime(journey.departure).substring(0, 5)
  const toTime = timeFromDateTime(journey.arrival).substring(0, 5)
  return (
    <>
				<div className='journey-card elevation mt-24 p-18 white-bg round-both'>
        <div className='flex text-black text-large'>
          <div className='text-medium'>
            {fromTime} - {toTime}
          </div>
        </div>
      </div>
    </>
  )
}
