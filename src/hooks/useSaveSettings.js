import { useStore } from "../store/useStore";
import { getErrorMsg } from "../utils/errors";

export const useSaveSettings = (section) => {
  const updateSettings = useStore((s) => s.updateSettings);

  return async (draft) => {
    try {
      await updateSettings(section, draft);
    } catch (error) {
      alert(getErrorMsg(error));
    }
  };
};
