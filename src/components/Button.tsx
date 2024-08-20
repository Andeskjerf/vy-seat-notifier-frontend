import './Button.css'

interface ButtonProps {
  label: string
  callback: Function
  active: boolean
}

export default function Button({ label, callback, active }: ButtonProps) {
  return (
    <div
      onClick={() => callback()}
      className={`${active ? 'button-active' : ''} text-medium button br-button content-align-center pointer-cursor no-select plr-24`}
    >
      {label}
    </div>
  )
}
