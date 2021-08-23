import {
  Box,
  Stack,
  StackDivider,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { CourseWithDiscount } from './CourseWithDiscount'
import { courses } from '../../assets/mock/udemy-1'

export const CoursesWithDiscount = () => {
  return (
    <Box as="section" bg={mode('gray.600', 'inherit')} py="12">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
        <Box
          rounded={{ lg: 'lg' }}
          bg={mode('white', 'gray.700')}
          maxW="3xl"
          mx="auto"
          shadow="base"
          overflow="hidden"
        >
          <Stack spacing="6" divider={<StackDivider />} py="5" px="8">
            {Object.entries(courses).map(([url, course]) => (
              <CourseWithDiscount key={url} course={course} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
