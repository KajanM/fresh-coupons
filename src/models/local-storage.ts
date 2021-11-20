import { StorageKeys } from './storage-keys'
import {CourseDetailsFile} from "./course-details-file";

export interface LocalStorage {
  [StorageKeys.Courses]?: CourseDetailsFile
}
