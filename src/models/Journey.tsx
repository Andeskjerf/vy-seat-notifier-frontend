// pub struct Journey {
//     departure: String,
//     arrival: String,
//     #[serde(alias = "departureScheduled")]
//     departure_scheduled: String,
//     #[serde(alias = "arrivalScheduled")]
//     arrival_scheduled: String,
//     #[serde(alias = "totalDuration")]
//     total_duration: Duration,
//     pub legs: Vec<Leg>,
//     pub from: Destination,
//     pub to: Destination,
//     id: String,
// }

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

  constructor(
    id: string,
    departure: string,
    arrival: string,
    departureScheduled: string,
    arrivalScheduled: string,
    totalDuration: Duration,
    from: SearchLocation,
    to: SearchLocation,
  ) {
    this.id = id
    this.departure = departure
    this.arrival = arrival
    this.departureScheduled = departureScheduled
    this.arrivalScheduled = arrivalScheduled
    this.totalDuration = totalDuration
    this.from = from
    this.to = to
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
    )
  }
}

class Duration {
  days: number
  hours: number
  minutes: number

  constructor(days: number, hours: number, minutes: number) {
    this.days = days
    this.hours = hours
    this.minutes = minutes
  }
}
