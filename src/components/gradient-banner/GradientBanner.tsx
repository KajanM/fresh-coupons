import {Box, BoxProps, HStack, Stack, Text} from '@chakra-ui/react'
import * as React from 'react'
import { CloseButton } from './CloseButton'

interface GradientBannerProps extends BoxProps {
  actionButton?: React.ReactNode
  bannerContent: React.ReactNode
  onClose: () => void
}

const GradientBanner = (props : GradientBannerProps) => {
  const {actionButton, bannerContent, onClose, ...rest} = props

  return (
    <Box pos="fixed" bottom="0" left="0" width="full" as="section" {...rest}>
      <Box
        bgGradient="linear(to-r, blue.500, purple.500)"
        color="white"
        py="3"
        px={{ base: '3', md: '6', lg: '8' }}
      >
        <HStack spacing="3">
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            spacing={{ base: '3', md: '6' }}
            width="full"
          >
            <Text>
              <b>Fresh Coupons </b>
              {bannerContent}
            </Text>
            {actionButton}
          </Stack>
          <CloseButton onClick={onClose} alignSelf={{ base: 'self-start', sm: 'initial' }} aria-label="Close banner" />
        </HStack>
      </Box>
    </Box>
  )
}

export default GradientBanner
