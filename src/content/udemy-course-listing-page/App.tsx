import {StorageKeys} from "../../models/storage-keys";
import {CourseDetailsFile} from "../../models/course-details-file";
import {CourseDetailsWithCouponCode} from "../../models/course-details-with-coupon-code";

const isTest = false
const couponAvailableBadgeClassName = 'fresh-coupons--coupon-available-badge';

setInterval(mountCouponBadgeAsync, 3000)

async function mountCouponBadgeAsync() {
  const selector = 'a[href^="/course/"]'

  const courseElements: HTMLLinkElement[] = Array.from(document.querySelectorAll(selector))
  if (!courseElements.length) return;

  chrome.storage.local.get([StorageKeys.Courses], result => {
    const courses: CourseDetailsFile = result[StorageKeys.Courses]

    courseElements.forEach(courseContainerEle => {
      const course: CourseDetailsWithCouponCode = courses.coursesWithCoupon[courseContainerEle.href] || courses.freeCourses[courseContainerEle.href]
      if(!course && !isTest) return

      if(courseContainerEle.querySelector(`.${couponAvailableBadgeClassName}`)) return

      courseContainerEle.style.position = 'relative'
      const imageContainerEle = courseContainerEle.querySelector('[class^="course-card--image-wrapper"]')
      if(!imageContainerEle) return

      imageContainerEle.appendChild(getCouponAvailableBadgeElement(course.couponData?.discountPercentage, course.isAlreadyAFreeCourse))
    })

    function getCouponAvailableBadgeElement(discountPercentage: number | undefined, isAlreadyAFreeCourse = false) {
      const couponAvailableBadge = document.createElement('div')
      couponAvailableBadge.classList.add(couponAvailableBadgeClassName)
      couponAvailableBadge.style.backgroundColor = "orange"
      couponAvailableBadge.style.color = "white"
      couponAvailableBadge.style.fontWeight = "bold"
      couponAvailableBadge.style.position = "absolute"
      couponAvailableBadge.style.bottom = "0"
      couponAvailableBadge.style.left = "0"
      couponAvailableBadge.style.padding = "5px 10px"
      couponAvailableBadge.innerText = isAlreadyAFreeCourse ? 'FREE' : `Coupon available (${discountPercentage}% OFF)`
      return couponAvailableBadge;
    }
  })
}
