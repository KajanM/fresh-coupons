import {
  Badge,
  Box,
  HStack,
  Icon,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiOutlineCalendar, HiOutlineClock, HiUserGroup} from 'react-icons/hi'
import {Card} from './Card'
import {CourseRating} from './CourseRating'
import {Course} from "../../models/course";
import {BsPersonSquare, MdLanguage} from "react-icons/all";
import {ExternalLinkIcon} from "@chakra-ui/icons"

interface CourseCardProps {
  course: Course
}

function CourseCard(props: CourseCardProps) {
  const {course} = props
  return (
    <Box as="section" py="1">
      <Card maxW={"8xl"}>
        <Badge
          position="absolute"
          top="0"
          left="0"
          fontSize="md"
          variant="solid"
          colorScheme="orange">{course.discountPercentage}</Badge>
        <Stack
          spacing="5"
          align="flex-start"
        >
          <Link
            _visited={{
              color: "cadetblue"
            }}
            href={`${course.courseUri}?couponCode=${course.couponCode}`} target="_blank" isExternal>
            <Text as="h2" fontWeight="bold" fontSize="xl">
              {course.title}
              <ExternalLinkIcon mx="2px"/>
            </Text>
          </Link>
          <HStack my="2" spacing="3">
            <Icon boxSize={8} as={MdLanguage} color="gray.400"/>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={useColorModeValue('gray.600', 'gray.300')}
            >
              {course.language}
            </Text>
            <Tag ml="4" px="3" color={useColorModeValue('gray.600', 'gray.300')}>
              {course?.category || 'Misc'}
            </Tag>
          </HStack>
          <HStack my="4" spacing="4">
            <CourseRating reviewCount={course.ratingCount} rating={course.ratingValue}/>
            <HStack>
              <Icon as={HiUserGroup} fontSize="xl" color="gray.400"/>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                <b>{course.enrolledStudentsCount}</b> enrolled
              </Text>
            </HStack>

            <HStack spacing="1">
              <Icon boxSize={8} as={HiOutlineClock} color="gray.400"/>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {course.courseDuration}
              </Text>
            </HStack>
            <HStack spacing="1">
              <Icon boxSize={8} as={HiOutlineCalendar} color="gray.400"/>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {course.lastUpdated}
              </Text>
            </HStack>

          </HStack>
          <Box fontSize="sm" noOfLines={2}>
            {course.shortDescription}
          </Box>
          <HStack mt="4" spacing="1">
            <Icon as={BsPersonSquare} color="gray.400"/>
            <Link
              href={`https://${course.courseProviderUri}`}
              isExternal
              fontSize="sm"
              fontWeight="medium"
              _visited={{
                color: "cadetblue"
              }}
              color={useColorModeValue('gray.600', 'gray.300')}
            >
              {course.courseProviderName}
              <ExternalLinkIcon mx="2"/>
            </Link>
          </HStack>
        </Stack>
      </Card>
    </Box>
  )
}

export default CourseCard
