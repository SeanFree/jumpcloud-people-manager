import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactChild,
  ReactChildren,
} from 'react'
import { Flexbox, Icon } from 'components'
import { IconProps } from 'components/Icon/Icon'
import { useClassNames } from 'hooks'
import './Button.scss'

interface ButtonProps {
  ariaLabel: string
  className?: string
  content?: ReactChild | ReactChildren | string
  disabled?: boolean
  iconName?: string
  iconPosition?: 'start' | 'end'
  iconSize?: IconProps['size']
  onClick?: MouseEventHandler
  size?: 's' | 'm' | 'l'
  type?: 'button' | 'reset' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger' | 'inline'
}

const Button: FC<ButtonProps> = ({
  ariaLabel,
  children,
  className,
  content,
  disabled = false,
  iconName,
  iconPosition = 'start',
  onClick,
  size = 'm',
  type = 'button',
  variant = 'primary',
}: PropsWithChildren<ButtonProps>) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    button: true,
    [`button--disabled`]: disabled,
    [`button--${size}`]: true,
    [`button--${variant}`]: true,
  })

  return (
    <button
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      className={classNames}
      onClick={onClick}
      type={type}
    >
      <Flexbox as="span" gap="s" justify="center">
        {iconName && iconPosition === 'start' && (
          <Icon name={iconName} size={size} />
        )}
        {(content || children) && (
          <span className="button__content">{content || children}</span>
        )}
        {iconName && iconPosition === 'end' && (
          <Icon name={iconName} size={size} />
        )}
      </Flexbox>
    </button>
  )
}

export default Button
