import {Badge, Box, Flex, Heading, Stack, Text, useColorModeValue, ChakraProvider} from '@chakra-ui/react'
import * as React from 'react'
import {NotificationWithActionButton} from '../components/notification/NotificationWithActionButton'
import {NotificationButton} from '../components/notification/NotificationButton'
import {Course} from "../models/course";
// import {useState} from "react";
// import {changeInputValue} from "../helpers/utils";
// import {
//   determineCouponStateAsync,
// } from "../helpers/udemy-course-details-page-helpers";
import {CouponState} from "../helpers/coupon-state";

interface ApplyCouponNotificationProps {
  course: Course
  couponState: CouponState
  onApplyCoupon: () => any
  onClose: () => any
}

export function CouponAvailableNotification(props: ApplyCouponNotificationProps) {
  const {couponState, onApplyCoupon, onClose} = props

  return (
    <ChakraProvider>
      <Box
        position="fixed"
        bottom="8"
        right="8"
        zIndex="10000"
        as="section"
        bg={useColorModeValue('gray.50', 'inherit')}
      >
        <Flex direction="row-reverse">
          <NotificationWithActionButton
            primaryAction={<NotificationButton colorScheme="blue" onClick={onApplyCoupon}>Apply</NotificationButton>}
            secondaryAction={<NotificationButton onClick={onClose}>Close</NotificationButton>}
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
          </NotificationWithActionButton>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}
