export const createTransactionsSlice = (set) => ({
  setState: (state, value) =>
    set(() => ({
      [state]: value,
    })),

  transactionsLog: [],
  editingId: "",

  addTransaction: (draft) =>
    set((state) => ({
      transactionsLog: [
        ...state.transactionsLog,
        { ...draft, id: crypto.randomUUID() },
      ],
    })),
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
