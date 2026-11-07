// نسخة من قسم معين في الإعدادات والتعديل عليها
// <SaveBtn /> تبديل النسخة بالإعدادات الفعلية يتم من خلال

import { useState } from "react";
import { useStore } from "../store/useStore";

export const useSettingsForm = (section) => {
  const saved = useStore((s) => s.settings[section]);
  const [draft, setDraft] = useState(saved);

  const setField = (field, value) =>
    setDraft((d) => ({ ...d, [field]: value }));

  return { draft, setField };
};
