import {CouponState} from "./coupon-state";

export function determineCouponStateAsync(delay = 2000) {
  return new Promise((resolve: (state: CouponState) => any) => {
    setTimeout(() => {
      let state = CouponState.Pending
      if (isCouponSuccessfullyApplied()) {
        state = CouponState.Applied
      } else if (isCouponExpired()) {
        state = CouponState.Expired
      }
      resolve(state)
    }, delay)
  })
}

function isCouponSuccessfullyApplied() {
  const couponSuccessEle = document.querySelector('[data-purpose="code-text"]')

  return !!couponSuccessEle;
}

function isCouponExpired() {
  const couponErrorEle = document.querySelector('[data-purpose="coupon-form-error"]')

  return !!couponErrorEle
}
