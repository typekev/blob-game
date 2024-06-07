"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { LocalStorageKeys } from "@/types.d";
import type { NewBlob, Blob, BlobID, BlobName, Blobs } from "@/types.d";

interface Context {
  blobs: Blobs;
  blobList: readonly Blob[];
  blobNames: Set<BlobName>;
  createBlob: (newBlob: NewBlob) => void;
  updateBlob: (blob: Blob) => void;
  deleteBlob: (blobId: BlobID) => void;
  deleteAllBlobs: () => void;
}

export const BlobContext = createContext<Context>({
  blobs: new Map(),
  blobList: [],
  blobNames: new Set(),
  createBlob: () => undefined,
  updateBlob: () => undefined,
  deleteBlob: () => undefined,
  deleteAllBlobs: () => undefined,
});

export const BlobProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [blobs, setBlobs] = useState<Blobs>(new Map());
  const [blobList, setBlobList] = useState<readonly Blob[]>([]);
  const [blobNames, setBlobsNames] = useState(new Set<BlobName>());

  const setLocalStorageBlobs = (nextBlobs: Blobs) =>
    localStorage.setItem(
      LocalStorageKeys.Blobs,
      JSON.stringify(Object.fromEntries(nextBlobs))
    );

  const setBlobsFromLocalStorage = () => {
    const maybeBlobs = localStorage.getItem(LocalStorageKeys.Blobs);
    const nextBlobs: Blobs = new Map();
    const nextBlobsList: Blob[] = [];
    const nextBlobsNames = new Set<BlobName>();
    if (maybeBlobs !== null) {
      Object.entries<Blob>(JSON.parse(maybeBlobs)).forEach(([id, blob]) => {
        nextBlobs.set(id, blob);
        nextBlobsList.push(blob);
        nextBlobsNames.add(blob.name);
      });
    }

    setBlobs(nextBlobs);
    setBlobList(nextBlobsList);
    setBlobsNames(nextBlobsNames);
  };

  const createBlob = (newBlob: NewBlob) => {
    const id = blobs.size.toString();
    updateBlob({ id, level: 1, exp: 0, skills: [], ...newBlob });
  };

  const updateBlob = (blob: Blob) => {
    setLocalStorageBlobs(new Map(blobs).set(blob.id, blob));
    console.log(JSON.stringify(new Map(blobs).set(blob.id, blob)));
    setBlobsFromLocalStorage();
  };

  const deleteBlob = (blobId: BlobID) => {
    const nextBlobs: Blobs = new Map(blobs);
    nextBlobs.delete(blobId);
    setLocalStorageBlobs(nextBlobs);
    setBlobsFromLocalStorage();
  };

  const deleteAllBlobs = () => {
    localStorage.removeItem(LocalStorageKeys.Blobs);
    setBlobsFromLocalStorage();
  };

  useEffect(() => {
    setBlobsFromLocalStorage();
  }, []);

  return (
    <BlobContext.Provider
      value={{
        blobs,
        blobList,
        blobNames,
        createBlob,
        updateBlob,
        deleteBlob,
        deleteAllBlobs,
      }}
    >
      {children}
    </BlobContext.Provider>
  );
};
