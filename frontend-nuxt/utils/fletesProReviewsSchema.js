/**
 * JSON-LD para opiniones (Review + AggregateRating) — FletesPro
 */

export function computeAggregateFromReviews(reviews) {
  if (!reviews?.length) return null
  const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0)
  const count = reviews.length
  if (count === 0) return null
  return {
    ratingValue: Math.round((sum / count) * 10) / 10,
    reviewCount: count,
    bestRating: 5,
    worstRating: 1
  }
}

export function buildAggregateRatingSchema(aggregate) {
  if (!aggregate) return null
  return {
    '@type': 'AggregateRating',
    ratingValue: String(aggregate.ratingValue),
    reviewCount: String(aggregate.reviewCount),
    bestRating: String(aggregate.bestRating),
    worstRating: String(aggregate.worstRating)
  }
}

export function buildReviewSchema(review, itemReviewed = { '@type': 'MovingCompany', name: 'FletesPro' }) {
  const entry = {
    '@type': 'Review',
    author: { '@type': 'Person', name: review.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.body,
    itemReviewed
  }
  if (review.datePublished) {
    entry.datePublished = review.datePublished
  }
  return entry
}

/** MovingCompany / LocalBusiness con aggregateRating y review[] */
export function buildMovingCompanyReviewsSchema(reviews, options = {}) {
  const siteUrl = options.siteUrl || 'https://fletespro.cl'
  const aggregate = computeAggregateFromReviews(reviews)
  if (!aggregate) return null

  const itemReviewed = {
    '@type': options.businessType || 'MovingCompany',
    '@id': `${siteUrl}/#fletespro`,
    name: options.businessName || 'FletesPro',
    url: siteUrl
  }

  return {
    '@context': 'https://schema.org',
    '@type': options.businessType || 'MovingCompany',
    '@id': `${siteUrl}/#fletespro`,
    name: options.businessName || 'FletesPro',
    url: siteUrl,
    telephone: options.telephone || '+56-9-7979-6841',
    aggregateRating: buildAggregateRatingSchema(aggregate),
    review: reviews.map((r) => buildReviewSchema(r, itemReviewed))
  }
}

/** Para anidar en provider de Service */
export function enrichLocalBusinessWithReviews(business, reviews) {
  const aggregate = computeAggregateFromReviews(reviews)
  if (!aggregate) return business
  return {
    ...business,
    aggregateRating: buildAggregateRatingSchema(aggregate),
    review: reviews.map((r) =>
      buildReviewSchema(r, {
        '@type': business['@type'] || 'LocalBusiness',
        name: business.name || 'FletesPro'
      })
    )
  }
}
