"use client";
import { useCallback, useContext, useEffect, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { BlobAvatars } from "@/components/field/BlobAvatars";
import { SkillDialog } from "@/components/field/SkillDialog";

import { AppElementID, Blob } from "@/types.d";

export default function Field() {
  const { blobList, blobEvents } = useContext(BlobContext);
  const { deleted } = useContext(DeleteElementContext);
  const [fieldRef, setFieldRef] = useState<HTMLDivElement | null>(null);
  const [currentBlob, setCurrentBlob] = useState<Blob>();
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [skillDialogTimeoutId, setSkillDialogTimeoutId] = useState<number>();

  const onRefChange = useCallback(
    (el: HTMLDivElement | null) => setFieldRef(el),
    []
  );

  const closeSkillDialog = () => {
    setIsSkillDialogOpen(false);
    window.clearTimeout(skillDialogTimeoutId);
  };

  useEffect(() => {
    setSkillDialogTimeoutId(
      window.setTimeout(() => setIsSkillDialogOpen(false), 20000)
    );

    return () => window.clearTimeout(skillDialogTimeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkillDialogOpen]);

  if (deleted.has(AppElementID.BlobField)) return null;

  return (
    <section
      id={AppElementID.BlobField}
      className="flex-1 overflow-scroll bg-[url('/images/grass.png')] bg-emerald-300 dark:bg-slate-700 dark:bg-blend-overlay bg-repeat bg-local shadow-inner"
    >
      <article ref={onRefChange} className="relative w-full h-full touch-auto">
        {fieldRef && <BlobAvatars fieldRef={fieldRef} blobList={blobList} />}
      </article>
      {Array.from(blobEvents.values()).map((blobEvent) => (
        <SkillDialog key={blobEvent.eventId} blobEvent={blobEvent} />
      ))}
    </section>
  );
}
