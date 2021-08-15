import { FC } from 'react'
import { Flexbox, Icon, Typography } from 'components'
import './ErrorMessage.scss'

interface ErrorMessageProps {
  text?: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return (
    <span className="error-message" aria-live="assertive">
      {text && (
        <Flexbox align="start" as="span" gap="s">
          <Icon
            className="error-message__icon"
            name="warning"
            size="s"
            type="negative"
          />
          <Typography content={text} className="error-message__text" size="s" />
        </Flexbox>
      )}
    </span>
  )
}

export default ErrorMessage
