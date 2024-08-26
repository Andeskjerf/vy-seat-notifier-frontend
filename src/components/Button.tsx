import './Button.css'

interface ButtonProps {
  label: string
  callback: Function
  active: boolean
	className?: string
}

export default function Button({ label, callback, active, className }: ButtonProps) {
  return (
    <div
      onClick={() => (active ? callback() : '')}
      className={`${active ? 'button-active pointer-cursor' : ''} ${className} text-medium button br-button content-align-center no-select plr-24`}
    >
      {label}
    </div>
  )
}
