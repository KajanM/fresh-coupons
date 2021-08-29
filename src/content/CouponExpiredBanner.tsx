import React from 'react';
import Banner from "../components/banner/Banner";
import {Text} from "@chakra-ui/react";

function BannerContent() {
  return <Text as="span">Coupon has expired 🤷‍♂️</Text>
}

function CouponExpiredBanner() {

  return (
    <Banner bannerContent={<BannerContent/>}/>
  );
}

export default CouponExpiredBanner;
