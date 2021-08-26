import {Badge, Box, Flex, Heading, Stack, Text, useColorModeValue} from '@chakra-ui/react'
import * as React from 'react'
import {Notification} from '../components/notification/Notification'
import {NotificationButton} from '../components/notification/NotificationButton'
import {Course} from "../models/course";

interface ApplyCouponNotificationProps {
  course: Course
}

export function CouponAvailableNotification(props: ApplyCouponNotificationProps) {

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
          primaryAction={<NotificationButton colorScheme="blue">Apply</NotificationButton>}
          secondaryAction={<NotificationButton>Close</NotificationButton>}
        >
          <Stack spacing="1">
            <Heading as="h3" size="lg">
              Fresh Coupons
            </Heading>
            <Text>
              A coupon code is available <Badge fontSize="xl" colorScheme="green">{props.course.discountPercentage}</Badge>.
            </Text>
          </Stack>
        </Notification>
      </Flex>
    </Box>
  )
}
