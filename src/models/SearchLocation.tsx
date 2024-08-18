export class SearchLocation {
  id: string
  name: string
  categories: Category[]
  position: Position
  description: string

  constructor(
    id: string,
    name: string,
    categories: Category[],
    position: Position,
    description: string,
  ) {
    this.id = id
    this.name = name
    this.categories = categories
    this.position = position
    this.description = description
  }

  static fromJson(json: any): SearchLocation {
    return new SearchLocation(
      json.id,
      json.name,
      json.categories.map(
        (category: any) => new Category(category.id, category.name),
      ),
      new Position(json.position.latitude, json.position.longitude),
      json.shortDescription,
    )
  }
}

class Category {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}

class Position {
  latitude: number
  longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }
}
