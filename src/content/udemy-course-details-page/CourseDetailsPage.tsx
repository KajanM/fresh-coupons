import React, {useEffect, useState} from 'react'

import {ChakraProvider} from '@chakra-ui/react';
import {useCourses} from "../../hooks/useCourses";
import {Course} from "../../models/course";
import {CouponState} from "../../helpers/coupon-state";
import {determineCouponStateAsync} from "../../helpers/udemy-course-details-page-helpers";
import CouponAvailableBanner from "./CouponAvailableBanner";
import CouponAppliedBanner from "./CouponAppliedBanner";
import CouponExpiredBanner from "./CouponExpiredBanner";

function CourseDetailsPage() {
  const [couponState, setCouponState] = useState<CouponState>(CouponState.NotFound)
  const [courseDetails, setCourseDetails] = useState<Course | undefined>()
  const courses = useCourses()

  useEffect(() => {
    const currentUrl = location.href.split('?')[0]
    const courseDetails = courses[currentUrl]
    if (courseDetails) {
      determineCouponStateAsync().then(setCouponState)
      setCourseDetails(courseDetails)
    }
  }, [courses])

  function onCouponApplied() {
    determineCouponStateAsync().then(setCouponState)
  }

  return (
    <ChakraProvider>
      {couponState === CouponState.Pending && (<CouponAvailableBanner
          couponCode={courseDetails!.couponCode}
          discountPercentage={courseDetails!.discountPercentage}
          onCouponApplied={onCouponApplied}/>
      )}
      {couponState === CouponState.Applied && <CouponAppliedBanner />}
      {couponState === CouponState.Expired && <CouponExpiredBanner />}
    </ChakraProvider>
  )
}

export default CourseDetailsPage
