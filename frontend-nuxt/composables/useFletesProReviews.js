import { computed } from 'vue'
import {
  buildMovingCompanyReviewsSchema,
  computeAggregateFromReviews,
  enrichLocalBusinessWithReviews
} from '~/utils/fletesProReviewsSchema'

const STATIC_REVIEW_DATES = ['2024-11-12', '2025-01-08', '2025-02-20']

/**
 * Opiniones estáticas (i18n) + API pública /api/testimonios
 */
export function useFletesProReviews() {
  const { t } = useI18n()

  const { data: apiData } = useFetch('/api/testimonios', {
    key: 'fletespro-testimonios-public'
  })

  const staticReviews = computed(() => {
    const keys = ['testimonial1', 'testimonial2', 'testimonial3']
    return keys.map((key, index) => ({
      name: t(`components.testimonials.${key}.name`),
      body: t(`components.testimonials.${key}.content`),
      rating: 5,
      role: t(`components.testimonials.${key}.role`),
      datePublished: STATIC_REVIEW_DATES[index]
    }))
  })

  const userReviews = computed(() => {
    const items = apiData.value?.items
    if (!Array.isArray(items)) return []
    return items.map((row) => ({
      name: row.name,
      body: row.comment,
      rating: Math.min(5, Math.max(1, Number(row.stars) || 5)),
      role: row.roleLabel || '',
      datePublished: row.createdAt ? row.createdAt.slice(0, 10) : undefined
    }))
  })

  const allReviews = computed(() => [...staticReviews.value, ...userReviews.value])

  const aggregate = computed(() => computeAggregateFromReviews(allReviews.value))

  const reviewsSchema = computed(() =>
    buildMovingCompanyReviewsSchema(allReviews.value, {
      siteUrl: 'https://fletespro.cl',
      businessType: 'MovingCompany'
    })
  )

  function withReviewsOnLocalBusiness(business) {
    return enrichLocalBusinessWithReviews(business, allReviews.value)
  }

  return {
    staticReviews,
    userReviews,
    allReviews,
    aggregate,
    reviewsSchema,
    withReviewsOnLocalBusiness
  }
}
