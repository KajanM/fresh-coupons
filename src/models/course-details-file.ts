import {CourseDetailsWithCouponCode} from "./course-details-with-coupon-code";

export interface CourseDetailsFile {
  coursesWithCoupon: Record<string, CourseDetailsWithCouponCode>
  freeCourses: Record<string, CourseDetailsWithCouponCode>
}
