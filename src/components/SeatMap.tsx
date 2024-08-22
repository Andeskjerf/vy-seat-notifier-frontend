import { Journey } from '../models/Journey'
import { timeFromDateTime } from '../utils/date'
import LineBadge from './LineBadge'

interface SeatMapProps {
  journey: Journey
}

export default function SeatMap({ journey }: SeatMapProps) {
  const fromTime = timeFromDateTime(journey.departure).substring(0, 5)
  const toTime = timeFromDateTime(journey.arrival).substring(0, 5)
  return (
    <>
      <div className='white-bg round-both flex flex-column'>
        <div className='flex flex-space-between'>
          <div className='flex'>
            <div>
              {fromTime} - {toTime}
            </div>
            <div>{journey.totalDuration.prettyPrint()}</div>
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
