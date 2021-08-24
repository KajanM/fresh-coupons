import yaml from 'js-yaml'
import { SyncMeta } from '../models/sync-meta'
import { Course } from '../models/course'

const API_PREFIX = 'https://bitbucket.org/gmkajan/fresh-coupons-data/raw/a1deedeafb9f90198e392d673873b5672f76d822/'

export async function fetchCoursesAsync(timestamp: string): Promise<{ [id: string]: Course } | null> {
  try {
    const response = await fetch(`${API_PREFIX}udemy-${timestamp}.json`)
    if (!response.ok) {
      console.error(`got ${response.status}:${response.statusText} status code, when fetching course data`)
      return null
    }
    const data = await response.json()
    return data
  } catch (e) {
    console.error('an error occurred while fetching course data', e)
  }

  return null
}

export async function fetchSyncMetaAsync(): Promise<SyncMeta | null> {
  console.log('fetching sync meta')
  try {
    const response = await fetch(`${API_PREFIX}meta.yml`)
    if(!response.ok) {
      console.error(`got ${response.status}:${response.statusText} status code, when fetching meta data`)
      return null;
    }

    return yaml.load(await response.text()) as SyncMeta
  } catch (e) {
    console.error('unable to fetch meta data', e)
  }

  return null;
}
