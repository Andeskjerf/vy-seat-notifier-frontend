export default class Duration {
  days: number
  hours: number
  minutes: number

  constructor(days: number, hours: number, minutes: number) {
    this.days = days
    this.hours = hours
    this.minutes = minutes
  }

  prettyPrint(): string {
    return `( ${this.hours} t ${this.minutes} m )`
  }

	static fromJson(json): Duration {
		console.log(json)
      return new Duration(
        json.days,
        json.hours,
        json.minutes,
      )
	}
}
