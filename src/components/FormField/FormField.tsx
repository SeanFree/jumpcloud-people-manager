import React, { FC, PropsWithChildren, ReactNode, useEffect } from 'react'
import {
  Path,
  ValidationRule,
  useFormContext,
  UseFormRegisterReturn,
  UseFormRegister,
  FieldValues,
  UseFormUnregister,
} from 'react-hook-form'
import { ErrorMessage, Flexbox } from 'components'
import { useClassNames } from 'hooks'
import './FormField.scss'

interface FormFieldProps {
  children: (fieldProps: UseFormRegisterReturn, hasError: boolean) => ReactNode
  className?: string
  customRegister?: UseFormRegister<FieldValues>
  customUnregister?: UseFormUnregister<FieldValues>
  id: string
  label: string
  name: Path<any>
  required?: boolean
  validationRules?: { [key: string]: ValidationRule }
}

const FormField: FC<FormFieldProps> = ({
  children,
  className,
  customRegister,
  customUnregister,
  id,
  label,
  name,
  required = false,
  validationRules,
}: PropsWithChildren<FormFieldProps>) => {
  const {
    formState: { errors },
    register,
    unregister,
  } = useFormContext()
  const errorMessage = errors[name]?.message
  const classNames = useClassNames({
    [className as string]: !!className,
    'form-field': true,
  })
  const labelClassNames = useClassNames({
    'form-field__label': true,
    'form-field__label--required': required,
    'form-field__label--required-error':
      !!errorMessage && errorMessage.includes('required'),
  })
  const _register = (customRegister || register) as UseFormRegister<FieldValues>
  const _unregister = (customUnregister ||
    unregister) as UseFormUnregister<FieldValues>

  useEffect(() => {
    return () => _unregister(name as `${string}`)
  }, [name, unregister])

  return (
    <Flexbox className={classNames} direction="column" gap="s" align="start">
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      {children(
        _register(name as `${string}`, validationRules),
        !!errorMessage
      )}
      <ErrorMessage text={errorMessage} />
    </Flexbox>
  )
}

export default FormField
