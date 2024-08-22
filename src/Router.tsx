import { useRef, useState } from 'react'
import App from './App'
import { Journey } from './models/Journey'
import SeatResults from './pages/SeatResults'

export enum Page {
  LANDING = 0,
  SEAT_RESULTS = 1,
}

export default function Router() {
  const [page, setPage] = useState<Page>(0)
	const refSelectedJourneys = useRef<Journey[]>()

  function searchForSeats(selectedJourneys: Journey[]) {
		refSelectedJourneys.current = selectedJourneys
    setPage(Page.SEAT_RESULTS)
  }

  let pageToShow
  switch (page) {
    case Page.SEAT_RESULTS:
      pageToShow = <SeatResults selectedJourneys={refSelectedJourneys.current} />
      break
    case Page.LANDING:
    default:
      pageToShow = <App setPage={searchForSeats} />
      break
  }

  return <>{pageToShow}</>
}
