import React, {useEffect, useRef, useState} from 'react'
import {CouponAvailableNotification} from "./CouponAvailableNotification";

import {ChakraProvider, ToastId, useToast} from '@chakra-ui/react';
import {useCourses} from "../hooks/useCourses";
import {Course} from "../models/course";
import {CouponState} from "../helpers/coupon-state";
import {determineCouponStateAsync} from "../helpers/udemy-course-details-page-helpers";
import {changeInputValue} from "../helpers/utils";
import CouponExpiredNotification from "./CouponExpiredNotification";
import CouponAppliedNotification from "./CouponAppliedNotification";
import GradientBanner from "../components/gradient-banner/GradientBanner";

function CourseDetailsPage() {
  const [couponState, setCouponState] = useState<CouponState>(CouponState.NotFound)
  const [courseDetails, setCourseDetails] = useState<Course | undefined>()
  const [isHidden, setIsHidden] = useState(false)
  const courses = useCourses()
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()

  function closeToast() {
    if(!toastIdRef.current) return
    toast.close(toastIdRef.current)
  }

  function applyCoupon() {
    const showCouponInputEle: HTMLButtonElement | null = document.querySelector('[data-purpose="no-coupon-button"]')

    if (showCouponInputEle) {
      showCouponInputEle.click()
    }
    const couponInputEle: HTMLInputElement | null = document.querySelector('[data-purpose="coupon-input"]');

    if (!couponInputEle) {
      console.error('unable to find the coupon input')
      return
    }

    changeInputValue(couponInputEle, courseDetails!.couponCode)
    const couponSubmitButtonEle: HTMLButtonElement | null = document.querySelector('[data-purpose="coupon-submit"]')
    if (!couponSubmitButtonEle) {
      console.error('unable to find the coupon submit button')
      return;
    }
    couponSubmitButtonEle.click()

    determineCouponStateAsync().then(setCouponState)
  }

  useEffect(() => {
    const currentUrl = location.href.split('?')[0]
    const courseDetails = courses[currentUrl]
    if (courseDetails) {
      determineCouponStateAsync().then(setCouponState)
      setCourseDetails(courseDetails)
    }
  }, [courses])


  useEffect(function showAppropriateNotification() {
    switch (couponState) {
      case CouponState.NotFound:
        return
      case CouponState.Pending:
        return
        showCouponAvailableNotification();
        return
      case CouponState.Applied:
        showCouponSuccessfullyAppliedNotification();
        return;
      case CouponState.Expired:
        showCouponExpiredNotification();
        return;
    }

    function showCouponAvailableNotification() {
      toastIdRef.current = toast({
        position: "bottom-right",
        duration: null,
        // eslint-disable-next-line react/display-name
        render: () => (<CouponAvailableNotification course={courseDetails!}
                                                    onApplyCoupon={applyCoupon}
                                                    onClose={closeToast}
                                                    couponState={couponState}/>)
      })
    }

    function showCouponSuccessfullyAppliedNotification() {
      toast.closeAll()
      toastIdRef.current = toast({
        position: "bottom-right",
        duration: null,
        // eslint-disable-next-line react/display-name
        render: () => <CouponAppliedNotification/>
      })
    }

    function showCouponExpiredNotification() {
      toast.closeAll()
      toastIdRef.current = toast({
        position: "bottom-right",
        duration: null,
        // eslint-disable-next-line react/display-name
        render: () => <CouponExpiredNotification/>
      })
    }
  }, [couponState])

  return (
      <ChakraProvider>
        <GradientBanner display={isHidden ? 'none' : 'block'} onClose={() => setIsHidden(true)} bannerContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur corporis cupiditate eos in incidunt molestiae nemo neque tenetur velit! Alias assumenda expedita harum illum labore magni maxime nobis, optio." />
      </ChakraProvider>
  )
}

export default CourseDetailsPage
