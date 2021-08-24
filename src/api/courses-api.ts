import yaml from 'js-yaml'
import { SyncMeta } from '../models/sync-meta'
import { Course } from '../models/course'

const API_PREFIX = 'https://bitbucket.org/gmkajan/fresh-coupons-data/raw/a1deedeafb9f90198e392d673873b5672f76d822/'

export async function fetchCoursesAsync(timestamp: string): Promise<{ [id: string]: Course }> {
  const response = await fetch(`${API_PREFIX}udemy-${timestamp}.json`)
  const data = await response.json()

  return data
}

export async function fetchSyncMetaAsync(): Promise<SyncMeta> {
  console.log('fetching sync meta')
  const data = await fetch(`${API_PREFIX}meta.yml`)

  return  yaml.load(await data.text()) as SyncMeta
}
