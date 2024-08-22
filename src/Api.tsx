import { API_URL } from './Consts'
import { Journey } from './models/Journey'
import { SearchLocation } from './models/SearchLocation'

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

export async function getSeatsApi(
	journeys: Journey[]
): Promise<Object> {
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
	console.log(json)
  // return json.map((entry) => {
  //   return Journey.fromJson(entry)
  // })
}

// passord: eksamen
