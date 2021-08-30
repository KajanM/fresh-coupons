import {fetchCoursesAsync, fetchSyncMetaAsync} from './api/courses-api'
import {StorageKeys} from './models/storage-keys'
import {SyncStorage} from './models/sync-storage'
import {AlarmKeys} from "./models/alarm-keys";
import Alarm = chrome.alarms.Alarm;

const syncIntervalInMinutes = 60

chrome.runtime.onInstalled.addListener(onInstalledAsync)

chrome.alarms.create(AlarmKeys.SyncCourses, {
  delayInMinutes: syncIntervalInMinutes,
  periodInMinutes: syncIntervalInMinutes
})

chrome.alarms.onAlarm.addListener(onSyncCoursesAlarmAsync)

async function onSyncCoursesAlarmAsync(alarm: Alarm) {
  if (alarm.name !== AlarmKeys.SyncCourses) return

  await initializeCoursesFromApiAsync()
}

async function onInstalledAsync() {
  console.log('extension installed')
  await initializeCoursesFromApiAsync()
}

async function initializeCoursesFromApiAsync() {
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

