import * as React from 'react'
import {Stack, Heading, Text, ChakraProvider} from "@chakra-ui/react"
import {Notification} from "../components/notification/Notification"

function CouponAppliedNotification() {

  return (
    <ChakraProvider>
      <Notification color="green">
        <Stack spacing="1">
          <Heading as="h3" fontSize="md">
            Fresh Coupons
          </Heading>
          <Text fontSize="sm">Coupon is applied successfully 🥳</Text>
        </Stack>
      </Notification>
    </ChakraProvider>
  )
}

export default CouponAppliedNotification
