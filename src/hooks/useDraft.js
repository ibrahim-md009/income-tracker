import { useState } from "react";

export const emptyDraft = {
  name: "",
  amount: "",
  cat: "",
  date: "",
  kind: "دخل",
};

export const useDraft = (initialValues = emptyDraft) => {
  const [draft, setDraft] = useState(initialValues);

  const setField = (inputName, value) =>
    setDraft((d) => ({ ...d, [inputName]: value }));

  const reset = () => {
    setDraft(emptyDraft);
  };
  return { draft, setField, reset };
};
