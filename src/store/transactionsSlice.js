import {
  addTransaction as addTransactionToDb,
  updateTransaction as updateTransactionInDb,
  deleteTransaction as deleteTransactionInDb,
} from "../services/transactionsServices";
import { getCurrentMonthKey } from "../utils/dates";
import { useAuth } from "./useAuth";

export const createTransactionsSlice = (set) => ({
  transactionsLog: [],
  setTransactionsLog: (value) => set(() => ({ transactionsLog: value })),

  latestTransactions: [],
  setLatestTransactions: (value) => set(() => ({ latestTransactions: value })),

  selectedMonthKey: getCurrentMonthKey(),
  editingId: "",

  addTransaction: async (draft) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await addTransactionToDb(uid, draft);
  },

  updateTransaction: async (draft) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await updateTransactionInDb(uid, draft);
  },

  deleteTransaction: async (currentTransactionId) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await deleteTransactionInDb(uid, currentTransactionId);
  },

  // transactions filter values
  tranKind: "",
  tranCat: "",
  tranDate: "",
  tranSearch: "",
  underFiltering: false,

  //filtering
  changeFilter: (tran, e) =>
    set(() => ({
      [tran]: e,
      underFiltering: true,
    })),
  clearFiltering: () =>
    set(() => ({
      tranSearch: "",
      tranDate: "",
      tranCat: "",
      tranKind: "",
      underFiltering: false,
    })),
});
