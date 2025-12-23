/* eslint-disable no-irregular-whitespace */
import { ReactNode } from 'react'
import { configRoot } from '../utils/fetchCalendars'
import Logo from './Logo'

const IconLink = (props: {
  children: ReactNode
  icon: string
  href: string
}): JSX.Element => (
  <a href={props.href} target="_blank" rel="noreferrer">
    <i className={`fa ${props.icon} iconlink`} aria-hidden="true" />
    {props.children}
  </a>
)

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Logo />
          </div>
          <div className="col-10">
            <p className="text-muted">
              <IconLink
                icon="fa-gitlab"
                href="https://git.esi-bru.be/pbt/displaytimetable">
                Dépôt <i>gitesi</i>
              </IconLink>
              <br />
              <IconLink
                icon="fa-paper-plane"
                href="mailto:esi-horaires@he2b.be?subject=Mail from horaires.esi-bru.be /">
                Contact horaires
              </IconLink>
              <br />
              <IconLink href="freerooms.html" icon="fa fa-calendar">
                Liberté des salles
              </IconLink>
              <br />
              <IconLink href={configRoot} icon="fa-code-fork">
                Diff
              </IconLink>
            </p>
            <p className="text-muted">
              <i>
                - v1 « À l&rsquo;arrache » par Pierre, Nicolas (Némo) et
                Frédéric (Sébastien)
                <br />- v2 « Marie revisitée » par Andrews, v2.1 « Peu me
                chaut » par Nicolas (Némo)
              </i>
            </p>
            <p className="text-muted small">
              <a href="https://git.esi-bru.be/pbt/displaytimetable/-/raw/master/LICENSE">
                MIT licence
              </a>{' '}
              - 2020-2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
