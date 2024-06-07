"use client";
import { useContext, useState } from "react";
import { useTheme } from "next-themes";

import { DeleteElementContext } from "@/contexts/DeleteElementContext";
import { selectAudio } from "@/helpers/audio";

import { AppElementID } from "@/types.d";

import { HelpDialog } from "./nav/HelpDialog";
import { RestartDialog } from "./nav/RestartDialog";
import { NavCollapseToggle } from "./nav/NavCollapseToggle";
import { ViewToggle } from "./nav/ViewToggle";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const { deleted } = useContext(DeleteElementContext);
  const [isNavExtended, setIsNavExtended] = useState(false);
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const playSound = () => {
    selectAudio.currentTime = 0;
    selectAudio.play();
  };

  const openRestartDialog = () => setIsRestartDialogOpen(true);
  const closeRestartDialog = () => setIsRestartDialogOpen(false);

  const openHelpDialog = () => setIsHelpDialogOpen(true);
  const closeHelpDialog = () => setIsHelpDialogOpen(false);

  if (deleted.has(AppElementID.Nav)) return null;

  return (
    <>
      <NavCollapseToggle
        extended={isNavExtended}
        toggleExtended={() => setIsNavExtended(!isNavExtended)}
      />
      <nav
        id={AppElementID.Nav}
        className={`relative flex flex-col w-24 py-2 bg-white dark:bg-black text-center shadow-lg z-[101] ${
          isNavExtended ? "-ml-0" : "-ml-24"
        } lg:-ml-0 transition-all`}
      >
        <h2 className="w-full text-4xl my-3 bold">Blob</h2>
        <menu className="flex flex-1 flex-col">
          <li className="w-full" onClick={playSound}>
            <ViewToggle />
          </li>
          <li className="w-full" onClick={playSound}>
            <button
              onClick={openRestartDialog}
              className="py-2 underline-offset-4 hover:underline hover:text-red-600 dark:hover:text-red-300"
            >
              Restart
            </button>
          </li>
          <li className="w-full" onClick={playSound}>
            <button
              className="py-2 underline-offset-4 hover:underline"
              onClick={openHelpDialog}
            >
              Help?
            </button>
          </li>
        </menu>
        <select
          value={theme}
          onChange={(e) => {
            setTheme(e.currentTarget.value);
            playSound();
          }}
          className="mx-3 py-2 hover:underline"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <a
          className="hover:underline"
          href="https://typekev.com/"
          target="__blank"
        >
          by typekev
        </a>
      </nav>
      <RestartDialog isOpen={isRestartDialogOpen} close={closeRestartDialog} />
      <HelpDialog isOpen={isHelpDialogOpen} close={closeHelpDialog} />
    </>
  );
}
