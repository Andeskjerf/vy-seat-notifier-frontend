import { Journey } from '../models/Journey'
import { timeFromDateTime } from '../utils/date'
import Button from './Button'
import './JourneyCard.css'
import LineBadge from './LineBadge'

interface JourneyCardProps {
  journey: Journey
  journeys: Journey[]
  setJourneys: Function
}

export default function JourneyCard({
  journey,
  journeys,
  setJourneys,
}: JourneyCardProps) {
  const fromTime = timeFromDateTime(journey.departure).substring(0, 5)
  const toTime = timeFromDateTime(journey.arrival).substring(0, 5)
  return (
    <>
      <div className='journey-card flex elevation mt-24 p-18 white-bg round-both flex-space-between'>
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
        <div className='flex flex-align-end '>
          <Button
            label={
              journeys.find((entry) => entry.id == journey.id)
                ? 'Fjern'
                : 'Legg til'
            }
            callback={() => setJourneys()}
            active={true}
          />
        </div>
      </div>
    </>
  )
}
