"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ElementDeleteDialog } from "@/components/ElementDeleteDialog";

import { AppElementID } from "@/types.d";

interface Context {
  deleted: Set<AppElementID>;
  setDeleted: (nextDeleted: Set<AppElementID>) => void;
}

export const DeleteElementContext = createContext<Context>({
  deleted: new Set(),
  setDeleted: () => undefined,
});

export const DeleteElementProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const pathname = usePathname();
  const [deleted, setDeleted] = useState<Set<AppElementID>>(new Set());
  const [id, setId] = useState<AppElementID>();

  const onDelete = (id: AppElementID) => setDeleted(new Set(deleted.add(id)));
  const onCancelCallback = () => setId(undefined);
  const onDeleteCallback = () => {
    if (id !== undefined) {
      onDelete(id);
    }

    onCancelCallback();
  };

  useEffect(() => {
    for (const id of Object.values(AppElementID)) {
      const el = document.getElementById(id);
      el?.addEventListener("click", (e) => {
        if (e.altKey) {
          e.stopImmediatePropagation();
          setId(id);
        }
      });
    }
  }, [pathname]);

  return (
    <DeleteElementContext.Provider value={{ deleted, setDeleted }}>
      {children}
      <ElementDeleteDialog
        id={id}
        onDelete={onDeleteCallback}
        onCancel={onCancelCallback}
      />
    </DeleteElementContext.Provider>
  );
};
