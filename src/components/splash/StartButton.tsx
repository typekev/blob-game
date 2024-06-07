"use client";
import { useCallback, useEffect, useState } from "react";
import { pluckAudio, splashAudio } from "@/helpers/audio";
import { useRouter } from "next/navigation";

export function StartButton() {
  const [started, setStarted] = useState(false);
  const router = useRouter();

  const start = () =>
    pluckAudio.play().then(() => setTimeout(() => setStarted(true), 100));
  const end = useCallback(() => router.replace("/game/editor"), [router]);

  useEffect(() => {
    if (started) {
      splashAudio.addEventListener("ended", end);
      splashAudio.play();
    }

    return () => splashAudio.removeEventListener("ended", end);
  }, [end, started]);

  return started ? (
    <h1 className="text-6xl sm:text-8xl md:text-9xl">
      <strong className="shiny-title inline-block rounded-3xl">
        ✦<em className="mr-2 md:mr-4 lg:mr-6">TYPEKEV</em>✦
      </strong>
    </h1>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start();
      }}
    >
      <button
        type="submit"
        className="px-8 py-2 text-6xl outline-8 outline-double hover:outline hover:bg-green-100 dark:hover:bg-green-600"
      >
        Start
      </button>
    </form>
  );
}
