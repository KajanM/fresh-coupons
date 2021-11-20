import {initializeCoursesFromApiAsync} from './api/courses-api'
import {AlarmKeys} from "./models/alarm-keys";
import Alarm = chrome.alarms.Alarm;

const syncIntervalInMinutes = 30
const doGetMock = false

chrome.runtime.onInstalled.addListener(onInstalledAsync)

chrome.alarms.create(AlarmKeys.SyncCourses, {
  delayInMinutes: syncIntervalInMinutes,
  periodInMinutes: syncIntervalInMinutes
})

chrome.alarms.onAlarm.addListener(onSyncCoursesAlarmAsync)

async function onSyncCoursesAlarmAsync(alarm: Alarm) {
  if (alarm.name !== AlarmKeys.SyncCourses) return

  await initializeCoursesFromApiAsync(doGetMock)
}

async function onInstalledAsync() {
  console.log('extension installed')
  await initializeCoursesFromApiAsync(doGetMock)
}



