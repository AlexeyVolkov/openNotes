import { createContext, useContext } from "react";
import { IStorageMethods } from "./interface";

export const StorageContext = createContext<IStorageMethods | null>(null);

export function useStorage() {
  const context = useContext(StorageContext);
  if (context === null) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
}
