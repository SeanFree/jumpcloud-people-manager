import { FC } from 'react';
import { Divider, Flexbox, Heading, Typography } from 'components';
import './AppFooter.scss';

const footerLinkGroups = [{
  heading: 'Resources',
  links: [{
    ariaLabel: 'Jumpcloud System Users API Documentation',
    href: 'https://docs.jumpcloud.com/1.0/systemusers/update-a-system-user',
    text: 'Jumpcloud System Users API'
  }]
}, {
  heading: 'Tools',
  links: [{
    ariaLabel: 'React Hook Form Documentation',
    href: 'https://react-hook-form.com/',
    text: 'React Hook Form'
  }, {
    ariaLabel: 'Redux toolkit Documentation',
    href: 'https://redux-toolkit.js.org/',
    text: 'Redux Toolkit'
  }]
}, {
  heading: 'Design',
  links: [{
    ariaLabel: 'Google Material Icons Documentation',
    href: 'https://fonts.google.com/icons',
    text: 'Google Material Icons'
  }, {
    ariaLabel: 'Google Material Design Colors Documentation',
    href: 'https://material.io/design/color/the-color-system.html#color-usage-and-palettes',
    text: 'Google Material Colors'
  }]
}];

const AppFooter: FC = () => {
  return (
    <footer className="app-footer">
      <Flexbox
        as="div"
        align="start"
        className="app-footer__container content-wrapper"
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
              {links.map(({ ariaLabel, href, text }, j) => 
                <li className="app-footer__list-item" key={j}>
                  <a
                    aria-label={ariaLabel}
                    className="app-footer__link"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Typography
                      content={text}
                      size="s"
                    />
                  </a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </Flexbox>
    </footer>
  )
};

export default AppFooter;