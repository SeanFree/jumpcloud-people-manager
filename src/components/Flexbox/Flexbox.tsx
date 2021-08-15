import { ElementType, FC } from 'react'
import { useClassNames } from 'hooks'
import './Flexbox.scss'

interface FlexboxProps {
  align?: 'baseline' | 'center' | 'end' | 'start' | 'stretch'
  as?: ElementType
  className?: string
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
  direction = 'row',
  fullWidth = false,
  nowrap = false,
  gap,
  justify = 'start',
}) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    flexbox: true,
    [`flexbox--align-${align}`]: true,
    [`flexbox--${direction}`]: true,
    'flexbox--full-width': fullWidth,
    [`flexbox--gap-${gap}`]: !!gap,
    'flexbox--nowrap': nowrap,
    [`flexbox--justify-${justify}`]: true,
  })

  return <Tag className={classNames}>{children}</Tag>
}

export default Flexbox
