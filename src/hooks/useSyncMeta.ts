import {useEffect, useState} from "react";
import {SyncMeta} from "../models/sync-meta";
import {StorageKeys} from "../models/storage-keys";

export function useSyncMeta(): SyncMeta | undefined {
  const [meta, setMeta] = useState<SyncMeta | undefined>()

  useEffect(() => {
    chrome.storage.sync.get([StorageKeys.Meta], (result: { [StorageKeys.Meta]?: SyncMeta }) => {
      setMeta(result[StorageKeys.Meta])
    })
  }, [])
  return meta
}
