import './SeatMap.css'
import { Journey } from '../models/Journey'
import Seats from '../models/Seats'
import { timeFromDateTime } from '../utils/date'
import LineBadge from './LineBadge'

interface SeatMapProps {
  journey: Journey
  seats: Seats[]
}

export default function SeatMap({ journey, seats }: SeatMapProps) {
  const fromTime = timeFromDateTime(journey.departure).substring(0, 5)
  const toTime = timeFromDateTime(journey.arrival).substring(0, 5)

  return (
    <>
      <div className='seats-parent-container white-bg round-both flex flex-column elevation mt-24 p-18 flex-space-between'>
        <div className='flex flex-space-between'>
          <div className='flex text-black text-large'>
            <div className='text-medium content-align-center'>
              {fromTime} - {toTime}
            </div>
            <div className='text-label-large text-grey text-medium ml-12 content-align-center'>
              {journey.totalDuration.prettyPrint()}
            </div>
          </div>
          <div className='content-align-center'>
            <LineBadge
              mode={journey.legs[0].mode}
              lineCode={journey.legs[0].line.name}
              serviceDestination={journey.legs[0].line.serviceDestination}
            />
          </div>
        </div>
        {seats.length > 0 ? (
          seats.map((entry: Seats) => {
            let windowSeats = 0
            let windowSeatsVacant = 0
            let hallSeats = 0
            let hallSeatsVacant = 0
            entry.railcarElements.forEach((entry) => {
              if (entry.seatNumber % 4 == 0 || entry.seatNumber % 4 == 1) {
                windowSeats++
                if (entry.available) windowSeatsVacant++
              } else {
                hallSeats++
                if (entry.available) hallSeatsVacant++
              }
            })

            return (
              <div className='seats-container round-both pure-white-bg elevation mt-24 flex flex-column'>
                <div className='text-black text-large text-medium flex flex-space-between p-18'>
                  <div>Vogn {entry.carNumber}</div>
                  <div>{entry.numberOfSeats}</div>
                </div>
                <div className='text-black pl-18 text-align-start pb-18'>
                  <div>
                    {windowSeatsVacant} av {windowSeats} ledig vindus seter
                  </div>
                  <div>
                    {hallSeatsVacant} av {hallSeats} ledig gang seter
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className='text-black text-align-start'>
            Denne reisen er utsolgt eller kansellert
          </div>
        )}
      </div>
    </>
  )
}
