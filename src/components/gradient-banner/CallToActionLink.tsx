import { Box, BoxProps } from '@chakra-ui/react'
import * as React from 'react'

export const CallToActionLink = (props: BoxProps) => (
  <Box
    as="a"
    href="#"
    py="1"
    px="4"
    bg="white"
    color="blue.600"
    fontWeight="semibold"
    rounded="base"
    whiteSpace="nowrap"
    {...props}
  />
)
