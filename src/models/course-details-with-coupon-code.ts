import {Course} from "./course";
import {CouponData} from "./coupon-data";

export interface CourseDetailsWithCouponCode {
  courseDetails: Course
  couponData: CouponData | null
  isAlreadyAFreeCourse: boolean
}
