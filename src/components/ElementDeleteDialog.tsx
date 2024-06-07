"use client";
import { useContext } from "react";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";

import { AppElementID } from "@/types.d";

import { Button } from "./Button";
import { Dialog } from "./Dialog";

interface Props {
  id?: AppElementID;
  onDelete: () => void;
  onCancel: () => void;
}

export function ElementDeleteDialog({ id, onDelete, onCancel }: Props) {
  const { deleted } = useContext(DeleteElementContext);

  if (deleted.has(AppElementID.DeleteElementDialog)) return null;

  return (
    <Dialog open={id !== undefined} id={AppElementID.DeleteElementDialog}>
      <p>{`Are you sure you want to delete the "${id}" DOM element?`}</p>
      {id === AppElementID.DeleteElementDialog && (
        <p className="italic">
          ...if you delete this dialog, how will you delete anything else?
        </p>
      )}
      <footer className="flex gap-4 pt-2 justify-end">
        <Button color="danger" onClick={onDelete}>
          {id === AppElementID.DeleteElementDialog
            ? "I just want to watch the world burn"
            : "Delete"}
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </footer>
    </Dialog>
  );
}
