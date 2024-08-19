import { SearchLocation } from '../models/SearchLocation'
import SuggestionEntry from './SuggestionsEntry'

interface SuggestionsBoxProps {
  isVisible: boolean
  results: SearchLocation[]
  callback: Function
}

function SuggestionsBox({ isVisible, results, callback }: SuggestionsBoxProps) {
  if (!isVisible) {
    return null
  }

  results.sort((a, b) => b.categories.length - a.categories.length)

  const entries = results.map((entry, index) => (
    <>
      <SuggestionEntry
        key={index}
        result={entry}
        isLast={index == results.length - 1}
        callback={callback}
      />
      {index != results.length - 1 ? <div className='seperator'></div> : null}
    </>
  ))

  return (
    <div className='suggestions-container round-bottom white-bg border'>
      {results.length == 0 ? <span className='loader'></span> : <>{entries}</>}
    </div>
  )
}

export default SuggestionsBox
