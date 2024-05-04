export default {
  path: "/site",
  redirect: "/site/siteManagement",
  meta: {
    icon: "informationLine",
    title: "网站管理",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/site/siteManagement",
      name: "siteManagement",
      component: () => import("@/views/site/site.vue"),
      meta: {
        title: "网站信息管理"
      }
    }
  ]
} as RouteConfigsTable;
