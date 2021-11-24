import { SyncMeta } from '../models/sync-meta'
import {StorageKeys} from "../models/storage-keys";
import {SyncStorage} from "../models/sync-storage";
import {CourseDetailsFile} from "../models/course-details-file";
import {courses} from "../assets/mock/udemy-1";
import {meta} from "../assets/mock/meta-mock";

const API_PREFIX = 'https://raw.githubusercontent.com/fresh-coupons/fresh-coupons-data/main/udemy/v2/'

export async function initializeCoursesFromApiAsync(doGetMock = false) {
  const meta = await fetchSyncMetaAsync(doGetMock)
  console.log('meta', meta)
  if(meta == null) return

  chrome.storage.sync.get([StorageKeys.Meta], async (result: SyncStorage) => {
    const lastSyncMeta = result[StorageKeys.Meta]
    if(lastSyncMeta && lastSyncMeta.lastSynced === meta.lastSynced) return // no new updates

    const courses = await fetchCoursesAsync(meta.lastSynced, doGetMock)

    chrome.storage.local.set({ [StorageKeys.Courses]: courses }, () => {
      console.log('courses initialized')

      chrome.storage.sync.set({[StorageKeys.Meta]: meta})
    })

  })
}

export async function fetchCoursesAsync(timestamp: string, doGetMock = false): Promise<CourseDetailsFile | null> {
  if(doGetMock) {
   return courses;
  }

  try {
    const response = await fetch(`${API_PREFIX}${timestamp}.json`)
    if (!response.ok) {
      console.error(`got ${response.status}:${response.statusText} status code, when fetching course data`)
      return null
    }
    return await response.json()
  } catch (e) {
    console.error('an error occurred while fetching course data', e)
  }

  return null
}

export async function fetchSyncMetaAsync(doGetMock = false): Promise<SyncMeta | null> {
  console.log('fetching sync meta')
  if(doGetMock) {
    return meta
  }

  try {
    const response = await fetch(`${API_PREFIX}meta.json`)
    if(!response.ok) {
      console.error(`got ${response.status}:${response.statusText} status code, when fetching meta data`)
      return null;
    }

    return await response.json()
  } catch (e) {
    console.error('unable to fetch meta data', e)
  }

  return null;
}
