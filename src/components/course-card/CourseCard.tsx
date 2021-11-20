import {Badge, BadgeProps, Box, HStack, Icon, Link, LinkProps, Stack, StackProps, Tag, Text, useColorModeValue, } from '@chakra-ui/react'
import * as React from 'react'
import {HiOutlineCalendar, HiOutlineClock, HiUserGroup} from 'react-icons/hi'
import {Card} from './Card'
import {CourseRating} from './CourseRating'
import {BsPersonSquare, MdLanguage} from "react-icons/all"
import {ExternalLinkIcon} from "@chakra-ui/icons"
import {CourseDetailsWithCouponCode} from "../../models/course-details-with-coupon-code"
import {Instructor} from "../../models/instructor"

interface EnrolledStudentsCountProps extends StackProps {
  enrolledStudentsCount: string | null
}

function EnrolledStudentsCount({enrolledStudentsCount, ...props}: EnrolledStudentsCountProps) {
  if (!enrolledStudentsCount) {
    return <></>
  }

  return (
    <HStack {...props}>
      <Icon as={HiUserGroup} fontSize="xl" color="gray.400"/>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        <b>{enrolledStudentsCount}</b> enrolled
      </Text>
    </HStack>
  )
}

function CourseDuration({duration, isFreeCourse = false}: { duration: string | null, isFreeCourse : boolean }) {
  if (!duration) {
    return <></>
  }

  if (isFreeCourse) {
    duration = `${Math.round(+duration/360)/10} hours`
  }

  return (
    <HStack spacing="1">
      <Icon boxSize={8} as={HiOutlineClock} color="gray.400"/>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        {duration}
      </Text>
    </HStack>
  )
}

interface LastUpdatedProps extends StackProps {
  lastUpdated: string | null
}

function LastUpdated({lastUpdated, ...props}: LastUpdatedProps) {
  if (!lastUpdated) {
    return <></>
  }

  return (
    <HStack spacing="1" {...props}>
      <Icon boxSize={8} as={HiOutlineCalendar} color="gray.400"/>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        {lastUpdated}
      </Text>
    </HStack>
  )
}

interface CourseTagsProps extends StackProps {
  tags: string[] | null
}

function CourseTags({tags}: CourseTagsProps) {
  if (!tags) {
    return <></>
  }

  return (
    <HStack my="2" spacing="3">
      {tags && tags.map(tag => (
        <Tag px="3" key={tag} color={useColorModeValue('gray.600', 'gray.300')}>
          {tag || 'Misc'}
        </Tag>
      ))}
    </HStack>
  )
}

interface CourseInstructorsProps extends StackProps {
  instructors: Instructor[] | null
}

function CourseInstructors({instructors, ...props}: CourseInstructorsProps) {
  if (!instructors) {
    return <></>
  }

  return (
    <HStack mt="4" spacing={3} {...props}>
      {instructors && instructors.map(instructor => (
        <HStack spacing={1} key={instructor.url}>
          <Icon as={BsPersonSquare} color="gray.400"/>
          <Link
            href={`https://${instructor.url}`}
            isExternal
            fontSize="sm"
            fontWeight="medium"
            _visited={{
              color: "cadetblue"
            }}
            color={useColorModeValue('gray.600', 'gray.300')}
          >
            {instructor.name}
            <ExternalLinkIcon mx="2"/>
          </Link>
        </HStack>
      ))}
    </HStack>
  )
}

interface CourseTitleProps extends LinkProps {
  title: string
  url: string
}

function CourseTitle({title, url, ...props}: CourseTitleProps) {
  return (
    <Link
      _visited={{
        color: "cadetblue"
      }}
      href={url} target="_blank" isExternal {...props}>
      <Text as="h2" fontWeight="bold" fontSize="xl">
        {title}
        <ExternalLinkIcon mx="2px"/>
      </Text>
    </Link>
  )
}

interface CourseLanguageProps extends StackProps {
  language: string
}

function CourseLanguage({language, ...props}: CourseLanguageProps) {
  return (
    <HStack spacing={1} {...props}>
      <Icon boxSize={8} as={MdLanguage} color="gray.400"/>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'gray.300')}
      >
        {language}
      </Text>
    </HStack>
  )
}

interface DiscountBadgeProps extends BadgeProps {
  isAlreadyAFreeCourse: boolean
  discountPercentage?: number
}

function DiscountBadge({isAlreadyAFreeCourse, discountPercentage, ...props}: DiscountBadgeProps) {
  return (
    <Badge
      position="absolute"
      top="0"
      left="0"
      fontSize="md"
      variant="solid"
      colorScheme="orange"
      {...props}>{isAlreadyAFreeCourse ? "FREE" : `${discountPercentage}% OFF`}</Badge>
  )
}

interface CourseCardProps {
  course: CourseDetailsWithCouponCode
}

function CourseCard(props: CourseCardProps) {
  const {courseDetails: course, couponData, isAlreadyAFreeCourse} = props.course
  const courseLink = isAlreadyAFreeCourse ? course.courseUri : `${course.courseUri}?couponCode=${couponData?.couponCode}`

  return (
    <Box as="section" py="1">
      <Card maxW={"8xl"}>
        <DiscountBadge isAlreadyAFreeCourse={isAlreadyAFreeCourse} discountPercentage={couponData?.discountPercentage}/>
        <Stack
          spacing="5"
          align="flex-start"
        >
          <HStack spacing={3}>
            <CourseTitle title={course.title} url={courseLink}/>
            <CourseLanguage language={course.language}/>
          </HStack>
          <CourseTags tags={course.tags}/>
          <HStack my="4" spacing="4">
            <CourseRating reviewCount={course.rating?.count} rating={course.rating?.averageValue}/>
            <EnrolledStudentsCount enrolledStudentsCount={course.enrolledStudentsCount}/>
            <CourseDuration duration={course.duration} isFreeCourse={isAlreadyAFreeCourse}/>
            <LastUpdated lastUpdated={course.lastUpdated}/>
          </HStack>
          <Box fontSize="sm" noOfLines={2}>
            {course.shortDescription}
          </Box>
          <CourseInstructors instructors={course.instructors}/>
        </Stack>
      </Card>
    </Box>
  )
}

export default CourseCard
