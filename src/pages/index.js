import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const BlogIndex = props => {
  const { data, location } = props;

  const siteTitle = data.site.siteMetadata.title;
  const allPosts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Narauli House Recipes" pathname={location.pathname} />
      <Bio />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: '2px solid gray',
        }}
      >
      </div>

      {allPosts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginTop: rhythm(1.25),
                  marginBottom: rhythm(0.05),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div><small>{node.frontmatter.description}</small></div>
              <div>
                <small>{node.frontmatter.category}&nbsp;|&nbsp;{node.frontmatter.date}</small>
              </div>
            </header>
          </article>
        );
      })}
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
            credit
          }
        }
      }
    }
  }
`;
