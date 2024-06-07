"use client";
import React, { useContext, useMemo, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { Button } from "@/components/Button";
import { BlobTypeOptions } from "@/components/BlobTypeOptions";
import { getRequiredExp } from "@/helpers/exp";
import { MAX_LEVEL } from "@/helpers/level";
import { stringIsBlobType } from "@/helpers/types";

import { Blob, BlobExp, BlobID, BlobLevel } from "@/types.d";

interface Props extends Blob {
  onDelete: (id: BlobID) => void;
}

export function BlobListItem({
  id,
  name,
  type,
  level,
  exp,
  skills,
  onDelete,
}: Props) {
  const { blobNames, updateBlob } = useContext(BlobContext);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nextBlobName, setNextBlobName] = useState(name);

  const updateBlobType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    stringIsBlobType(e.target.value) &&
    updateBlob({ id, name, type: e.target.value, level, exp, skills });

  const submitBlobName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submitDisabled) {
      updateBlob({ id, name: nextBlobName, type, level, exp, skills });
      setIsEditingName(false);
    }
  };

  const resetName = () => {
    setIsEditingName(false);
    setNextBlobName(name);
  };

  const toggleIsEditingName = () => setIsEditingName(!isEditingName);

  const onChangeNextBlobName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNextBlobName(e.target.value);

  const handleDelete = () => onDelete(id);

  const submitDisabled = useMemo(
    () =>
      nextBlobName.length < 1 ||
      nextBlobName.length > 12 ||
      (blobNames.has(nextBlobName) && nextBlobName !== name),
    [nextBlobName]
  );

  return (
    <li
      id={name}
      className="flex flex-col w-80 sm:w-96 md:w-auto bg-white dark:bg-black rounded shadow-lg"
    >
      <section className="px-6 py-4">
        <p className="bg-neutral-200 rounded-full relative w-full h-3 dark:bg-neutral-700 shadow-sm">
          <small className="absolute right-0 italic -mt-1 px-1 z-10">
            exp: {exp}
            {level < MAX_LEVEL && ` / ${getRequiredExp(level)}`}
          </small>
          <progress
            className="bg-emerald-200 dark:bg-emerald-600 rounded-full h-3 absolute top-0"
            style={{ width: `${getExpPercentage(exp, level) * 100}%` }}
          />
        </p>
        <header className="inline-block text-2xl mt-2 mb-4 w-full">
          {isEditingName ? (
            <>
              <form className="flex pt-0.5 gap-3" onSubmit={submitBlobName}>
                <input
                  className="flex-1 mt-0 min-w-0 dark:bg-neutral-900 leading-tight outline focus:outline-4 dark:focus:outline-white"
                  value={nextBlobName}
                  onChange={onChangeNextBlobName}
                  minLength={1}
                  maxLength={12}
                  required
                  autoFocus
                />
                <Button type="submit" color="success" disabled={submitDisabled}>
                  Save
                </Button>
                <Button color="danger" onClick={resetName}>
                  Cancel
                </Button>
              </form>
              {submitDisabled && blobNames.has(nextBlobName) && (
                <p className="h-0 text-red-900 dark:text-red-500 text-sm">
                  The name &quot;{nextBlobName}&quot; is taken, please use a
                  different name.
                </p>
              )}
            </>
          ) : (
            <button
              className="flex items-center gap-2 rounded-sm hover:bg-green-100 dark:hover:bg-green-600"
              onClick={toggleIsEditingName}
            >
              <strong>{name}</strong>
              <small>[edit]</small>
            </button>
          )}
        </header>
        <p>
          Type:
          <label>
            <select
              className="font-bold rounded-sm ml-1 hover:bg-green-100 dark:bg-black dark:hover:bg-green-600 dark:focus:bg-black"
              value={type}
              onChange={updateBlobType}
            >
              <BlobTypeOptions />
            </select>
          </label>
        </p>
        <p>
          Level: <strong>{level}</strong>
        </p>
      </section>
      <section className="px-6 pt-4 pb-2">
        <p>
          Skills:{" "}
          {skills.length > 0
            ? skills.map((skill) => (
                <mark
                  key={skill}
                  className="inline-block bg-neutral-200 rounded-md px-3 py-1 font-bold text-neutral-700 mr-2 mb-2"
                >
                  {skill}
                </mark>
              ))
            : "N/A"}
        </p>
      </section>
      <footer className="p-6 mt-auto">
        <Button className="w-full py-2" color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </footer>
    </li>
  );
}

const getExpPercentage = (exp: BlobExp, level: BlobLevel) =>
  exp / getRequiredExp(level);
