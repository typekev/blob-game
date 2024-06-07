"use client";
import { usePathname, useRouter } from "next/navigation";

export function ViewToggle() {
  const pathname = usePathname();
  const router = useRouter();

  return pathname === "/game/field" ? (
    <button
      onClick={() => router.push("/game/editor")}
      className="w-full py-2 bg-cyan-600 hover:bg-cyan-500"
    >
      Go to Editor
    </button>
  ) : (
    <button
      onClick={() => router.push("/game/field")}
      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500"
    >
      Go to Field
    </button>
  );
}
