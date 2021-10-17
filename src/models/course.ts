export interface Course {
  title: string,
  shortDescription: string,
  language: string,
  courseUri: string,
  couponCode: string,
  imageUri: string,
  priceAfterCouponIsApplied: string,
  discountPercentage: string,
  courseDuration: string,
  rating: string,
  enrolledStudentsCount?: string,
  lastUpdated: string,
  courseProviderName: string,
  courseProviderRating: string,
  courseProviderUri: string,
  isValidCoupon: boolean,
  category?: string
  ratingValue?: number
  ratingCount?: number
}
