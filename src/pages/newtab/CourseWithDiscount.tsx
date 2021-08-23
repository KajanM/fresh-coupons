import { Badge, Box, Button, Stack, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';
import { Course } from '../../models/course';

interface DescriptionProps {
  course: Course
}

export const CourseWithDiscount = (props: DescriptionProps) => {
  const { course } = props;
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing='5'
      justify='space-between'
      pos='relative'
    >
      <Stack direction={{ base: 'column', sm: 'row' }} spacing='4' align='flex-start' flex='1'>
        <Box flex='1'>
          <Box as='h2' fontWeight='bold' maxW='xl'>
            <span>{course.title}</span> <Badge colorScheme="green" variant="solid" marginStart='1'>{course.discountPercentage}</Badge>
          </Box>
          <Box
            maxW={{ base: 'xs', md: 'unset' }}
            color={mode('gray.600', 'gray.400')}
            fontSize='sm'
          >
            <Box>{course.rating} | {course.enrolledStudentsCount}</Box>
            <Box>{course.courseDuration}</Box>
            <Box>{course.lastUpdated}</Box>
            <Box>{course.shortDescription}</Box>
          </Box>
        </Box>
      </Stack>
      <Button as="a" colorScheme='blue' target="_blank" href={`${course.courseUri}?couponCode=${course.couponCode}`}>
        Enroll
      </Button>
    </Stack>
  );
};
