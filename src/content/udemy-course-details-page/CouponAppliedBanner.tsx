import React from 'react';
import Banner from "../../components/banner/Banner";
import {Text} from "@chakra-ui/react";

function BannerContent() {
  return <Text as="span" fontWeight="bold">Coupon successfully applied 🥳</Text>
}

function CouponAppliedBanner() {

  return (
    <Banner bgColor="green.400" bannerContent={<BannerContent/>}/>
  );
}

export default CouponAppliedBanner;
