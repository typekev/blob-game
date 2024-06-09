"use client";
import { useEffect, useMemo, useState } from "react";

import { getRequiredExp } from "@/helpers/exp";
import { MAX_LEVEL } from "@/helpers/level";

import type { Blob, BlobID } from "@/types.d";

interface Props extends Blob {
  field: HTMLDivElement;
  addExp: (id: BlobID) => void;
}

export function BlobAvatar({
  id,
  name,
  type,
  level,
  exp,
  skills,
  field,
  addExp,
}: Props) {
  const [isGainingExp, setIsGainingExp] = useState(false);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [expTimeoutId, setExpTimeoutId] = useState<number>();

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

  const onClickBlob = () => {
    if (!isGainingExp) {
      addExp(id);
      setIsGainingExp(true);
    }
  };

  useEffect(() => {
    if (expTimeoutId) {
      clearTimeout(expTimeoutId);
    }

    setExpTimeoutId(
      window.setTimeout(() => {
        setIsGainingExp(false);
        setIsLevelingUp(false);
      }, 700)
    );

    return () => window.clearTimeout(expTimeoutId);
  }, [isGainingExp]);

  useEffect(() => {
    if (isGainingExp) {
      setIsLevelingUp(true);
    }
  }, [level]);

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
              <figure
                className="relative m-auto"
                style={{ width: size[1], height: size[1] }}
                onClick={onClickBlob}
              >
                <canvas
                  role="presentation"
                  className={`blob-avatar-base blob-avatar-${type}`}
                  style={{ fontSize: size[0] }}
                >
                  A {type} blob named {name}
                </canvas>
                {isGainingExp && (
                  <figcaption className="blob-avatar-plus-one absolute top-0 right-0 -mr-3 animate-popIn whitespace-pre text-white text-shadow-xl">
                    {isLevelingUp ? "Level Up!" : "+1"}
                  </figcaption>
                )}
                <hr
                  role="presentation"
                  className="absolute scale-75 -z-10 w-full h-full rounded-full shadow-xl shadow-neutral-600 dark:shadow-neutral-900"
                />
              </figure>
              <section className="relative w-fit mt-2.5 mx-auto px-2 py-1 text-center border-neutral-600 border-4 border-double bg-neutral-100 dark:bg-neutral-900 shadow-md shadow-neutral-600 dark:shadow-neutral-900">
                <h3 className="-mt-2 -mb-1 text-xl text-shadow-md">{name}</h3>
                <section className="blob-avatar-info whitespace-pre text-sm text-left overflow-hidden">
                  <hr className="my-1 bg-neutral-900 dark:bg-neutral-400" />
                  <p>Type: {type}</p>
                  <p>Level: {level}</p>
                  <p>
                    Exp: {exp}
                    {level < MAX_LEVEL && ` / ${getRequiredExp(level)}`}
                  </p>
                  <p>Skills:</p>
                  {skills.length > 0 ? (
                    <ul>
                      {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </section>
              </section>
            </section>
          </section>
        </section>
      </section>
    </article>
  );
}
