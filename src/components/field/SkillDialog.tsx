"use client";
import { useContext, useEffect, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { Button } from "@/components/Button";

import { BlobEvent } from "@/types.d";

interface Props {
  blobEvent: BlobEvent;
}

export function SkillDialog({ blobEvent }: Props) {
  const { closeBlobEvent } = useContext(BlobContext);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (closing) setTimeout(() => closeBlobEvent(blobEvent.eventId), 1000);
  }, [closing]);

  return (
    <aside
      className={`absolute right-0 bottom-8 left-0 w-full translate-y-0 ${
        closing ? "" : "translate-y-64"
      } transition-transform z-[101]`}
    >
      <dialog className="absolute right-0 bottom-8 left-0 w-full translate-y-0 transition-transform z-[101]">
        <section className="mx-auto w-96 p-8 bg-neutral-50 dark:bg-neutral-900 border-8 border-double border-neutral-600 text-xl shadow-lg">
          <p>
            Great job! Your blob &quot;{blobEvent.blob.name}&quot; reached level{" "}
            <strong>{blobEvent.blob.level}</strong> and learned a new skill:{" "}
            <em className="whitespace-pre">
              {blobEvent.blob.skills[blobEvent.blob.skills.length - 1]}.
            </em>
          </p>
          <footer className="flex gap-4 pt-2 justify-end">
            <Button onClick={() => setClosing(true)}>Okay</Button>
          </footer>
        </section>
      </dialog>
    </aside>
  );
}
