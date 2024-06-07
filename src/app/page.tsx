"use client";
import { useContext } from "react";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { StartButton } from "@/components/splash/StartButton";

import { AppElementID } from "@/types.d";

import "./splash.css";

export default function Splash() {
  const { deleted } = useContext(DeleteElementContext);

  if (deleted.has(AppElementID.Start)) return null;

  return (
    <main
      id={AppElementID.Start}
      className="h-full w-full flex justify-center items-center bg-white dark:bg-black"
    >
      <StartButton />
    </main>
  );
}
