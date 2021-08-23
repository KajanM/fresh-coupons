import { courses } from './assets/mock/udemy-1'

chrome.runtime.onInstalled.addListener(function() {
  console.log('extension installed')

  chrome.storage.local.set({ courses }, () => {
    console.log('courses initialized')
  })
})

