import React from "react"
import { Link } from "gatsby"
import SearchLink from './search-link';

import "./layout.css"
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  const isHome = location.pathname === rootPath;
  const isSearch = location.pathname === rootPath + 'search';
  const isPost = !isHome && !isSearch;

  if (!isPost) {
    header = (
      <h1
        style={{
          ...scale(0.7),
          fontWeight: 100,
          marginBottom: rhythm(1.75),
          marginTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
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
        <SearchLink path={location.pathname} />
      </h1>
    )
  } else {
    header = (
      <h3
        className="page-header"
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
          display: 'flex',
          justifyContent: 'space-between',
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
        <SearchLink path={location.pathname} />
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
      <header className={`${isPost ? "home-link" : ""}`}>{header}</header>
      <main className={`${!isPost ? "home-main" : ""} site-content`}>{children}</main>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: 'medium',
        }}
      >
        <div>
          © {new Date().getFullYear()}, built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
        <div style={{ marginRight: rhythm(0.5) }}>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
