import { addTransaction as addTransactionToDb } from "../services/transactionsServices";
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

  updateTransaction: (draft) =>
    set((state) => ({
      transactionsLog: state.transactionsLog.map((transaction) =>
        state.editingId === transaction.id
          ? {
              ...transaction,
              ...draft,
            }
          : transaction,
      ),
    })),

  deleteTransaction: (currentTransactionId) =>
    set((state) => ({
      transactionsLog: state.transactionsLog.filter(
        (tran) => tran.id !== currentTransactionId,
      ),
    })),

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
