export default class Seat {
  id: number
  seatNumber: number
  positionX: number
  positionY: number
  direction: string
  seatIconId: number
  available: boolean

  constructor(
    id: number,
    seatNumber: number,
    positionX: number,
    positionY: number,
    direction: string,
    seatIconId: number,
    available: boolean,
  ) {
		this.id = id
		this.seatNumber = seatNumber
		this.positionX = positionX
		this.positionY = positionY
		this.direction = direction
		this.seatIconId = seatIconId
		this.available = available
	}

	static fromJson(json): Seat {
		return new Seat(
			json.id,
			json.seat_number,
			json.position_x,
			json.position_y,
			json.direction,
			json.seat_icon_id,
			json.available
		)
	}
}
