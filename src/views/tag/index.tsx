import { clone, delay } from "@pureadmin/utils";
import { ref, onMounted, reactive } from "vue";
import type { PaginationProps, LoadingConfig } from "@pureadmin/table";
import { message } from "@/utils/message";

import dayjs from "dayjs";

const createTime = dayjs(new Date()).format("YYYY-MM-DD");
const updateTime = dayjs(new Date()).format("YYYY-MM-DD");
const tableData = [
  {
    id: 1,
    tagName: "Vue",
    createTime,
    updateTime,
    isDisabled: 1
  },
  {
    id: 2,
    tagName: "React",
    createTime,
    updateTime,
    isDisabled: 0
  },
  {
    id: 3,
    tagName: "js",
    createTime,
    updateTime,
    isDisabled: 0
  },
  {
    id: 4,
    tagName: "java",
    createTime,
    updateTime,
    isDisabled: 1
  },
  {
    id: 5,
    tagName: "springboot",
    createTime,
    updateTime,
    isDisabled: 0
  }
];

export function useColumns() {
  const param = reactive({
    currennt: 1,
    size: 10,
    tagName: "",
    isDisabled: ""
  });
  const dialogVisible = ref(false);
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
      label: "标签",
      prop: "tagName",
      minWidth: 130
    },
    {
      label: "创建日期",
      prop: "createTime"
    },
    {
      label: "修改日期",
      prop: "updateTime"
    },
    {
      label: "是否禁用",
      prop: "isTop",
      cellRenderer: ({ row }) => (
        <el-switch
          v-model={row.isDisabled}
          active-value={1}
          inactive-value={0}
          onChange={() => onIsDisabledChange(row)}
        ></el-switch>
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ];
  const form = reactive({
    id: "",
    tagName: ""
  });
  const rules = {
    tagName: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
  };

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

  function onSearch() {}
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
  function onIsDisabledChange(val) {
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
  function editTag(row) {
    dialogVisible.value = true;
    if (row) {
      Object.assign(form, row);
    }
  }
  function deleteTag(row) {
    console.log(row);
  }
  function closeDialog(formEl) {
    formEl.resetFields();
    dialogVisible.value = false;
  }
  async function submitForm(formEl) {
    if (!formEl) return;
    await formEl.validate(valid => {
      if (valid) {
        message("提交成功", { type: "success" });
        dialogVisible.value = false;
        resetForm(formEl);
      }
    });
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
    form,
    rules,
    param,
    loading,
    columns,
    dataList,
    tableSize,
    pagination,
    loadingConfig,
    dialogVisible,
    closeDialog,
    submitForm,
    onSearch,
    resetForm,
    onChange,
    onSizeChange,
    onCurrentChange,
    editTag,
    deleteTag,
    handleSelectionChange
  };
}
