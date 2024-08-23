import { useRef, useState } from 'react'
import App from './App'
import { Journey } from './models/Journey'
import SeatResults from './pages/SeatResults'
import BackButton from './components/BackButton'

export enum Page {
  LANDING = 0,
  SEAT_RESULTS = 1,
}

export default function Router() {
  const [page, setPage] = useState<Page>(0)
  const refSelectedJourneys = useRef<Journey[]>()
  const showBack = useRef<boolean>(false)

  function searchForSeats(selectedJourneys: Journey[]) {
    refSelectedJourneys.current = selectedJourneys
    changePage(Page.SEAT_RESULTS)
  }

  function changePage(page: Page) {
    switch (page) {
      case Page.LANDING:
        showBack.current = false
        break
      case Page.SEAT_RESULTS:
        showBack.current = true
        break
    }
    setPage(page)
  }

  function goBack() {
    changePage(Page.LANDING)
  }

  let pageToShow
  switch (page) {
    case Page.SEAT_RESULTS:
      pageToShow = (
        <SeatResults selectedJourneys={refSelectedJourneys.current} />
      )
      break
    case Page.LANDING:
    default:
      pageToShow = <App setPage={searchForSeats} />
      break
  }

  return (
    <div>
      {showBack.current ? <BackButton callback={goBack} /> : ''}
      {pageToShow}
    </div>
  )
}
