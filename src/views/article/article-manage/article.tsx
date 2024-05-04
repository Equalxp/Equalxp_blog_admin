import { tableData, tableImageList } from "./data";
import { clone, delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps, LoadingConfig } from "@pureadmin/table";

export function useColumns() {
  const param = reactive({
    title: "",
    tag: [],
    category: "",
    status: "",
    time: "",
    currennt: 1,
    size: 10
  });
  const dataList = ref([]);
  const loading = ref(true);
  const tableSize = ref("small");
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "序号",
      type: "index",
      width: 55
    },
    {
      label: "文章标题",
      prop: "title",
      minWidth: 130
    },
    {
      label: "标签",
      prop: "tagList",
      minWidth: 150
    },
    {
      label: "分类",
      prop: "category"
    },
    {
      label: "封面",
      prop: "url",
      width: 200,
      slot: "image"
    },
    {
      label: "是否置顶",
      prop: "isTop",
      cellRenderer: ({ row }) => (
        <el-switch
          v-model={row.isTop}
          active-value={1}
          inactive-value={0}
          onChange={() => onIsTopChange(row)}
        ></el-switch>
      )
    },
    {
      label: "发布日期",
      prop: "createTime"
    },
    {
      label: "修改日期",
      prop: "updateTime"
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 15, 20],
    total: 0,
    align: "right",
    background: true,
    small: true
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加载第一页...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });
  const tabClick = (val: any) => {
    console.log(val);
  };
  function onSearch() {}
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
  function onIsTopChange(val) {
    console.log(val);
  }
  function handleSelectionChange(val) {
    console.log(val);
  }
  function onChange(val) {
    pagination.small = val;
  }

  function onSizeChange(val) {
    console.log("onSizeChange", val);
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }
  function editArticle(row) {
    console.log(row);
  }
  function deleteArticle(row) {
    console.log(row);
  }

  onMounted(() => {
    delay(600).then(() => {
      const newList = [];
      Array.from({ length: 6 }).forEach(() => {
        newList.push(clone(tableData, true));
      });
      dataList.value = newList.flat(Infinity);
      pagination.total = dataList.value.length;
      loading.value = false;
    });
  });

  return {
    param,
    loading,
    columns,
    dataList,
    tableImageList,
    tableSize,
    pagination,
    loadingConfig,
    tabClick,
    onSearch,
    resetForm,
    onChange,
    onSizeChange,
    onCurrentChange,
    editArticle,
    deleteArticle,
    handleSelectionChange
  };
}
