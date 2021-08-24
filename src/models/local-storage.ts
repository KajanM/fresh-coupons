import { StorageKeys } from './storage-keys'
import { Course } from './course'

export interface LocalStorage {
  [StorageKeys.Courses]?: Record<string, Course>
}
