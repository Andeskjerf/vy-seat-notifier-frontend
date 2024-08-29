import { useState } from 'react'
import './Overlay.css'

interface OverlayProps {
  children?: React.FC<{}>
}

export default function Overlay({ children }: OverlayProps) {
  const [showOverlay, setShowOverlay] = useState<boolean>(true)

  return (
    <>{showOverlay ? <div className='absolute overlay'>{children}</div> : ''}</>
  )
}
