import React from 'react'
import Helmet from 'react-helmet'

export default ({ isRecipe, canonicalPath, post }) => {
  if (!isRecipe || !post) {
    return null
  }

  const jsonLdPayload = {
    "@context": 'http://schema.org/',
    '@type': 'Recipe',
    name: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt,
    url: canonicalPath,
    author: post.frontmatter.credit,
    recipeCategory: post.frontmatter.category,
    datePublished: post.frontmatter.date,
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLdPayload)}</script>
    </Helmet>
  )
}
