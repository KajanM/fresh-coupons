import { fetchCoursesAsync, fetchSyncMetaAsync } from './api/courses-api'
import { StorageKeys } from './models/storage-keys'
import { SyncMeta } from './models/sync-meta'

chrome.runtime.onInstalled.addListener(onInstalledAsync)

async function onInstalledAsync() {
  console.log('extension installed')
  await initializeCoursesFromApiAsync()
}

async function initializeCoursesFromApiAsync() {
  const meta = await fetchSyncMetaAsync()
  console.log('meta', meta)
  if(meta == null) return

  chrome.storage.sync.get([StorageKeys.Meta], async (result) => {
    const lastSyncMeta: SyncMeta = result[StorageKeys.Meta]
    if(lastSyncMeta.lastSynced === meta.lastSynced) return // no new updates

    const courses = await fetchCoursesAsync(meta.lastSynced)

    chrome.storage.local.set({ [StorageKeys.Courses]: courses }, () => {
      console.log('courses initialized')

      chrome.storage.sync.set({[StorageKeys.Meta]: meta})
    })

  })
}

