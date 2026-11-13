import {
  addTransaction as addTransactionToDb,
  updateTransaction as updateTransactionInDb,
  deleteTransaction as deleteTransactionInDb,
} from "../services/transactionsServices";
import { getCurrentMonthKey } from "../utils/dates";

export const createTransactionsSlice = (set) => ({
  transactionsLog: [],
  setTransactionsLog: (value) => set(() => ({ transactionsLog: value })),

  latestTransactions: [],
  setLatestTransactions: (value) => set(() => ({ latestTransactions: value })),

  selectedMonthKey: getCurrentMonthKey(),
  editingId: "",

  addTransaction: async (draft) => {
    await addTransactionToDb(draft);
  },

  updateTransaction: async (draft) => {
    await updateTransactionInDb(draft);
  },

  deleteTransaction: async (currentTransactionId) => {
    await deleteTransactionInDb(currentTransactionId);
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
