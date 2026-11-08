import {
  addTransaction as addTransactionToDb,
  updateTransaction as updateTransactionInDb,
  deleteTransaction as deleteTransactionInDb,
} from "../services/transactionsServices";
import { getCurrentMonthKey } from "../utils/dates";

export const createTransactionsSlice = (set) => ({
  transactionsLog: [],
  setTransactionsLog: (value) => set(() => ({ transactionsLog: value })),

  selectedMonthKey: getCurrentMonthKey(),
  editingId: "",

  addTransaction: async (draft) => {
    const newTransaction = await addTransactionToDb(draft);
    set((state) => ({
      transactionsLog: [...state.transactionsLog, newTransaction],
    }));
  },

  updateTransaction: async (draft) => {
    await updateTransactionInDb(draft);
    set((state) => ({
      transactionsLog: state.transactionsLog.map((transaction) =>
        draft.id === transaction.id
          ? {
              ...transaction,
              ...draft,
            }
          : transaction,
      ),
    }));
  },

  deleteTransaction: async (currentTransactionId) => {
    await deleteTransactionInDb(currentTransactionId);
    set((state) => ({
      transactionsLog: state.transactionsLog.filter(
        (tran) => tran.id !== currentTransactionId,
      ),
    }));
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
