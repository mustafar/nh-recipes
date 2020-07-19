import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { debounce } from "lodash";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

const DEBOUNCE_MS = 200;

const BlogIndex = props => {
  const { data, location } = props;

  const siteTitle = data.site.siteMetadata.title;
  const allPosts = data.allMarkdownRemark.edges;

  const [state, setState] = useState({
    filteredPosts: [],
    query: undefined,
  });

  const { filteredPosts, query } = state;
  const posts = filteredPosts && query ? filteredPosts : allPosts;

  const handleInputChange = event => {
    const query = event.target.value;
    const { data } = props;
    // this is how we get all of our posts
    const posts = data.allMarkdownRemark.edges || [];
     // return all filtered posts
    const filteredPosts = posts.filter(post => {
      // destructure data from post frontmatter
      const { description, title, tags } = post.node.frontmatter;
      return (
        // standardize data with .toLowerCase()
        // return true if the description, title or tags
        // contains the query string
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags
          .join("") // convert tags from an array to string
          .toLowerCase()
          .includes(query.toLowerCase()))
      );
    });

    // update state according to the latest query and results
    setState({
      query, // with current query string from the `Input` event
      filteredPosts, // with filtered data from posts.filter(post => (//filteredPosts)) above
    });
  }

  const debounceEventHandler = (...args) => {
    const debounced = debounce(...args);
    return e => {
      e.persist();
      return debounced(e);
    };
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Narauli House Recipes" pathname={location.pathname} />
      <Bio />
      <input
        type="text"
        aria-label="Search"
        placeholder="🔍 Search..."
        onChange={debounceEventHandler(handleInputChange, DEBOUNCE_MS)}
      />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
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
          }
        }
      }
    }
  }
`;
