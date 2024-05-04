import dayjs from "dayjs";
import { clone } from "@pureadmin/utils";

const createTime = dayjs(new Date()).format("YYYY-MM-DD");
const updateTime = dayjs(new Date()).format("YYYY-MM-DD");

const tableData = [
  {
    id: "1",
    articleTitle: "第一篇文章",
    articleCategory: ["001"],
    articleTag: ["001", "002", "003"],
    articleContent: "哈哈哈",
    articleCover: [
      {
        name: "hamburger.png",
        url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      }
    ],
    isTop: 1, // 置顶 1 置顶 0 不置顶
    isPublic: 1, // 状态 1 公开 0 私密
    type: 1, // 类型 1 原创 2 翻译 3 转载
    createTime: createTime,
    updateTime: updateTime
  },
  {
    id: "2",
    articleTitle: "第二篇文章",
    articleCategory: ["001"],
    articleTag: ["001", "002", "003"],
    articleContent: "哈哈哈",
    articleCover: [
      {
        name: "hamburger.png",
        url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      }
    ],
    isTop: 1, // 置顶 1 置顶 0 不置顶
    isPublic: 1, // 状态 1 公开 0 私密
    type: 1, // 类型 1 原创 2 翻译 3 转载
    createTime: createTime,
    updateTime: updateTime
  },
  {
    id: "3",
    articleTitle: "第三篇文章",
    articleCategory: ["001"],
    articleTag: ["001", "002", "003"],
    articleContent: "哈哈哈",
    articleCover: [
      {
        name: "hamburger.png",
        url: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      }
    ],
    isTop: 1, // 置顶 1 置顶 0 不置顶
    isPublic: 1, // 状态 1 公开 0 私密
    type: 1, // 类型 1 原创 2 翻译 3 转载
    createTime: createTime,
    updateTime: updateTime
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
