import React, { FC } from 'react'
import { Divider, Flexbox, Heading, Typography } from 'components'
import './AppFooter.scss'

const footerLinkGroups = [
  {
    heading: 'Resources',
    links: [
      {
        ariaLabel: 'Jumpcloud System Users API Documentation',
        href: 'https://docs.jumpcloud.com/1.0/systemusers/update-a-system-user',
        text: 'Jumpcloud System Users API',
      },
      {
        ariaLabel: 'ITCSS Homepage',
        href: 'https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/',
        text: 'ITCSS',
      },
      {
        ariaLabel: 'BEM Homepage',
        href: 'http://getbem.com/',
        text: 'BEM',
      },
    ],
  },
  {
    heading: 'Tools',
    links: [
      {
        ariaLabel: 'Typescript Homepage',
        href: 'https://www.typescriptlang.org/',
        text: 'TypeScript',
      },
      {
        ariaLabel: 'React Homepage',
        href: 'https://reactjs.org/',
        text: 'React',
      },
      {
        ariaLabel: 'Redux Homepage',
        href: 'https://redux.js.org/',
        text: 'Redux',
      },
      {
        ariaLabel: 'Redux toolkit Homepage',
        href: 'https://redux-toolkit.js.org/',
        text: 'Redux Toolkit',
      },
      {
        ariaLabel: 'React Hook Form Homepage',
        href: 'https://react-hook-form.com/',
        text: 'React Hook Form',
      },
      {
        ariaLabel: 'Axios Homepage',
        href: 'https://axios-http.com/',
        text: 'Axios',
      },
    ],
  },
  {
    heading: 'Design',
    links: [
      {
        ariaLabel: 'Google Material Design Colors',
        href: 'https://material.io/design/color/the-color-system.html#color-usage-and-palettes',
        text: 'Google Material Colors',
      },
      {
        ariaLabel: 'Google Material Icons',
        href: 'https://fonts.google.com/icons',
        text: 'Google Material Icons',
      },
      {
        ariaLabel: 'Google Fonts',
        href: 'https://fonts.google.com/',
        text: 'Google Fonts',
      },
    ],
  },
]

const AppFooter: FC = () => {
  return (
    <footer className="app-footer">
      <Flexbox
        as="div"
        align="start"
        className="app-footer__container content-wrapper"
        columns={3}
        fullWidth
        gap="l"
      >
        {footerLinkGroups.map(({ heading, links }, i) => (
          <div className="app-footer__list-container" key={i}>
            <Heading
              as="h3"
              className="app-footer__heading"
              content={heading}
            />
            <Divider />
            <ul className="app-footer__list">
              {links.map(({ ariaLabel, href, text }, j) => (
                <li className="app-footer__list-item" key={j}>
                  <a
                    aria-label={ariaLabel}
                    className="app-footer__link"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Typography as="span" content={text} size="s" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Flexbox>
    </footer>
  )
}

export default AppFooter
