import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LineBadge.css'
import {
  faBus,
  faQuestionCircle,
  faTrain,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

interface LineBadgeProps {
  mode: string
  lineCode: string
  serviceDestination: string
}

function iconForMode(mode: string): IconDefinition {
  switch (mode.toLowerCase()) {
    case 'train':
      return faTrain
    case 'bus':
      return faBus
    default:
			console.log(mode)
      return faQuestionCircle
  }
}

export default function LineBadge({
  mode,
  lineCode,
  serviceDestination,
}: LineBadgeProps) {
	const modeIcon = iconForMode(mode)
  return (
    <>
      <div className='flex flex-align-start mt-12 round-both gradient p-10'>
        <FontAwesomeIcon
          className='self-align-center'
          icon={modeIcon}
        />
        <div className='ml-6 text-medium'>
          {lineCode} {serviceDestination}
        </div>
      </div>
    </>
  )
}
