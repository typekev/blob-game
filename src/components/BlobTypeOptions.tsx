import { blobTypes } from "@/helpers/types";

export function BlobTypeOptions() {
  return (
    <>
      {blobTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </>
  );
}
