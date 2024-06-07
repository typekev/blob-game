"use client";
import { useContext } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

import { AppElementID } from "@/types.d";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export function RestartDialog({ isOpen, close }: Props) {
  const { deleted } = useContext(DeleteElementContext);
  const { deleteAllBlobs } = useContext(BlobContext);

  if (deleted.has(AppElementID.RestartDialog)) return null;

  return (
    <Dialog id={AppElementID.RestartDialog} open={isOpen}>
      <p>
        Restarting will delete all of your blobs. This cannot be undone.
        <br />
        Are you sure you want to delete all your blobs?
      </p>
      <aside className="flex gap-4 pt-2 justify-end">
        <Button
          color="danger"
          onClick={() => {
            deleteAllBlobs();
            close();
          }}
        >
          Delete them all!
        </Button>
        <Button onClick={close}>Cancel</Button>
      </aside>
    </Dialog>
  );
}
