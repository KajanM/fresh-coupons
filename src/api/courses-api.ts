import { SyncMeta } from '../models/sync-meta'
import { Course } from '../models/course'
import {StorageKeys} from "../models/storage-keys";
import {SyncStorage} from "../models/sync-storage";

const API_PREFIX = 'https://bitbucket.org/gmkajan/fresh-coupons-data/raw/master/'

export async function initializeCoursesFromApiAsync() {
  const meta = await fetchSyncMetaAsync()
  console.log('meta', meta)
  if(meta == null) return

  chrome.storage.sync.get([StorageKeys.Meta], async (result: SyncStorage) => {
    const lastSyncMeta = result[StorageKeys.Meta]
    if(lastSyncMeta && lastSyncMeta.lastSynced === meta.lastSynced) return // no new updates

    const courses = await fetchCoursesAsync(meta.lastSynced)

    chrome.storage.local.set({ [StorageKeys.Courses]: courses }, () => {
      console.log('courses initialized')

      chrome.storage.sync.set({[StorageKeys.Meta]: meta})
    })

  })
}

export async function fetchCoursesAsync(timestamp: string): Promise<{ [id: string]: Course } | null> {
  try {
    const response = await fetch(`${API_PREFIX}udemy-${timestamp}.json`)
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

export async function fetchSyncMetaAsync(): Promise<SyncMeta | null> {
  console.log('fetching sync meta')
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
