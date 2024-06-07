"use client";
import { useContext, useState } from "react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { BlobContext } from "../../contexts/BlobContext";
import { BlobID } from "../../types";

import { BlobListItem } from "./blobList/BlobListItem";

export function BlobList() {
  const { blobs, blobList, deleteBlob } = useContext(BlobContext);
  const [isDeleting, setIsDeleting] = useState<BlobID>();

  const openDeleteDialog = (id: BlobID) => setIsDeleting(id);
  const closeDeleteDialog = () => setIsDeleting(undefined);
  const handleDeleteBlob = () => {
    if (isDeleting) {
      deleteBlob(isDeleting);
    }

    closeDeleteDialog();
  };

  return (
    <section className="flex flex-col flex-1">
      <h3 className="text-4xl py-3 px-4 text-center md:text-left border-y bg-neutral-50 dark:bg-black z-20">
        Your Blobs
      </h3>
      <ul className="h-full md:h-auto p-4 overflow-auto grid grid-flow-col md:grid-flow-row xl:grid-cols-2 gap-4">
        {blobList.map((blob) => (
          <BlobListItem key={blob.id} onDelete={openDeleteDialog} {...blob} />
        ))}
      </ul>
      <Dialog open={isDeleting !== undefined}>
        <p>{`Are you sure you want to delete your blob "${
          isDeleting && blobs.get(isDeleting)?.name
        }"?`}</p>
        <footer className="flex gap-4 pt-2 justify-end">
          <Button color="danger" onClick={handleDeleteBlob}>
            Delete
          </Button>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
        </footer>
      </Dialog>
    </section>
  );
}
