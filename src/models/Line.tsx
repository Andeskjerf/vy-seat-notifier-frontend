export default class Line {
  name: string
  longName: string | null
  serviceLineId: string
  colour: string
  backgroundColour: string
  borderColour: string | null
  textColour: string
  serviceDestination: string
  serviceDeparture: string | null
  operator: string | null

  constructor(
    name: string,
    longName: string | null,
    serviceLineId: string,
    colour: string,
    backgroundColour: string,
    borderColour: string | null,
    textColour: string,
    serviceDestination: string,
    serviceDeparture: string | null,
    operator: string | null,
  ) {
    this.name = name
    this.longName = longName
    this.serviceLineId = serviceLineId
    this.colour = colour
    this.backgroundColour = backgroundColour
    this.borderColour = borderColour
    this.textColour = textColour
    this.serviceDestination = serviceDestination
    this.serviceDeparture = serviceDeparture
    this.operator = operator
  }

  static fromJson(json: any) {
    return new Line(
      json.name,
      json.long_name || null,
      json.service_line_id,
      json.colour,
      json.background_color,
      json.border_color || null,
      json.text_color,
      json.service_destination,
      json.service_departure || null,
      json.operator || null,
    )
  }
}
