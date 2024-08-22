import Seat from './Seat'

export default class Seats {
  id: number
  carNumber: number
  sequence: number
  numberOfSeats: number
  numberOfBeds: number
  railcarSetId: number
  litraCode: string
  rotated: boolean
  railcarElements: Seat[]

  constructor(
    id: number,
    carNumber: number,
    sequence: number,
    numberOfSeats: number,
    numberOfBeds: number,
    railcarSetId: number,
    litraCode: string,
    rotated: boolean,
    railcarElements: Seat[],
  ) {
    this.id = id
    this.carNumber = carNumber
    this.sequence = sequence
    this.numberOfSeats = numberOfSeats
    this.numberOfBeds = numberOfBeds
    this.railcarSetId = railcarSetId
    this.litraCode = litraCode
    this.rotated = rotated
    this.railcarElements = railcarElements
  }

  static fromJson(json): Seats {
    return new Seats(
      json.id,
      json.carNumber,
      json.sequence,
      json.numberOfSeats,
      json.numberOfBeds,
      json.railcarSetId,
      json.litraCode,
      json.rotated,
      json.railcarElements.map((entry) => Seat.fromJson(entry)),
    )
  }
}
