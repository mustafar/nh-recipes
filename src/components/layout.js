import React from "react"
import { Link } from "gatsby"

import "./layout.css"
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  const isHomePage = location.pathname === rootPath;

  if (isHomePage) {
    header = (
      <h1
        style={{
          ...scale(0.9),
          fontWeight: 100,
          marginBottom: rhythm(1.75),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        className="page-header"
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      className="site"
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header className={`${!isHomePage ? "home-link" : ""}`}>{header}</header>
      <main className={`${isHomePage ? "home-main" : ""} site-content`}>{children}</main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: 'small',
        }}
      >
        <div>
          © {new Date().getFullYear()}, built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
        <div>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
