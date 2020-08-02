import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        post={post}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pathname={location.pathname}
        credit={post.frontmatter.credit}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              display: `block`,
              fontSize: `larger`,
              fontVariant: `all-small-caps`,
              fontWeight: `lighter`,
              lineHeight: rhythm(0.75),
              marginTop: rhythm(0.5),
              marginBottom: `0px`,
            }}
          >
            {post.frontmatter.description}
          </p>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              fontSize: `larger`,
              fontVariant: `all-small-caps`,
              fontWeight: `lighter`,
              marginTop: rhythm(0.03),
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>

          {/* credit */}
          {post.frontmatter.credit && <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              fontWeight: `lighter`,
              marginTop: '-15px',
              marginBottom: 30,
            }}
          >
            by {post.frontmatter.credit}
          </p>}

        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        credit
        category
      }
    }
  }
`
