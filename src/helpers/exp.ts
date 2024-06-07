import type { BlobLevel } from "../types.d";

export const getRequiredExp = (level: BlobLevel) => (level + 1) ** 2;
