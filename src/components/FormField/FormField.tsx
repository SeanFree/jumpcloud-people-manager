import { FC, ReactNode, useEffect } from 'react'
import {
  Path,
  ValidationRule,
  useFormContext,
  UseFormRegisterReturn,
} from 'react-hook-form'
import { ErrorMessage, Flexbox } from 'components'
import { useClassNames } from 'hooks'
import './FormField.scss'

interface FormFieldProps {
  children: (fieldProps: UseFormRegisterReturn, hasError: boolean) => ReactNode
  className?: string
  id: string
  label: string
  name: Path<any>
  required?: boolean
  validationRules?: { [key: string]: ValidationRule }
}

const FormField: FC<FormFieldProps> = ({
  children,
  className,
  id,
  label,
  name,
  required = false,
  validationRules,
}) => {
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
  useEffect(() => {
    return () => unregister(name)
  }, [name, unregister])

  return (
    <Flexbox className={classNames} direction="column" gap="s" align="start">
      <label className={labelClassNames} htmlFor={id}>
        {label}
      </label>
      {children(register(name, validationRules), !!errorMessage)}
      <ErrorMessage text={errorMessage} />
    </Flexbox>
  )
}

export default FormField
