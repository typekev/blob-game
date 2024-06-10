"use client";
import React, { useContext, useMemo, useState } from "react";

import { BlobContext } from "@/contexts/BlobContext";
import { Button } from "@/components/Button";
import { BlobTypeOptions } from "@/components/BlobTypeOptions";
import { MAX_LEN, MIN_LEN } from "@/helpers/name";
import { stringIsBlobType, blobTypes } from "@/helpers/types";

import { BlobType } from "@/types.d";

export function BlobForm() {
  const { blobNames, createBlob } = useContext(BlobContext);
  const [blobName, setBlobName] = useState("");
  const [blobType, setBlobType] = useState<BlobType>(getRandomBlobType());
  const [nameTaken, setNameTaken] = useState("");

  const submitDisabled = useMemo(
    () => blobName.length < MIN_LEN || blobName.length > MAX_LEN || !!nameTaken,
    [blobName.length, nameTaken]
  );

  const onChangeBlobName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlobName(e.target.value);
    if (blobNames.has(e.target.value.trim())) {
      setNameTaken(e.target.value);
    } else if (nameTaken) {
      setNameTaken("");
    }
  };
  const onChangeBlobType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    stringIsBlobType(e.target.value) && setBlobType(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submitDisabled) {
      createBlob({ name: blobName, type: blobType });
      setBlobName("");
      setBlobType(getRandomBlobType());
    }
  };

  return (
    <form
      className="flex-1 flex justify-center items-center border px-8 pt-6 pb-8 mb-4 h-full bg-neutral-50 dark:bg-black"
      onSubmit={onSubmit}
    >
      <section className="flex-1 lg:-mt-32">
        <h3 className="text-4xl py-3 px-4 text-center md:text-left">
          Create a Blob
        </h3>
        <fieldset className="py-3 px-4">
          <label className="block mb-2" htmlFor="blobName">
            Blob name*
          </label>
          <input
            className="shadow outline w-full p-3 dark:bg-neutral-900 leading-tight focus:outline-4 dark:focus:outline-white"
            id="blobName"
            type="text"
            placeholder="Type a name here..."
            value={blobName}
            onChange={onChangeBlobName}
            minLength={MIN_LEN}
            maxLength={MAX_LEN}
            required
          />
          {nameTaken && (
            <p className="h-0 text-red-900 dark:text-red-500">
              The name &quot;{nameTaken}&quot; is taken, please use a different
              name.
            </p>
          )}
        </fieldset>
        <fieldset className="py-3 px-4">
          <label className="block mb-2" htmlFor="blobType">
            Blob type*
          </label>
          <select
            className="shadow form-select outline w-full p-3 dark:bg-neutral-900 leading-tight focus:outline-4 dark:focus:outline-white"
            onChange={onChangeBlobType}
            value={blobType}
            required
          >
            <BlobTypeOptions />
          </select>
        </fieldset>
        <footer className="py-3 px-12">
          <Button
            type="submit"
            color="success"
            className="p-2.5 w-full"
            disabled={submitDisabled}
          >
            Create Blob
          </Button>
        </footer>
      </section>
    </form>
  );
}

const getRandomBlobType = () =>
  blobTypes[Math.floor(Math.random() * blobTypes.length)];
