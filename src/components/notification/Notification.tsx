import { Box, Center, Flex, FlexProps, Icon, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { FiInfo } from 'react-icons/fi'

interface NotificationProps extends FlexProps {
  color: string
}

export const Notification = (props: NotificationProps) => {
  const { children, color, ...flexProps } = props

  return (
    <Flex
      fontSize="md"
      direction={{ base: 'column', sm: 'row' }}
      width="sm"
      boxShadow="lg"
      bg={useColorModeValue('white', 'gray.700')}
      borderRadius={{ base: 'none', sm: 'base' }}
      overflow="hidden"
      borderTopWidth={{ base: '4px', sm: '0' }}
      borderColor={useColorModeValue(`${color}.500`, `${color}.500`)}
      {...flexProps}
    >
      <Center
        display={{ base: 'none', sm: 'flex' }}
        bg={useColorModeValue(`${color}.500`, `${color}.500`)}
        px="4"
      >
        <Icon as={FiInfo} boxSize="9" color={useColorModeValue('white', 'gray.900')} />
      </Center>
      <Box px="4" py="3">
        {children}
      </Box>
    </Flex>
  )
}
