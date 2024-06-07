"use client";
import { useContext } from "react";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { BlobForm } from "@/components/editor/BlobForm";
import { BlobList } from "@/components/editor/BlobList";

import { AppElementID } from "@/types.d";

export default function Editor() {
  const { deleted } = useContext(DeleteElementContext);

  if (deleted.has(AppElementID.BlobEditor)) return null;

  return (
    <main
      id={AppElementID.BlobEditor}
      className="flex flex-1 flex-col md:flex-row h-full min-w-0"
    >
      <BlobForm />
      <BlobList />
    </main>
  );
}
