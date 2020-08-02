/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import JsonLd from './jsonld';
import socialSharingImage from '../../content/assets/social-pic.png'

const SEO = ({ post, description, lang, meta, title, pathname, credit }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const canonical = pathname
    ? `${site.siteMetadata.siteUrl}${pathname}`
    : `${site.siteMetadata.siteUrl}$/`
  const pageType = pathname ? 'article' : 'website'

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'article:author',
          content: credit,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: pageType,
        },
        {
          property: `og:locale`,
          content: `en_US`,
        },
        {
          property: `og:image`,
          content: socialSharingImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: socialSharingImage,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:creator`,
          content: `@mustafarizvi`,
        }
      ]
        .concat(meta)}

      script={[{
        type: 'text/javascript',
        innerHTML: JsonLd({
          isRecipe: pageType === 'article',
          canonicalPath: canonical,
          post,
        }),
      }]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
}

export default SEO
