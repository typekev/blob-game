"use client";
import { useContext, useEffect, useMemo, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";

import type { Blob } from "@/types.d";

import { BlobFigure } from "./BlobFigure";
import { BlobInfo } from "./BlobInfo";

interface Props extends Blob {
  field: HTMLDivElement;
}

export function BlobAvatar({
  id,
  name,
  type,
  level,
  exp,
  skills,
  field,
}: Props) {
  const { growBlob } = useContext(BlobContext);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const size = useMemo(
    () => [Math.max(level / 2, 4), Math.max(level * 6, 48)],
    [level]
  );

  const [x, y] = useMemo(
    () => [
      Math.random() * field.clientWidth,
      Math.random() * field.clientHeight,
    ],
    []
  );

  const [walkDuration, walkDelay] = useMemo(
    () => [
      `${Math.floor(Math.random() * 40) + 20}s`,
      `${Math.floor(Math.random() * 30)}s`,
    ],
    []
  );

  useEffect(() => {
    isMounted
      ? setAlerts((prevAlerts) => [...prevAlerts, "+1"])
      : setIsMounted(true);
  }, [exp]);

  useEffect(() => {
    isMounted
      ? setAlerts((prevAlerts) => [...prevAlerts, `Level ${level}!  `])
      : setIsMounted(true);
  }, [level]);

  useEffect(() => {
    setTimeout(
      () => setAlerts((prevAlerts) => prevAlerts.toSpliced(0, 1)),
      5000
    );
  }, [exp, level]);

  return (
    <article
      className="blob-avatar absolute animate-wiggle cursor-pointer hover:!z-[100]"
      style={{ top: y, left: x, zIndex: level }}
    >
      <section className="animate-bounce">
        <section
          className="absolute animate-walkX"
          style={{
            animationDuration: walkDuration,
            animationDelay: walkDelay,
          }}
        >
          <section
            className="absolute animate-walkY"
            style={{
              animationDuration: walkDuration,
              animationDelay: walkDelay,
            }}
          >
            <section className="hover:scale-125 transition-transform">
              <BlobFigure
                type={type}
                name={name}
                size={size}
                onClickBlob={() => growBlob(id)}
                alerts={alerts}
              />
              <BlobInfo
                name={name}
                type={type}
                level={level}
                exp={exp}
                skills={skills}
              />
            </section>
          </section>
        </section>
      </section>
    </article>
  );
}
