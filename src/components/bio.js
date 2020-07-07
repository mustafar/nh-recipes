import React from "react"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(0.5),
      }}
    >
      {/* <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt="placeholder alt"
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      /> */}
      <p>
        Recipes from inside and around Narauli House, Khayaliganj.
      </p>
    </div>
  )
}

export default Bio
