import { getErrorMsg } from "./errors";

export const changeSettings = async (fn) => {
  try {
    // await fn();
    await update;
  } catch (error) {
    alert(getErrorMsg(error));
  }
};
