import React, { ElementType, FC, PropsWithChildren } from 'react'
import { useClassNames } from 'hooks'
import './Flexbox.scss'

interface FlexboxProps {
  align?: 'baseline' | 'center' | 'end' | 'start' | 'stretch'
  as?: ElementType
  className?: string
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  direction?: 'column' | 'row'
  fullWidth?: boolean
  gap?: 'xs' | 's' | 'm' | 'l'
  nowrap?: boolean
  justify?: 'around' | 'between' | 'center' | 'end' | 'evenly' | 'start'
}

const Flexbox: FC<FlexboxProps> = ({
  align = 'center',
  as: Tag = 'span',
  children,
  className,
  columns = 1,
  direction = 'row',
  fullWidth = false,
  nowrap = false,
  gap,
  justify = 'start',
}: PropsWithChildren<FlexboxProps>) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    flexbox: true,
    [`flexbox--align-${align}`]: true,
    [`flexbox--col-${columns}`]: !!columns,
    [`flexbox--${direction}`]: true,
    'flexbox--full-width': fullWidth,
    [`flexbox--gap-${gap}`]: !!gap,
    'flexbox--nowrap': nowrap,
    [`flexbox--justify-${justify}`]: true,
  })

  return <Tag className={classNames}>{children}</Tag>
}

export default Flexbox
