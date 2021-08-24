import { StorageKeys } from './storage-keys'
import { SyncMeta } from './sync-meta'

export interface SyncStorage {
  [StorageKeys.Meta]?: SyncMeta
  // [key: string]: any
}
