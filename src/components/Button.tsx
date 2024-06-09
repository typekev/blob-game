"use client";
import { disabledAudio, selectAudio } from "@/helpers/audio";

type ColorType = "success" | "danger" | "none";

const COLORS: Record<ColorType, string> = {
  success: "hover:bg-green-200 dark:hover:bg-green-800 hover:outline-green-400",
  danger: "hover:bg-red-200 dark:hover:bg-red-800 hover:outline-red-400",
  none: "hover:bg-neutral-200 dark:hover:bg-neutral-800",
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorType;
}

export function Button({
  color = "none",
  disabled,
  className,
  ...rest
}: Props) {
  const handleClick = () =>
    disabled ? disabledAudio?.playFrom() : selectAudio?.playFrom();

  return (
    <button
      onClick={handleClick}
      className={`px-2 outline ${
        disabled
          ? "text-neutral-500 dark:text-neutral-400 bg-neutral-300 dark:bg-neutral-600 outline-neutral-400 dark:outline-neutral-700"
          : COLORS[color]
      } ${className}`}
      {...rest}
    />
  );
}
