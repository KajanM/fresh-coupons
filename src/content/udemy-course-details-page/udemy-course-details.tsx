import React from 'react';
import { render } from 'react-dom';
import CourseDetailsPage from "./CourseDetailsPage";

const rootEle = document.createElement('div')
rootEle.id = "root"
document.body.appendChild(rootEle)

render(<CourseDetailsPage />, rootEle)
