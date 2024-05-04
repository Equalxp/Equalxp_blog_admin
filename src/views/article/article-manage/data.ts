import dayjs from "dayjs";
import { clone } from "@pureadmin/utils";

const createTime = dayjs(new Date()).format("YYYY-MM-DD");
const updateTime = dayjs(new Date()).format("YYYY-MM-DD");

const tableData = [
  {
    id: 1,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 1,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 2,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 3,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 4,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 5,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 6,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 7,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 8,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 9,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  },
  {
    id: 10,
    title: "哈哈哈哈哈",
    tagList: "vue、ts",
    category: "前端学习",
    createTime,
    updateTime,
    isTop: 0,
    url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  }
];

const tableImageList = [
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
  "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
];

const tableDataMore = clone(tableData, true).map(item =>
  Object.assign(item, {
    state: "California",
    city: "Los Angeles",
    "post-code": "CA 90036"
  })
);

const tableDataImage = clone(tableData, true).map((item, index) =>
  Object.assign(item, {
    image: `https://pure-admin.github.io/pure-admin-table/imgs/${index + 1}.jpg`
  })
);

const tableDataSortable = clone(tableData, true).map((item, index) => {
  delete item["date"];
  Object.assign(item, {
    date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
  });
});

const tableDataDrag = clone(tableData, true).map((item, index) => {
  delete item["address"];
  delete item["date"];
  return Object.assign(
    {
      id: index + 1,
      date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
    },
    item
  );
});

const tableDataEdit = clone(tableData, true).map((item, index) => {
  delete item["date"];
  return Object.assign(
    {
      id: index + 1,
      date: `${dayjs(new Date()).format("YYYY-MM")}-${index + 1}`
    },
    item
  );
});

export {
  tableData,
  tableDataDrag,
  tableDataMore,
  tableDataEdit,
  tableDataImage,
  tableImageList,
  tableDataSortable
};
