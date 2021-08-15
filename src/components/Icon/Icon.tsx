import { useClassNames } from 'hooks'
import { FC, MouseEventHandler } from 'react'
import './Icon.scss'

export interface IconProps {
  className?: string
  name: string
  onClick?: MouseEventHandler
  size?: 's' | 'm' | 'l' | 'xl'
  type?: 'light' | 'negative' | 'neutral' | 'positive' | 'warning'
}

const Icon: FC<IconProps> = ({
  className,
  name,
  onClick,
  size = 'm',
  type = 'neutral',
}) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    'material-icons': true,
    icon: true,
    [`icon--${size}`]: true,
    [`icon--${type}`]: true,
  })

  return (
    <i className={classNames} onClick={onClick} role="presentation">
      {name}
    </i>
  )
}

export default Icon
