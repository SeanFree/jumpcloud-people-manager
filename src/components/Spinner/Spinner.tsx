import React, { FC } from 'react'
import { Flexbox, Icon } from 'components'
import { useClassNames } from 'hooks'
import './Spinner.scss'

interface SpinnerProps {
  className?: string
  size?: 's' | 'm' | 'l' | 'xl'
}

const Spinner: FC<SpinnerProps> = ({
  className,
  size = 'xl',
}: SpinnerProps) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    spinner: true,
  })

  return (
    <Flexbox as="span" className={classNames} fullWidth justify="center">
      <Icon name="rotate_right" className="spinner__icon" size={size} />
    </Flexbox>
  )
}

export default Spinner
