import {Box, Heading, Stack, Text, useColorModeValue as mode} from '@chakra-ui/react'
import * as React from 'react'
import {useCourses} from '../../hooks/useCourses'
import CourseCard from "../../components/course-card/CourseCard";

export const CoursesWithDiscount = () => {
  const courses = useCourses()

  return (
    <Box as="section" bg={mode('gray.50', 'inherit')} py="12">
      <Box textAlign="center" mb="8" maxW="md" mx="auto">
        <Heading size="2xl" fontWeight="extrabold" letterSpacing="tight">
          Fresh Coupons
        </Heading>
        <Text mt="4" fontSize="lg" color={mode('gray.600', 'gray.400')}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus
          atque, ducimus sed.
        </Text>
      </Box>
      <Box maxW={{base: 'xl', md: '7xl'}} mx="auto" px={{md: '8'}}>
        <Stack spacing="6" py="5" px="8">
          {Object.entries(courses).map(([url, course]) => (
            <CourseCard key={url} course={course}/>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
