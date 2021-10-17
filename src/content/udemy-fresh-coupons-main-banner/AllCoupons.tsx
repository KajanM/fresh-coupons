import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay, Stack,
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
            <Box>
              <Stack spacing="10" py="5">
                {Object.entries(courses).map(([url, course]) => (
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
