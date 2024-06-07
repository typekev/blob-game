"use client";
import { useCallback, useContext, useEffect, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { BlobAvatars } from "@/components/field/BlobAvatars";
import { SkillDialog } from "@/components/field/SkillDialog";
import { levelAudio } from "@/helpers/audio";
import { getRequiredExp } from "@/helpers/exp";
import {
  FIRST_SKILL_LEVEL,
  LEVEL_SKILL_INCR,
  MAX_LEVEL,
} from "@/helpers/level";
import { getNewSkill, MAX_SKILLS } from "@/helpers/skills";

import { AppElementID, Blob, BlobID } from "@/types.d";

export default function Field() {
  const { blobs, blobList, updateBlob } = useContext(BlobContext);
  const { deleted } = useContext(DeleteElementContext);
  const [fieldRef, setFieldRef] = useState<HTMLDivElement | null>(null);
  const [currentBlob, setCurrentBlob] = useState<Blob>();
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [skillDialogTimeoutId, setSkillDialogTimeoutId] = useState<number>();

  const addExp = (id: BlobID) => {
    const blob = blobs.get(id);
    if (blob !== undefined) {
      blob.exp++;
      if (blob.level < MAX_LEVEL && blob.exp >= getRequiredExp(blob.level)) {
        blob.level++;
        levelAudio.play();
        if (
          blob.level === FIRST_SKILL_LEVEL ||
          blob.level % LEVEL_SKILL_INCR === 0
        ) {
          const newSkill =
            blob.skills.length < MAX_SKILLS &&
            getNewSkill(blob.type, blob.skills);
          if (newSkill) {
            blob.skills.push(newSkill);
            setCurrentBlob(blob);
            setIsSkillDialogOpen(true);
          }
        }
      } else {
        levelAudio.currentTime = 0.2;
        levelAudio.play();
      }

      updateBlob(blob);
    }
  };

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
        {fieldRef && (
          <BlobAvatars
            fieldRef={fieldRef}
            blobList={blobList}
            addExp={addExp}
          />
        )}
      </article>
      <aside
        className={`absolute right-0 bottom-8 left-0 w-full translate-y-0 ${
          isSkillDialogOpen ? "" : "translate-y-64"
        } transition-transform z-[101]`}
      >
        {currentBlob !== undefined && (
          <SkillDialog blob={currentBlob} onClose={closeSkillDialog} />
        )}
      </aside>
    </section>
  );
}
