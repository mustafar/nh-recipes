export default ({ isRecipe, canonicalPath, post }) => {
  if (!isRecipe || !post) {
    return '';
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
  };

  return JSON.stringify(jsonLdPayload);
}
