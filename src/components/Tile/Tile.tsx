import { ElementType, FC, ReactChild, ReactChildren } from 'react'
import { Divider, Flexbox, Heading, Icon } from 'components'
import { IconProps } from 'components/Icon/Icon'
import { useClassNames } from 'hooks'
import './Tile.scss'

interface TileProps {
  bodyContent: ReactChild | ReactChildren
  className?: string
  footerContent?: ReactChild | ReactChildren
  fullWidthBody?: boolean
  headerAction?: ReactChild
  headerIconProps?: IconProps
  heading: string
  as?: ElementType
}

const Tile: FC<TileProps> = ({
  as: Tag = 'section',
  bodyContent,
  className,
  footerContent,
  fullWidthBody = false,
  headerAction,
  headerIconProps,
  heading,
}) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    tile: true,
  })
  const bodyClassNames = useClassNames({
    'custom-scrollbar': true,
    tile__body: true,
    'tile__body--full-width': fullWidthBody,
  })

  return (
    <Flexbox
      align="start"
      className={classNames}
      direction="column"
      fullWidth
      gap="m"
      as={Tag}
    >
      <Flexbox as="header" className="tile__header" fullWidth gap="m">
        {headerIconProps && <Icon {...headerIconProps} />}
        <Heading as="h2" className="tile__heading" content={heading} nowrap />
        {headerAction}
      </Flexbox>
      <Divider />
      <div className={bodyClassNames}>{bodyContent}</div>
      {footerContent && (
        <footer className="tile__footer">{footerContent}</footer>
      )}
    </Flexbox>
  )
}

export default Tile
