import { useState } from 'react'
import './InputField.css'

interface InputFieldProps {
  active: boolean
  placeholder: string
	className?: string
	callback: Function
}

export default function InputField({ active, placeholder, className, callback }: InputFieldProps) {
  function handleInput(text: string) {
		callback(text)
	}

  return (
    <div
      className={`${active ? 'active-border ' : ''} ${className} round-both white-bg border-hover`}
    >
      <input
        placeholder={placeholder}
        onChange={(text) => handleInput(text.target.value)}
        className='input-nobg text-black p-18 search-input'
        type='text'
      />
    </div>
  )
}
