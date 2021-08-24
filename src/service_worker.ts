import { fetchCoursesAsync, fetchSyncMetaAsync } from './api/courses-api'
import { StorageKeys } from './models/storage-keys'

chrome.runtime.onInstalled.addListener(onInstalledAsync)

async function onInstalledAsync() {
  console.log('extension installed')
  await initializeCoursesFromApiAsync()
}

async function initializeCoursesFromApiAsync() {
  const meta = await fetchSyncMetaAsync()
  console.log('meta', meta)
  if(meta == null) return

  chrome.storage.sync.set({[StorageKeys.Meta]: meta})

  const courses = await fetchCoursesAsync(meta.lastSynced)

  chrome.storage.local.set({ [StorageKeys.Courses]: courses }, () => {
    console.log('courses initialized')
  })
}

