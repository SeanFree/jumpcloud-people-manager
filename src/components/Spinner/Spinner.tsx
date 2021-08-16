import React, { FC } from 'react'
import { Flexbox, Icon } from 'components'
import { useClassNames } from 'hooks'
import './Spinner.scss'

interface SpinnerProps {
  className?: string
}

const Spinner: FC<SpinnerProps> = ({ className }: SpinnerProps) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    spinner: true,
  })

  return (
    <Flexbox as="span" className={classNames} fullWidth justify="center">
      <Icon name="rotate_right" className="spinner__icon" size="xl" />
    </Flexbox>
  )
}

export default Spinner
