import React from 'react';
import Banner from "../../components/banner/Banner";
import {Text} from "@chakra-ui/react";
import {ChakraProvider} from '@chakra-ui/react';
import AllCoupons from "./AllCoupons";
import theme from "../theme";

function BannerContent() {
  return <Text as="span" fontWeight="bold">See all discount courses</Text>
}

function ShowAllCouponsBanner() {
  return (
      <ChakraProvider theme={theme}>
        <Banner actionButton={<AllCoupons/>} bgColor="#5624d0" bannerContent={<BannerContent/>}/>
      </ChakraProvider>
  );
}

export default ShowAllCouponsBanner
