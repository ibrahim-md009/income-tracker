import { useState } from "react";
// import { getTodayDate } from "../utils/dates";

// const today = getTodayDate();

// export const emptyDraft = {
//   name: "",
//   amount: "",
//   cat: "",
//   date: today,
//   kind: "دخل",
// };

export const useDraft = (initialValues) => {
  const [draft, setDraft] = useState(initialValues);

  const setField = (inputName, value) =>
    setDraft((d) => ({ ...d, [inputName]: value }));

  const reset = () => {
    setDraft(initialValues);
  };
  // const reset = () => {
  //   setDraft(emptyDraft);
  // };
  return { draft, setField, reset };
};
