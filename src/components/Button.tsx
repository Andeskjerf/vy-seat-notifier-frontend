import './Button.css'

interface ButtonProps {
  label: string
  callback: Function
  active: boolean
}

export default function Button({ label, callback, active }: ButtonProps) {
  return (
    <div
      onClick={() => (active ? callback() : '')}
      className={`${active ? 'button-active pointer-cursor' : ''} text-medium button br-button content-align-center no-select plr-24`}
    >
      {label}
    </div>
  )
}
