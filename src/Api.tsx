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

export type SeatsLayout = {
  [key: string]: Seats
}

export async function getSeatsApi(journeys: Journey[]): Promise<SeatsLayout> {
  const response = await fetch(`${API_URL}/seats`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': API_URL,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(journeys),
  })

  if (response.status == 204) {
    return {}
  }

  const json = await response.json()
  let result: SeatsLayout = {}

  for (let key in json) {
    result[key] = json[key].map((entry) => Seats.fromJson(entry))
  }

  return result
}

export async function apiMakeOrder(
  email: string,
  journeys: Journey[],
  legAvailableSeatCount: Map<string, number>,
): Promise<number> {
  const response = await fetch(`${API_URL}/make_order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      journeys: journeys,
      legSeatCount: Object.fromEntries(legAvailableSeatCount),
    }),
  })

  return response.status
}

export async function unsubscribeApi(email: string): Promise<Response> {
  const response = await fetch(`${API_URL}/unsubscribe?email=${email}`, {
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': API_URL,
    },
  })

  return response
}

// passord: eksamen
