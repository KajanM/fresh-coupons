import { fetchCoursesAsync, fetchSyncMetaAsync } from './api/courses-api'

chrome.runtime.onInstalled.addListener(  async function() {
  console.log('extension installed')
  const meta = await fetchSyncMetaAsync()
  const lastSyncTime = new Date(meta.last_synced)
  console.log('meta', meta)
  console.log('last', lastSyncTime)

  const courses = await fetchCoursesAsync(`06-54-23-08-2021`)

  chrome.storage.local.set({ courses }, () => {
    console.log('courses initialized')
  })
})

