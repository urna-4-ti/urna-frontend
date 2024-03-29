/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', name = '', label = '', helperText = '', ...props },
    ref,
  ) => {
    const inputId = useId()
    return (
      <label
        htmlFor={inputId}>
        <p>{label}</p>
        <input
          type={type}
          name={name}
          ref={ref}
          {...props} />
      </label>
    )
  },
)