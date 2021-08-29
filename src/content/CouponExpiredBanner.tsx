import React from 'react';
import Banner from "../components/banner/Banner";
import {Text} from "@chakra-ui/react";

function BannerContent() {
  return <Text as="span" fontWeight="bold">Coupon has expired 🤷‍♂️</Text>
}

function CouponExpiredBanner() {

  return (
    <Banner bgColor="red.400" bannerContent={<BannerContent/>}/>
  );
}

export default CouponExpiredBanner;
