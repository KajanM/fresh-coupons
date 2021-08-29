import {StorageKeys} from "../../models/storage-keys";

const isTest = true
const couponAvailableBadgeClassName = 'fresh-coupons--coupon-available-badge';

setInterval(mountCouponBadgeAsync, 3000)

async function mountCouponBadgeAsync() {
  const selector = 'a[href^="/course/"]'

  const courseElements: HTMLLinkElement[] = Array.from(document.querySelectorAll(selector))
  if (!courseElements.length) return;

  chrome.storage.local.get([StorageKeys.Courses], result => {
    const courses = result[StorageKeys.Courses]

    courseElements.forEach(courseContainerEle => {
      const course = courses[courseContainerEle.href]
      if(!course && !isTest) return

      if(courseContainerEle.querySelector(`.${couponAvailableBadgeClassName}`)) return

      courseContainerEle.style.position = 'relative'
      const imageContainerEle = courseContainerEle.querySelector('[class^="course-card--image-wrapper"]')
      if(!imageContainerEle) return

      imageContainerEle.appendChild(getCouponAvailableBadgeElement(isTest ? '100% off' : course.discountPercentage))
    })

    function getCouponAvailableBadgeElement(discountPercentage: string) {
      const couponAvailableBadge = document.createElement('div')
      couponAvailableBadge.classList.add(couponAvailableBadgeClassName)
      couponAvailableBadge.style.backgroundColor = "orange"
      couponAvailableBadge.style.color = "white"
      couponAvailableBadge.style.fontWeight = "bold"
      couponAvailableBadge.style.position = "absolute"
      couponAvailableBadge.style.bottom = "0"
      couponAvailableBadge.style.left = "0"
      couponAvailableBadge.style.padding = "5px 10px"
      couponAvailableBadge.innerText = `Coupon available (${discountPercentage})`
      return couponAvailableBadge;
    }
  })
}
