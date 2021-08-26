import React, {useEffect, useState} from 'react'
import {CouponAvailableNotification} from "./CouponAvailableNotification";

import {ChakraProvider, Text} from '@chakra-ui/react';
import {useCourses} from "../hooks/useCourses";
import {Course} from "../models/course";
import {CouponState} from "../helpers/coupon-state";
import {determineCouponStateAsync} from "../helpers/udemy-course-details-page-helpers";

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

  return (
    <ChakraProvider>
      {couponState === CouponState.Pending && <CouponAvailableNotification course={courseDetails!}/>}
      {couponState === CouponState.Applied && <Text>Coupon applied</Text>}
    </ChakraProvider>
  )
}

export default CourseDetailsPage
