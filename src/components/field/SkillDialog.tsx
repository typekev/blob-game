import { Button } from "@/components/Button";

import { Blob } from "@/types.d";

interface Props {
  blob: Blob;
  onClose: () => void;
}

export function SkillDialog({ blob, onClose }: Props) {
  return (
    <dialog className="absolute right-0 bottom-8 left-0 w-full translate-y-0 transition-transform z-[101]">
      <section className="mx-auto w-96 p-8 bg-neutral-50 dark:bg-neutral-900 border-8 border-double border-neutral-600 text-xl shadow-lg">
        <p>
          Great job! Your blob &quot;{blob.name}&quot; reached level{" "}
          <strong>{blob.level}</strong> and learned a new skill:{" "}
          <em className="whitespace-pre">
            {blob.skills[blob.skills.length - 1]}.
          </em>
        </p>
        <footer className="flex gap-4 pt-2 justify-end">
          <Button onClick={onClose}>Okay</Button>
        </footer>
      </section>
    </dialog>
  );
}
