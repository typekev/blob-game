"use client";
import type { Blob, BlobID } from "@/types.d";

import { BlobAvatar } from "./blobAvatars/BlobAvatar";

interface Props {
  fieldRef: HTMLDivElement;
  blobList: readonly Blob[];
  addExp: (id: BlobID) => void;
}

export function BlobAvatars({ fieldRef, blobList, addExp }: Props) {
  return (
    <>
      {blobList.map((blob) => (
        <BlobAvatar key={blob.id} {...blob} field={fieldRef} addExp={addExp} />
      ))}
    </>
  );
}
