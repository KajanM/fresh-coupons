import React from 'react';
import Banner from "../components/banner/Banner";
import {Text} from "@chakra-ui/react";

function BannerContent() {
  return <Text as="span">Coupon successfully applied 🥳</Text>
}

function CouponAppliedBanner() {

  return (
    <Banner bannerContent={<BannerContent/>}/>
  );
}

export default CouponAppliedBanner;
