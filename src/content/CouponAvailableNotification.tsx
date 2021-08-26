import {Badge, Box, Flex, Heading, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import {Notification} from '../components/notification/Notification'
import {NotificationButton} from '../components/notification/NotificationButton'
import {Course} from "../models/course";
import {useState} from "react";
import {changeInputValue} from "../helpers/utils";
import {
  determineCouponStateAsync,
} from "../helpers/udemy-course-details-page-helpers";
import {CouponState} from "../helpers/coupon-state";

interface ApplyCouponNotificationProps {
  course: Course
}

export function CouponAvailableNotification(props: ApplyCouponNotificationProps) {
  const [couponState, setCouponState] = useState(CouponState.Pending)

  const applyCoupon = () => {
    const showCouponInputEle: HTMLButtonElement | null = document.querySelector('[data-purpose="no-coupon-button"]')

    if (showCouponInputEle) {
      showCouponInputEle.click()
    }
    const couponInputEle: HTMLInputElement | null = document.querySelector('[data-purpose="coupon-input"]');

    if (!couponInputEle) {
      console.error('unable to find the coupon input')
      return
    }

    changeInputValue(couponInputEle, props.course.couponCode)
    const couponSubmitButtonEle : HTMLButtonElement | null = document.querySelector('[data-purpose="coupon-submit"]')
    if (!couponSubmitButtonEle) {
      console.error('unable to find the coupon submit button')
      return;
    }
    couponSubmitButtonEle.click()

    determineCouponStateAsync().then(setCouponState)
  }

  return (
    <Box
      position="fixed"
      bottom="8"
      right="8"
      zIndex="10000"
      as="section"
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      <Flex direction="row-reverse">
        <Notification
          primaryAction={<NotificationButton colorScheme="blue" onClick={applyCoupon}>Apply</NotificationButton>}
          secondaryAction={<NotificationButton>Close</NotificationButton>}
        >
          <Stack spacing="1">
            <Heading as="h3" size="lg">
              Fresh Coupons
            </Heading>
            {couponState === CouponState.Applied && (
              <Text color="green">Coupon successfully applied 🎉</Text>
            )}
            {couponState === CouponState.Pending && (
              <Text>
                A coupon code is available <Badge fontSize="xl"
                                                  colorScheme="green">{props.course.discountPercentage}</Badge>.
              </Text>
            )}
            {couponState === CouponState.Expired && <Text color="red">Sorry the coupon code has expired</Text>}
          </Stack>
        </Notification>
      </Flex>
    </Box>
  )
}
