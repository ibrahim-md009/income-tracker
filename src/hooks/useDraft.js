import { useState } from "react";
const today = new Date().toISOString().slice(0, 10);

export const emptyDraft = {
  name: "",
  amount: "",
  cat: "",
  date: today,
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
