import { useEffect, useState } from 'react'
import { Course } from '../models/course'
import { StorageKeys } from '../models/storage-keys'
import { LocalStorage } from '../models/local-storage'

export function useCourses(): Record<string, Course> {
  const [courses, setCourses] = useState<Record<string, Course>>({});

  useEffect(() => {
    console.log('initializing courses from local storage')
    chrome.storage.local.get([StorageKeys.Courses], function(result: LocalStorage) {
      setCourses(result[StorageKeys.Courses] || {})
    })
  }, [])

  return courses
}
