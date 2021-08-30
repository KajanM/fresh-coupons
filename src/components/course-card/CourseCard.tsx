import {
  Badge,
  // Avatar,
  Box,
  Button, Center,
  HStack,
  Icon, Link,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import * as React from 'react'
import {HiUserGroup, HiOutlineCalendar, HiOutlineClock} from 'react-icons/hi'
import {Card} from './Card'
import {CourseRating} from './CourseRating'
import {Course} from "../../models/course";
import {BsPersonSquare, GrLanguage} from "react-icons/all";
import {ExternalLinkIcon} from "@chakra-ui/icons"

interface CourseCardProps {
  course: Course
}

function CourseCard(props: CourseCardProps) {
  const {course} = props
  return (
    <Box as="section" py="1">
      <Card>
        <Badge
          position="absolute"
          top="0"
          left="0"
          fontSize="md"
          variant="solid"
          colorScheme="orange">{course.discountPercentage}</Badge>
        <Stack
          direction={{base: 'column', md: 'row'}}
          spacing={{base: '3', md: '10'}}
          align="flex-start"
        >
          {/*<Stack spacing="4">*/}
          {/*  <Avatar*/}
          {/*    size="2xl"*/}
          {/*    src="https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjY5fHxsYWR5JTIwc21pbGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"*/}
          {/*    name="Melinda Paul"*/}
          {/*  />*/}
          {/*  <Button width="full" colorScheme="blue" display={{ base: 'none', md: 'initial' }}>*/}
          {/*    Contact me*/}
          {/*  </Button>*/}
          {/*</Stack>*/}
          <Box>
            <HStack spacing="2">
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
              <Center>
                <Badge variant="subtle" colorScheme="green">Udemy</Badge>
              </Center>
              {/*<HStack fontSize={{base: 'md', md: 'lg'}}>*/}
              {/*  <Text as="span" color={useColorModeValue('gray.500', 'gray.300')} lineHeight="1">*/}
              {/*    @meldesigner*/}
              {/*  </Text>*/}
              {/*  <Icon as={HiShieldCheck} color="green.500"/>*/}
              {/*</HStack>*/}
            </HStack>
            <HStack my="2" spacing="1">
              <Icon as={GrLanguage} color="gray.400"/>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {course.language}
              </Text>
              <Tag px="3" color={useColorModeValue('gray.600', 'gray.300')}>
                {course?.category || 'Misc'}
              </Tag>
            </HStack>
            {/*<Text mt="2">Graphic Designer and WordPress Expert</Text>*/}
            <Wrap shouldWrapChildren my="4" spacing="4">
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
                <Icon as={HiOutlineClock} color="gray.400"/>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  {course.courseDuration}
                </Text>
              </HStack>
              <HStack spacing="1">
                <Icon as={HiOutlineCalendar} color="gray.400"/>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  {course.lastUpdated}
                </Text>
              </HStack>

            </Wrap>
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
                <ExternalLinkIcon mx="2" />
              </Link>
            </HStack>
          </Box>
        </Stack>
        <Button mt="8" width="full" colorScheme="blue" display={{md: 'none'}}>
          Contact me
        </Button>
      </Card>
    </Box>
  )
}

export default CourseCard
