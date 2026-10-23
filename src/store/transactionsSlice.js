export const createTransactionsSlice = (set) => ({
  transactionsLog: [],
  activeTab: "دخل",
  name: "",
  amount: "",
  cat: "",
  date: "",
  underEditing: false,
  editingId: "",

  // transactions filter values
  tranKind: "",
  tranCat: "",
  tranDate: "",
  tranSearch: "",
  underFiltering: false,

  //transactions actions
  toggleActiveTab: (tabTitle) =>
    set(() => ({
      activeTab: tabTitle,
    })),
  onChange: (tran, e) =>
    set(() => ({
      [tran]: e,
    })),
  addTransaction: () =>
    set((state) => ({
      transactionsLog: [
        ...state.transactionsLog,
        {
          name: state.name,
          amount: state.amount,
          date: state.date,
          cat: state.cat,
          kind: state.activeTab,
          id: crypto.randomUUID(),
        },
      ],
    })),
  clearForm: () =>
    set(() => ({
      name: "",
      amount: "",
      cat: "",
      date: "",
      underEditing: false,
    })),
  editTransaction: (tran) =>
    set(() => ({
      name: tran.name,
      amount: tran.amount,
      cat: tran.cat,
      date: tran.date,
      underEditing: true,
      editingId: tran.id,
    })),
  updateTransaction: () =>
    set((state) => ({
      transactionsLog: state.transactionsLog.map((transaction) =>
        state.editingId === transaction.id
          ? {
              ...transaction,
              name: state.name,
              amount: state.amount,
              cat: state.cat,
              date: state.date,
              kind: state.activeTab,
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

  //transactions filtering actions
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
