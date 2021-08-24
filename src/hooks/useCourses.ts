import { useEffect, useState } from 'react'
import { Course } from '../models/course'
import { StorageKeys } from '../models/storage-keys'

export function useCourses(): {[id: string]: Course} {
  const [courses, setCourses] = useState<{[id: string]: Course}>({});

  useEffect(() => {
    console.log('initializing courses from local storage')
    chrome.storage.local.get([StorageKeys.Courses], function(result) {
      console.log('result', result)
      setCourses(result.courses || {})
    })
  }, [])

  return courses
}
