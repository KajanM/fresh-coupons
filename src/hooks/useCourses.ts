import { useEffect, useState } from 'react'
import { StorageKeys } from '../models/storage-keys'
import { LocalStorage } from '../models/local-storage'
import {CourseDetailsFile} from "../models/course-details-file";

const emptyCourseDetailsFile = {freeCourses: {}, coursesWithCoupon: {}}

export function useCourses(): CourseDetailsFile {
  const [courses, setCourses] = useState<CourseDetailsFile>(emptyCourseDetailsFile);

  useEffect(() => {
    console.log('initializing courses from local storage')
    chrome.storage.local.get([StorageKeys.Courses], function(result: LocalStorage) {
      setCourses(result[StorageKeys.Courses] || emptyCourseDetailsFile)
    })
  }, [])

  return courses
}
