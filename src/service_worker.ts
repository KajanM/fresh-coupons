import browser from 'webextension-polyfill'
import { courses } from '../assets/mock/udemy-1'

browser.runtime.onInstalled.addListener(async function() {
  console.log('extension installed')
  await browser.storage.local.set({courses})
})
