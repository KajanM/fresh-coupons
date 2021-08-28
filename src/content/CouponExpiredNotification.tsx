import * as React from 'react'
import {Stack, Heading, Text, ChakraProvider} from "@chakra-ui/react"
import {Notification} from "../components/notification/Notification"

function CouponExpiredNotification() {

  return (
    <ChakraProvider>
      <Notification color="red">
        <Stack spacing="1">
          <Heading as="h3" fontSize="md">
            Fresh Coupons
          </Heading>
          <Text fontSize="sm">Coupon has expired 🤷‍♂️</Text>
        </Stack>
      </Notification>
    </ChakraProvider>
  )
}

export default CouponExpiredNotification
