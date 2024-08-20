import { Journey } from '../models/Journey'
import './JourneyCard.css'
import LineBadge from './LineBadge'

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
        <div className='flex flex-column'>
          <div className='flex text-black text-large'>
            <div className='text-medium'>
              {fromTime} - {toTime}
            </div>
            <div className='text-label-large text-grey text-medium ml-12 content-align-center'>
              {journey.totalDuration.prettyPrint()}
            </div>
          </div>
          <LineBadge
            mode={journey.legs[0].mode}
            lineCode={journey.legs[0].line.name}
						serviceDestination={journey.legs[0].line.serviceDestination}
          />
        </div>
      </div>
    </>
  )
}
