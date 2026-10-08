import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      //settings
      userName: "",
      userImage: "",

      setUserImage: (url) => set(() => ({ userImage: url })),

      //transactions form values
      transactionsLog: [],
      activeTab: "دخل",
      name: "",
      amount: "",
      cat: "",
      date: "",
      underEditing: false,
      editingId: "",

      // transactions fiter values
      tranKind: "",
      tranCat: "",
      tranDate: "",
      tranSearch: "",
      underFiltering: false,

      // categories form values
      categories: [],
      catTitle: "",
      catType: "مصروف",
      catUnderEditing: false,
      catEditingId: "",

      // categories actions
      toggleCatType: (catKind) =>
        set(() => ({
          catType: catKind,
        })),
      addCategory: (type) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { type: type, title: state.catTitle, value: state.catTitle },
          ],
        })),
      clearCategoriesForm: () =>
        set(() => ({
          catTitle: "",
          catType: "مصروف",
          catUnderEditing: false,
        })),
      delCategory: (catTitle) =>
        set((state) => ({
          categories: state.categories.filter(
            (expCat) => expCat.title !== catTitle,
          ),
        })),
      editCategory: (cat) =>
        set(() => ({
          catTitle: cat.title,
          catType: cat.type,
          catEditingId: cat.title,
          catUnderEditing: true,
        })),
      updateCategory: () =>
        set((state) => ({
          categories: state.categories.map((cat) => {
            return cat.title === state.catEditingId
              ? { ...cat, title: state.catTitle, type: state.catType }
              : cat;
          }),
          catUnderEditing: false,
        })),

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
    }),

    {
      name: "transactionsLog",
      partialize: (state) => ({
        transactionsLog: state.transactionsLog,
        categories: state.categories,
        userName: state.userName,
        userImage: state.userImage,
      }),
    },
  ),
);
