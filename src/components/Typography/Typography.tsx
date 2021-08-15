import React, { FC, PropsWithChildren, ReactChild, ReactChildren } from 'react'
import { useClassNames } from 'hooks'
import './Typography.scss'

interface TypographyProps {
  className?: string
  content?: ReactChildren | ReactChild | string
  as?: 'p' | 'span'
  size?: 's' | 'm' | 'l'
  textAlign?: 'left' | 'center' | 'right'
  weight?: 'light' | 'normal' | 'semibold' | 'bold'
}

const Typography: FC<TypographyProps> = ({
  as: Tag = 'p',
  children,
  className,
  content,
  size = 'm',
  weight = 'normal',
  textAlign = 'left',
}: PropsWithChildren<TypographyProps>) => {
  const classList = useClassNames({
    [className as string]: !!className,
    typography: true,
    [`typography--${size}`]: true,
    [`typography--${weight}`]: true,
    [`typography--align-${textAlign}`]: true,
  })

  return <Tag className={classList}>{content || children}</Tag>
}

export default Typography
