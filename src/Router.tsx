import { useEffect, useRef, useState } from 'react'
import App from './App'
import { Journey } from './models/Journey'
import SeatResults from './pages/SeatResults'
import Unsubscribe from './pages/Unsubscribe'
import BackButton from './components/BackButton'

export enum Page {
  LANDING = 0,
  SEAT_RESULTS = 1,
  UNSUBSCRIBE = 2,
}

export default function Router() {
  const [page, setPage] = useState<Page>(0)
  const refSelectedJourneys = useRef<Journey[]>()
  const showBack = useRef<boolean>(false)
  const urlQuery = useRef<string>('')

  useEffect(() => {
    // get the path name, but strip away the / at the start
    const pathName = window.location.pathname.slice(1)
    urlQuery.current = window.location.search.slice(1)

    if (pathName === 'unsubscribe') {
      changePage(Page.UNSUBSCRIBE)
    }
  })

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
      case Page.UNSUBSCRIBE:
        showBack.current = true
        break
    }
    setPage(page)
  }

  function goBack() {
    window.history.replaceState(null, '', '/')
    changePage(Page.LANDING)
  }

  let pageToShow
  switch (page) {
    case Page.SEAT_RESULTS:
      pageToShow = (
        <SeatResults selectedJourneys={refSelectedJourneys.current} />
      )
      break
    case Page.UNSUBSCRIBE:
      pageToShow = <Unsubscribe email={urlQuery.current}></Unsubscribe>
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
