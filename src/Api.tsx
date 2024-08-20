import { API_URL } from './Consts'
import { Journey } from './models/Journey'
import { SearchLocation } from './models/SearchLocation'

function makeAutosuggestUrl(search: string): string {
  return `${API_URL}/autosuggest?query=${search}`
}

function makeSearchUrl(): string {
  return `${API_URL}/search`
}

export async function getAutosuggestApi(
  search: string,
): Promise<SearchLocation[]> {
  const response = await fetch(makeAutosuggestUrl(search), {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
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
  const response = await fetch(makeSearchUrl(), {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([from, to]),
  })

  const json = await response.json()
  console.log(json)
  return json.map((entry) => {
    return Journey.fromJson(entry)
  })
}
