import { fetchCoursesAsync, fetchSyncMetaAsync } from './api/courses-api'
import { StorageKeys } from './models/storage-keys'

chrome.runtime.onInstalled.addListener(  async function() {
  console.log('extension installed')
  const meta = await fetchSyncMetaAsync()
  console.log('meta', meta)
  if(meta == null) return

  chrome.storage.sync.set({[StorageKeys.Meta]: meta})

  const courses = await fetchCoursesAsync(meta.lastSynced)

  chrome.storage.local.set({ [StorageKeys.Courses]: courses }, () => {
    console.log('courses initialized')
  })
})

