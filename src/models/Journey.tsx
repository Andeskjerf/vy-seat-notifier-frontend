import Duration from './Duration'
import Leg from './Leg'
import { SearchLocation } from './SearchLocation'

export class Journey {
  id: string
  departure: string
  arrival: string
  departureScheduled: string
  arrivalScheduled: string
  totalDuration: Duration
  from: SearchLocation
  to: SearchLocation
  legs: Leg[]

  constructor(
    id: string,
    departure: string,
    arrival: string,
    departureScheduled: string,
    arrivalScheduled: string,
    totalDuration: Duration,
    from: SearchLocation,
    to: SearchLocation,
    legs: Leg[],
  ) {
    this.id = id
    this.departure = departure
    this.arrival = arrival
    this.departureScheduled = departureScheduled
    this.arrivalScheduled = arrivalScheduled
    this.totalDuration = totalDuration
    this.from = from
    this.to = to
    this.legs = legs
  }

  static fromJson(json: any): Journey {
    return new Journey(
      json.id,
      json.departure,
      json.arrival,
      json.departure_scheduled,
      json.arrival_scheduled,
      new Duration(
        json.total_duration.days,
        json.total_duration.hours,
        json.total_duration.minutes,
      ),
      json.from,
      json.to,
      json.legs.map((entry) => {
        return Leg.fromJson(entry)
      }),
    )
  }
}

