import React from 'react';
import { render } from 'react-dom';
import ShowAllCouponsBanner from "./ShowAllCouponsBanner";

const rootEle = document.createElement('div')
rootEle.id = "fresh-coupons-root"

document.body.appendChild(rootEle)

render(<ShowAllCouponsBanner />, rootEle)
