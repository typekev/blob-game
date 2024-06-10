"use client";
interface Props {
  type: string;
  name: string;
  size: number[];
  onClickBlob: () => void;
  alerts: string[];
}

export function BlobFigure({ type, name, size, onClickBlob, alerts }: Props) {
  return (
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
      {alerts.map((alert, i) => (
        <figcaption
          key={i}
          className="blob-avatar-plus-one absolute top-0 right-0 -mr-3 animate-popIn whitespace-pre text-white text-shadow-xl"
        >
          {alert}
        </figcaption>
      ))}
      <hr
        role="presentation"
        className="absolute scale-75 -z-10 w-full h-full rounded-full shadow-xl shadow-neutral-600 dark:shadow-neutral-900"
      />
    </figure>
  );
}
