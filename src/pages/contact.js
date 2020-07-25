import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const ContactPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" pathname={location.pathname} />
      <form
        style={{
          marginTop: 40,
          fontSize: rhythm(0.6),
        }}
        name="contact"
        method="POST"
        action="/thanks"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <h3>Send us a message.</h3>
        <h6>Please be nice 🙏</h6>
        <p
          style={{
            marginTop: rhythm(2.0),
            marginBottom: rhythm(1.5),
          }}
        >
          <label>Your Name <input type="text" name="name" /></label>
        </p>
        <p
          style={{
            marginBottom: rhythm(1.5),
          }}
        >
          <label>Your Email <input type="email" name="email" /></label>
        </p>
        <p
          style={{
            marginBottom: rhythm(1.5),
          }}
        >
          <label>
            Message
            <div>
              <textarea
                style={{
                  marginTop: rhythm(0.25),
                  padding: rhythm(0.25),
                  fontSize: 'unset',
                }}
                rows="4"
                name="message"
              ></textarea>
            </div>
          </label>
        </p>
        <p
          style={{
            marginBottom: rhythm(2.0),
          }}
        >
          <div
            style={{
              marginBottom: rhythm(0.5),
            }}
          >
            We will not share, sell or spam your email.
          </div>
          <button type="submit">Send</button>
        </p>
      </form>
    </Layout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
