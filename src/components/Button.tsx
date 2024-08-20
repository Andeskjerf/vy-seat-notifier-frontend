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
      className={`${active ? 'button-active' : ''} button round-both content-align-center pointer-cursor no-select text-button`}
    >
      {label}
    </div>
  )
}
