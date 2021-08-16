import React, { ReactElement } from 'react'
import { FieldName, Path } from 'react-hook-form'
import { FormField } from 'components'
import { useClassNames } from 'hooks'
import './TextInput.scss'

interface TextInputProps {
  ariaLabel?: string
  autoFocus?: boolean
  className?: string
  defaultValue?: string
  disabled?: boolean
  id: string
  label: string
  name: FieldName<any>
  maxLength?: number
  minLength?: number
  pattern?: RegExp
  required?: boolean
}

const TextInput = <FormDataType,>({
  ariaLabel,
  autoFocus = false,
  className,
  defaultValue,
  disabled = false,
  id,
  label,
  maxLength = 1024,
  minLength = 0,
  name,
  pattern,
  required = false,
}: TextInputProps): ReactElement => {
  const classNames = useClassNames({
    [className as string]: !!className,
    'text-input': true,
    'text-input--disabled': !!disabled,
  })

  return (
    <FormField
      className={classNames}
      id={id}
      label={label}
      name={name as Path<FormDataType>}
      required={required}
      validationRules={{
        maxLength: {
          message: `${label} should not exceed ${maxLength} characters.`,
          value: maxLength,
        },
        minLength: {
          message: `${label} should be at least ${minLength} characters.`,
          value: minLength,
        },
        required: {
          message: `${label} is required.`,
          value: required,
        },
        ...(pattern
          ? {
              pattern: {
                message: `Value entered for ${label} is invalid`,
                value: pattern,
              },
            }
          : {}),
      }}
    >
      {(fieldProps, hasError) => (
        <input
          {...fieldProps}
          aria-disabled={disabled}
          aria-label={ariaLabel || label}
          aria-required={required}
          aria-invalid={hasError}
          autoFocus={autoFocus}
          className="text-input__input"
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          type="text"
          required={required}
          value={defaultValue}
        />
      )}
    </FormField>
  )
}

export default TextInput
