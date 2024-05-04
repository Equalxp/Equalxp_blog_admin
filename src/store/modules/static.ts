import { defineStore } from "pinia";
import { store } from "@/store";

// 存放静态数据
export const useStaticStore = defineStore({
  id: "pure-static",
  state: () => ({
    articleTab: [
      {
        key: "1",
        content: "所有文章",
        title: "所有文章"
      },
      {
        key: "2",
        content: "公开文章",
        title: "公开文章"
      },
      {
        key: "3",
        content: "私密文章",
        title: "私密文章"
      },
      {
        key: "4",
        content: "草稿箱",
        title: "草稿箱"
      },
      {
        key: "5",
        content: "回收站",
        title: "回收站"
      }
    ]
  }),
  getters: {
    getArticleTab() {
      return this.articleTab;
    }
  },
  actions: {}
});

export function useStaticStoreHook() {
  return useStaticStore(store);
}
