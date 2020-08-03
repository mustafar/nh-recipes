import { map } from 'lodash'

// hacky funct to parse strint to iso8601 duration
const toIsoDuration = durationString => {
  if (!durationString) {
    return durationString
  }

  const durationParts = durationString.split(' ')
  if (durationParts.length !== 2) {
    return durationString
  }

  let durationType
  if (['min', 'mins', 'miute', 'minutes'].includes(durationParts[1])) {
    durationType = 'M'
  } else if (['hr', 'hrs', 'hour', 'hours'].includes(durationParts[1])) {
    durationType = 'M'
  } else {
    return durationString
  }

  return `PT${durationParts[0]}${durationType}`
};

export default ({ isRecipe, canonicalPath, post }) => {
  if (!isRecipe || !post) {
    return null
  }

  try {
    const imageMatch = post.html.match(/srcset="([^"]*)"/)
    if (!imageMatch) {
      // no point posting recipe metadata if there is no image
      return null
    }
    const images = map(imageMatch[1].split(','), i => i.split(' ')[0].trim())

    const jsonLdPayload = {
      "@context": 'http://schema.org/',
      '@type': 'Recipe',
      name: post.frontmatter.title,
      description: post.frontmatter.description || post.excerpt,
      image: images,
      url: canonicalPath,
      author: {
        '@type': 'Person',
        name: post.frontmatter.credit,
      },
      recipeCategory: post.frontmatter.category,
      datePublished: post.frontmatter.date,
    }

    // parse recipe metrics
    const cookTimeMatch = post.html.match(/Cook Time: ([0-9a-zA-Z\s]*)/)
    if (cookTimeMatch) {
      jsonLdPayload.cookTime = toIsoDuration(cookTimeMatch[1])
    }

    const prepTimeMatch = post.html.match(/Prep Time: ([0-9a-zA-Z\s]*)/)
    if (prepTimeMatch) {
      jsonLdPayload.prepTime = toIsoDuration(prepTimeMatch[1])
    }

    const servingsMatch = post.html.match(/Servings: ([0-9a-zA-Z\s]*)/)
    if (servingsMatch) {
      jsonLdPayload.recipeYield = servingsMatch[1]
    }

    // parse recipe ingredients
    const startOfDirections = post.html.indexOf("Directions")
    const ingredientsHtml = post.html.substring(
      post.html.indexOf("Ingredients"),
      startOfDirections < 0 ? post.html.length : post.html.indexOf("Directions")
    )
    const ingredientsMatch = ingredientsHtml.match(/<li>(.*?)<\/li>/g)
    if (ingredientsMatch) {
      jsonLdPayload.recipeIngredient = map(ingredientsMatch, i => i.replace(/<[^>]*>?/gm, ''))
    }
    console.log()

    console.log('json+ld: ', JSON.stringify(jsonLdPayload)) // todo remove

    return jsonLdPayload
  } catch (err) {
    console.log('oops something went wrong with json+ld', err)
    return null
  }
}
