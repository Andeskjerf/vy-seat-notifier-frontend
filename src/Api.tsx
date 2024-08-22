import { API_URL } from './Consts'
import { Journey } from './models/Journey'
import { SearchLocation } from './models/SearchLocation'
import Seats from './models/Seats'

export async function getAutosuggestApi(
  search: string,
): Promise<SearchLocation[]> {
  const response = await fetch(`${API_URL}/autosuggest?query=${search}`, {
    headers: {
      'Access-Control-Allow-Origin': API_URL,
      'Content-Type': 'application/json',
    },
  })

  const json = await response.json()
  return json.map((entry) => {
    return SearchLocation.fromJson(entry)
  })
}

export async function getSearchApi(
  from: SearchLocation,
  to: SearchLocation,
): Promise<Journey[]> {
  const response = await fetch(`${API_URL}/search`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': API_URL,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([from, to]),
  })

  const json = await response.json()
  return json.map((entry) => {
    return Journey.fromJson(entry)
  })
}

export interface SeatsLayout {
  [key: string]: any
}

export async function getSeatsApi(journeys: Journey[]): Promise<SeatsLayout> {
  console.log(journeys)
  const response = await fetch(`${API_URL}/seats`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': API_URL,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journeys),
  })

  const json = await response.json()
  let result: SeatsLayout = {}
  for (let key in json) {
    result[key] = json[key].map((entry) => Seats.fromJson(entry))
  }
	console.log(result)
  return result
}

// passord: eksamen
