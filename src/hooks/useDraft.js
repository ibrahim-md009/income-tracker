import { useState } from "react";

export const useDraft = (initialValues) => {
  const [draft, setDraft] = useState(initialValues);

  const setField = (inputName, value) =>
    setDraft((d) => ({ ...d, [inputName]: value }));

  const reset = () => {
    setDraft(initialValues);
  };

  return { draft, setField, reset };
};
