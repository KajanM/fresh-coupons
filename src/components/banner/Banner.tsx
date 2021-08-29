import React, {useState} from 'react'
import {Box, BoxProps, HStack, Stack, Text} from '@chakra-ui/react'
import {CloseButton} from './CloseButton'

interface GradientBannerProps extends BoxProps {
  actionButton?: JSX.Element
  bannerContent: JSX.Element
  bannerBgColor?: string
}

function Banner(props: GradientBannerProps) {
  const {actionButton, bannerContent, bgColor, ...rest} = props

  const [isHidden, setIsHidden] = useState(false)

  return (
    <Box display={isHidden ? 'none' : 'block'} pos="fixed" bottom="0" left="0" width="full" as="section" {...rest}>
      <Box
        zIndex="9999"
        bg={bgColor || 'blue.600'}
        color="white"
        py="5"
        px={{base: '3', md: '6', lg: '8'}}
      >
        <HStack spacing="3">
          <Stack
            direction={{base: 'column', sm: 'row'}}
            justifyContent="center"
            alignItems="center"
            spacing={{base: '3', md: '6'}}
            width="full"
          >
            <Text fontSize="3xl">
              <b>FC: </b>
              {bannerContent}
            </Text>
            {actionButton}
          </Stack>
          <CloseButton onClick={() => setIsHidden(true)} alignSelf={{base: 'self-start', sm: 'initial'}}
                       aria-label="Close banner"/>
        </HStack>
      </Box>
    </Box>
  )
}

export default Banner
