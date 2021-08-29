import React, {useState} from 'react';
import {Badge, Button, ButtonProps, Text} from "@chakra-ui/react";
import Banner from "../components/banner/Banner";
import {changeInputValue} from "../helpers/utils";

interface ApplyCouponButtonProps extends ButtonProps {
  onCouponApplied: () => any
  couponCode: string
}

function ApplyCouponButton(props: ApplyCouponButtonProps) {
  const {couponCode, onCouponApplied} = props
  const [isLoading, setIsLoading] = useState(false)

  function applyCoupon() {
    setIsLoading(true)
    const showCouponInputEle: HTMLButtonElement | null = document.querySelector('[data-purpose="no-coupon-button"]')

    if (showCouponInputEle) {
      showCouponInputEle.click()
    }
    const couponInputEle: HTMLInputElement | null = document.querySelector('[data-purpose="coupon-input"]');

    if (!couponInputEle) {
      console.error('unable to find the coupon input')
      return
    }

    changeInputValue(couponInputEle, couponCode)
    const couponSubmitButtonEle: HTMLButtonElement | null = document.querySelector('[data-purpose="coupon-submit"]')
    if (!couponSubmitButtonEle) {
      console.error('unable to find the coupon submit button')
      return;
    }
    couponSubmitButtonEle.click()
    onCouponApplied()
  }

  return (
    <Button
      isLoading={isLoading}
      loadingText="Applying"
      colorScheme="orange"
      size="lg"
      fontSize="2xl"
      variant="solid"
      onClick={applyCoupon}>Apply</Button>
  )
}

interface BannerContentProps {
  couponCode: string
  discountPercentage: string
}

function BannerContent(props: BannerContentProps) {
  const {couponCode, discountPercentage} = props

  return (
    <Text fontWeight="bold" as="span" fontSize="3xl">Use <Badge fontSize="xl">{couponCode}</Badge> coupon code to get <Badge
      fontSize="xl">{discountPercentage}</Badge> 😋</Text>
  )
}

interface CouponAvailableBannerProps {
  couponCode: string
  onCouponApplied: () => any
  discountPercentage: string,
}

function CouponAvailableBanner(props: CouponAvailableBannerProps) {
  const {couponCode, onCouponApplied, discountPercentage} = props
  return (
    <Banner
      actionButton={<ApplyCouponButton couponCode={couponCode} onCouponApplied={onCouponApplied}/>}
      bannerContent={<BannerContent couponCode={couponCode} discountPercentage={discountPercentage}/>}/>
  );
}

export default CouponAvailableBanner;
