"use client";
import { useContext } from "react";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

import { AppElementID } from "@/types.d";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export function HelpDialog({ isOpen, close }: Props) {
  const { deleted } = useContext(DeleteElementContext);

  if (deleted.has(AppElementID.HelpDialog)) return null;

  return (
    <Dialog id={AppElementID.HelpDialog} open={isOpen}>
      <h3 className="pb-3 text-2xl">Welcome to ✦Blob Game!✦</h3>
      <p className="pb-1">Here are some tips:</p>
      <ul className="list-square">
        <li>You can create blobs using the &quot;Create a Blob&quot; form.</li>
        <li>
          Then you can edit or delete your blobs in the &quot;Your Blobs&quot;
          panel.
        </li>
        <li>
          You can play with your blobs by clicking the &quot;Go to Field&quot;
          button. Click on a blob and watch what happens!
        </li>
        <li>
          If you are already in the Blob Field, click &quot;Go to Editor&quot;
          to return to the &quot;Create a Blob&quot; form and &quot;Your
          Blobs&quot; panal.
        </li>
        <li>
          Click the &quot;Restart&quot; button to delete all your blobs at once.
        </li>
        <li>
          For programmers only -- To delete any DOM element on the screen, hold{" "}
          <code className="whitespace-pre rounded-sm bg-neutral-200 dark:bg-neutral-600 outline mx-1 px-1.5 text-sm">
            alt
          </code>{" "}
          /{" "}
          <code className="whitespace-pre rounded-sm bg-neutral-200 dark:bg-neutral-600 outline mx-1 px-1.5 text-sm">
            option ⌥
          </code>{" "}
          and then click on the element.
        </li>
      </ul>
      <aside className="flex gap-4 pt-2 justify-end">
        <Button onClick={close}>Okay</Button>
      </aside>
    </Dialog>
  );
}
