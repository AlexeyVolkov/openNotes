import { IStorageMethods } from "./interface";
import { StorageContext } from "./useStorage";

export function StorageProvider({
  children,
  storage,
}: {
  children: React.ReactNode;
  storage: IStorageMethods;
}) {
  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}
