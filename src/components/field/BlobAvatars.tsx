"use client";
import type { Blob } from "@/types.d";

import { BlobAvatar } from "./blobAvatars/BlobAvatar";

interface Props {
  fieldRef: HTMLDivElement;
  blobList: readonly Blob[];
}

export function BlobAvatars({ fieldRef, blobList }: Props) {
  return (
    <>
      {blobList.map((blob) => (
        <BlobAvatar key={blob.id} {...blob} field={fieldRef} />
      ))}
    </>
  );
}
