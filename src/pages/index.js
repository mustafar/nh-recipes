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
    category: undefined,
  });

  const { filteredPosts, query, category } = state;
  const posts = filteredPosts && (query || category) ? filteredPosts : allPosts;

  const handleInputChange = event => {
    const query = event.target.value;
    const { data  } = props;
    const { category } = state;
    const posts = data.allMarkdownRemark.edges || [];
    const filteredPosts = filterPosts({ posts, query, requestedCategory: category })

    // update state according to the latest query and results
    setState({
      query,
      category,
      filteredPosts,
    });
  }

  const handleCategoryChange = event => {
    const category = event.target.value;
    const { data } = props;
    const { query } = state;
    const posts = data.allMarkdownRemark.edges || [];
    const filteredPosts = filterPosts({ posts, query, requestedCategory: category })

    // update state according to the latest query and results
    setState({
      query,
      category,
      filteredPosts,
    });
  }

  const filterPosts = ({ posts, query, requestedCategory }) => {
    return posts.filter(post => {
      // destructure data from post frontmatter
      const { category, credit, description, title, tags } = post.node.frontmatter;
      // standardize data with .toLowerCase()
      // return true if the description, title or tags
      // contains the query string
      const queryMatches = !query ||
        description.toLowerCase().includes(query.toLowerCase()) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        credit?.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags
          .join("") // convert tags from an array to string
          .toLowerCase()
          .includes(query.toLowerCase()))

      // category should match exactly unless empty
      const categoryMatches = requestedCategory
          ? requestedCategory === category
          : true

      return queryMatches && categoryMatches
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
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          borderBottom: '2px solid gray',
        }}
      >
        <input
          type="text"
          aria-label="Search"
          placeholder="🔍 Search..."
          onChange={debounceEventHandler(handleInputChange, DEBOUNCE_MS)}
          style={{ border: 0, marginBottom: 0 }}
        />
        <select
          onChange={handleCategoryChange}
          style={{
            border: 0,
            padding: '0 6px 6px',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            fontWeight: 'bold',
            color: '#ff5700',
            cursor: 'pointer',
          }}
        >
          <option value="">All</option>
          <option value="Condiment">Condiments</option>
          <option value="Appetizer">Appetizers</option>
          <option value="Non-Vegetarian Entrée">Non-Veg</option>
          <option value="Vegetarian Entrée">Veg</option>
          <option value="Rice Entrée">Rice</option>
          <option value="Dessert">Desserts</option>
        </select>
      </div>

      {posts.map(({ node }) => {
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
