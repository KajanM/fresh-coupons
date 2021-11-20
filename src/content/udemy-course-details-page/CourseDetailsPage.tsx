import React, {useEffect, useState} from 'react'

import {ChakraProvider} from '@chakra-ui/react';
import {useCourses} from "../../hooks/useCourses";
import {CouponState} from "../../helpers/coupon-state";
import {determineCouponStateAsync} from "../../helpers/udemy-course-details-page-helpers";
import CouponAvailableBanner from "./CouponAvailableBanner";
import CouponAppliedBanner from "./CouponAppliedBanner";
import CouponExpiredBanner from "./CouponExpiredBanner";
import {CourseDetailsWithCouponCode} from "../../models/course-details-with-coupon-code";

function CourseDetailsPage() {
  const [couponState, setCouponState] = useState<CouponState>(CouponState.NotFound)
  const [courseDetails, setCourseDetails] = useState<CourseDetailsWithCouponCode | undefined>()
  const courses = useCourses()

  useEffect(() => {
    const currentUrl = location.href.split('?')[0]
    const courseDetails = courses.freeCourses[currentUrl] || courses.coursesWithCoupon[currentUrl]
    if (courseDetails) {
      setCourseDetails(courseDetails)
      if (!courseDetails.isAlreadyAFreeCourse) {
        determineCouponStateAsync().then(setCouponState)
      }
    }
  }, [courses])

  function onCouponApplied() {
    determineCouponStateAsync().then(setCouponState)
  }

  if (courseDetails?.isAlreadyAFreeCourse) {
    return <div>Already a free course!</div>
  }

  return (
    <ChakraProvider>
      {couponState === CouponState.Pending && (<CouponAvailableBanner
          couponCode={courseDetails!.couponData!.couponCode}
          discountPercentage={courseDetails!.couponData!.discountPercentage + '%'}
          onCouponApplied={onCouponApplied}/>
      )}
      {couponState === CouponState.Applied && <CouponAppliedBanner />}
      {couponState === CouponState.Expired && <CouponExpiredBanner />}
    </ChakraProvider>
  );
}

export default CourseDetailsPage
