import { BlobType } from "../types.d";

export const blobTypes = Object.values(BlobType);

export const stringIsBlobType = (str: string): str is BlobType =>
  blobTypes.includes(str as BlobType);
