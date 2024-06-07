"use client";
import { useContext } from "react";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { Button } from "@/components/Button";

import { AppElementID } from "@/types.d";

interface Props {
  extended: boolean;
  toggleExtended: () => void;
}

export function NavCollapseToggle({ extended, toggleExtended }: Props) {
  const { deleted } = useContext(DeleteElementContext);

  if (deleted.has(AppElementID.NavCollapseToggle)) return null;

  return (
    <Button
      id={AppElementID.NavCollapseToggle}
      className={`absolute top-0 ${
        extended ? "left-28" : "left-4"
      } w-20 mt-4 lg:hidden text-xl transition-all z-[101]`}
      onClick={toggleExtended}
    >
      {extended ? "< Close" : "Menu >"}
    </Button>
  );
}
