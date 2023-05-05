import { indexedDBStorage } from "./indexDB";
import { IStorageMethods, TStorage } from "./interface";

export function createStorage(
  storageType: TStorage,
  storageName?: string
): IStorageMethods {
  if (storageType === "indexedDB") {
    indexedDBStorage.initialize(storageName);
    return indexedDBStorage;
  }

  throw new Error(`Unsupported storage type: ${storageType}`);
}
