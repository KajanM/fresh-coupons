import { IconButton, IconButtonProps } from '@chakra-ui/react'
import * as React from 'react'
import { HiX } from 'react-icons/hi'

export const CloseButton = (props: IconButtonProps) => (
  <IconButton fontSize="1.5em" variant="ghost" icon={<HiX />} {...props} />
)
