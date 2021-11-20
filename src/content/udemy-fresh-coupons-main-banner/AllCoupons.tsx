import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {useCourses} from "../../hooks/useCourses";
import CourseCard from "../../components/course-card/CourseCard";

function AllCoupons() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null)

  const courses = useCourses()

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"4xl"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerBody>
            <Box my={9}>
              <Center>
                <Heading my={3} className={"course-list-title"} textAlign="center">Premium courses with
                  discount</Heading>
              </Center>
              <Stack spacing="10" py="5">
                {Object.entries(courses.coursesWithCoupon)
                  .sort(([_, course]) => course.courseDetails.language === 'English' ? -1 : 1)
                  .map(([url, course]) => (
                  <CourseCard key={url} course={course}/>
                ))}
              </Stack>
            </Box>
            <Box>
              <Center>
                <Heading my={3} className={"course-list-title"} textAlign="center">More free courses</Heading>
              </Center>
              <Stack spacing="10" py="5">
                {Object.entries(courses.freeCourses).map(([url, course]) => (
                  <CourseCard key={url} course={course}/>
                ))}
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AllCoupons
