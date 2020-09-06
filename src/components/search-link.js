import React from 'react'
import { Link } from "gatsby"

export default ({ path }) => {
  console.log('path', path)
  const isSearchPage = (path || '').substr(-6) === 'search'
  return isSearchPage
    ? null
    : (
      <Link to={`/search`}>
        <span role="img" aria-label="Search">🔍</span>
      </Link>
    )
}
