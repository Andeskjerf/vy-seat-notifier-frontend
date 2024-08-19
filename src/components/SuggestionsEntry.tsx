import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SearchLocation } from "../models/SearchLocation"

interface SuggestionEntryProps {
  result: SearchLocation
  isLast: boolean
  callback: Function
}

function SuggestionEntry({ result, isLast, callback }: SuggestionEntryProps) {
  const class_ = isLast ? 'round-bottom' : ''

  const categories = result.categories.map((entry) => {
    const icon = getIconForStop(entry.id)
    if (icon == '') {
      return
    }
    return (
      <FontAwesomeIcon
        icon={icon}
        key={entry.id}
        className='self-align-center pl-6'
      />
    )
  })

  if (
    categories.length == 0 ||
    (categories.length == 1 && categories[0] == undefined)
  ) {
    categories.push(
      <FontAwesomeIcon
        icon='location-pin'
        key='eh'
        className='self-align-center pl-6'
      />,
    )
  }

  return (
    <>
      <div
        onClick={() => callback(result)}
        className={`${class_} hover-overlay text-align-start text-black p-10 no-select pointer-cursor round-both m-6 flex flex-space-between`}
      >
        <div className='flex flex-column'>
          <div>{result.name}</div>
          <div className='text-label'>{result.description}</div>
        </div>
        <div className='flex'>{categories}</div>
      </div>
    </>
  )
}

function getIconForStop(id: string): string {
  switch (id) {
    case 'railway-station':
      return 'train'
    case 'metro-station':
      return 'train-subway'
    case 'bus-stop':
    case 'bus-station':
      return 'bus-simple'
    case 'airport':
      return 'plane-departure'
    case 'tram-station':
      return 'train-tram'
    case 'ferry-stop':
      return 'ferry'
    case 'city-town-village':
      return 'city'
    default:
      console.log('invalid category id: ' + id)
      return ''
  }
}

export default SuggestionEntry
