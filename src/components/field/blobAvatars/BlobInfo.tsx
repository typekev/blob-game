import { getRequiredExp } from "@/helpers/exp";
import { MAX_LEVEL } from "@/helpers/level";

interface Props {
  name: string;
  type: string;
  level: number;
  exp: number;
  skills: string[];
}

export function BlobInfo({ name, type, level, exp, skills }: Props) {
  return (
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
        <p>Skills: </p>
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
  );
}
