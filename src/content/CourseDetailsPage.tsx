import React, {useEffect, useState} from 'react'
import {CouponAvailableNotification} from "./CouponAvailableNotification";

import {ChakraProvider} from '@chakra-ui/react';
import {useCourses} from "../hooks/useCourses";
import {Course} from "../models/course";

enum CouponState {
  Found,
  Applied,
  NotFound,
}

function CourseDetailsPage() {
  const [couponState, setCouponState] = useState<CouponState>(CouponState.NotFound)
  const [courseDetails, setCourseDetails] = useState<Course | undefined>()
  const courses = useCourses()

  useEffect(() => {
    const currentUrl = location.href.split('?')[0]
    console.log('courses', courses)
    const courseDetails = courses[currentUrl]
    if (courseDetails) {
      setCouponState(CouponState.Found)
      setCourseDetails(courseDetails)
    }
  }, [courses])

  return (
    <ChakraProvider>
      {couponState === CouponState.Found && <CouponAvailableNotification course={courseDetails!}/>}
    </ChakraProvider>
  )
}

export default CourseDetailsPage
