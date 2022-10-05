import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    name: "",
    tag: ""
  }),
    getters: {
        getName: (state) => state.name,
        getTag: (state) => state.tag
    },
    actions: {
    }
});
