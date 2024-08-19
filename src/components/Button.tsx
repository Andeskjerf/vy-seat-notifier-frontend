interface ButtonProps {
  label: string
  callback: Function
  active: boolean
}

export default function Button({ label, callback, active }: ButtonProps) {
  return (
    <div
      onClick={() => callback()}
      className={`${active ? 'button-active' : ''} button round-both`}
    >
      {label}
    </div>
  )
}
