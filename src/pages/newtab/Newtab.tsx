import React from 'react';
import {Box, Button, ChakraProvider, Flex, Heading, Spacer} from '@chakra-ui/react';
import {CoursesWithDiscount} from './CoursesWithDiscount';
import {useSyncMeta} from "../../hooks/useSyncMeta";
import CouponExpiredNotification from "../../content/CouponExpiredNotification";

const Newtab = () => {
  const syncMeta = useSyncMeta()
  return (
    <ChakraProvider>
      <Flex>
        <Box p="2">
          <Heading size="md">Fresh Coupons</Heading>
        </Box>
        <Spacer />
        <Flex>
          <Box bg="tomato" p="2" color="white">Last synced: {syncMeta?.lastSynced}</Box>
          <Button>Refresh</Button>
        </Flex>
      </Flex>
      <CouponExpiredNotification />
      <CoursesWithDiscount/>
    </ChakraProvider>
  );
};

export default Newtab;
