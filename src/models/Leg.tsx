import Duration from './Duration'
import Line from './Line'
import { SearchLocation } from './SearchLocation'

export default class Leg {
  enturId: string
  id: string
  line: Line
  mode: string
  arrival: string
  arrivalScheduled: string
  departure: string
  departureScheduled: string
  duration: Duration
  from: SearchLocation
  to: SearchLocation

  constructor(
    enturId: string,
    id: string,
    line: Line,
    mode: string,
    arrival: string,
    arrivalScheduled: string,
    departure: string,
    departureScheduled: string,
    duration: Duration,
		from: SearchLocation,
		to: SearchLocation,
  ) {
    this.enturId = enturId
    this.id = id
    this.line = line
    this.mode = mode
    this.arrival = arrival
    this.arrivalScheduled = arrivalScheduled
    this.departure = departure
    this.departureScheduled = departureScheduled
    this.duration = duration
		this.from = from
		this.to = to
  }

  static fromJson(json: any): Leg {
    return new Leg(
      json.entur_id,
      json.id,
      Line.fromJson(json.line),
      json.mode,
      json.arrival,
      json.arrival_scheduled,
      json.departure,
      json.departure_scheduled,
      Duration.fromJson(json.duration),
			SearchLocation.fromJson(json.from),
			SearchLocation.fromJson(json.to),
    )
  }
}
