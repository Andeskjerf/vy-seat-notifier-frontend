import Line from './Line'

export default class Leg {
  enturId: string
  id: string
  line: Line
  mode: string

  constructor(enturId: string, id: string, line: Line, mode: string) {
    this.enturId = enturId
    this.id = id
    this.line = line
    this.mode = mode
  }

  static fromJson(json: any): Leg {
    return new Leg(
      json.enturId,
      json.id,
      Line.fromJson(json.line),
      json.mode,
    )
  }
}
