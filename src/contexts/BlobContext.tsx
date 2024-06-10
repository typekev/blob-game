"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { LocalStorageKeys } from "@/types.d";
import type {
  NewBlob,
  Blob,
  BlobID,
  BlobName,
  Blobs,
  BlobEvents,
  BlobEventID,
} from "@/types.d";
import {
  FIRST_SKILL_LEVEL,
  LEVEL_SKILL_INCR,
  MAX_LEVEL,
} from "@/helpers/level";
import { getRequiredExp } from "@/helpers/exp";
import { getNewSkill, MAX_SKILLS } from "@/helpers/skills";
import { levelAudio } from "@/helpers/audio";

interface Context {
  blobs: Blobs;
  blobList: readonly Blob[];
  blobNames: Set<BlobName>;
  blobEvents: BlobEvents;
  createBlob: (newBlob: NewBlob) => void;
  updateBlob: (blob: Blob) => void;
  deleteBlob: (blobId: BlobID) => void;
  deleteAllBlobs: () => void;
  growBlob: (blobId: BlobID) => void;
  closeBlobEvent: (eventId: BlobEventID) => void;
}

export const BlobContext = createContext<Context>({
  blobs: new Map(),
  blobList: [],
  blobNames: new Set(),
  blobEvents: new Map(),
  createBlob: () => undefined,
  updateBlob: () => undefined,
  deleteBlob: () => undefined,
  deleteAllBlobs: () => undefined,
  growBlob: () => undefined,
  closeBlobEvent: () => undefined,
});

export const BlobProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [blobs, setBlobs] = useState<Blobs>(new Map());
  const [blobList, setBlobList] = useState<readonly Blob[]>([]);
  const [blobNames, setBlobsNames] = useState(new Set<BlobName>());
  const [blobEvents, setBlobEvents] = useState<BlobEvents>(new Map());

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

  const growBlob = (blobId: BlobID) => {
    const blob = blobs.get(blobId);
    if (blob) {
      blob.exp++;
      if (blob.level < MAX_LEVEL && blob.exp >= getRequiredExp(blob.level)) {
        blob.level++;
        levelAudio?.playFrom();
        if (
          blob.skills.length < MAX_SKILLS &&
          (blob.level === FIRST_SKILL_LEVEL ||
            blob.level % LEVEL_SKILL_INCR === 0)
        ) {
          const newSkill = getNewSkill(blob.type, blob.skills);
          if (newSkill) {
            blob.skills.push(newSkill);
            setBlobEvents((events) => {
              const eventId = events.size;
              return new Map(events).set(eventId, { eventId, blob });
            });
          }
        }
      } else {
        levelAudio?.playFrom(0.2);
      }

      updateBlob(blob);
    }
  };

  const closeBlobEvent = (eventId: number) => {
    const nextBlobEvents: BlobEvents = new Map(blobEvents);
    nextBlobEvents.delete(eventId);
    setBlobEvents(nextBlobEvents);
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
        blobEvents,
        createBlob,
        updateBlob,
        deleteBlob,
        deleteAllBlobs,
        growBlob,
        closeBlobEvent,
      }}
    >
      {children}
    </BlobContext.Provider>
  );
};
