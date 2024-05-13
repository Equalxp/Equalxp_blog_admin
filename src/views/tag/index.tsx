import { ref, reactive, onMounted } from "vue";
import type { PaginationProps, LoadingConfig } from "@pureadmin/table";
import { message } from "@/utils/message";

import { getTagList, deleteTagList } from "@/api/tag";
//addTag, editTag
export function useColumns() {
  const param = reactive({
    current: 1,
    size: 10,
    tag_name: ""
  });
  const primaryParam = reactive({ ...param });
  const dialogVisible = ref(false);
  const dataList = ref([]);
  const loading = ref(true);
  const tableSize = ref("small");
  const selectList = ref([]);
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
      prop: "tag_name",
      minWidth: 130
    },
    {
      label: "创建日期",
      prop: "createdAt"
    },
    {
      label: "修改日期",
      prop: "updatedAt"
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
    tag_name: ""
  });
  const rules = {
    tag_name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
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
    text: "正在加载第1页...",
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

  function onSearch() {
    getPageTagList();
  }
  const resetParam = () => {
    Object.assign(param, primaryParam);
    onSearch();
  };
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
  };
  function handleSelectionChange(val) {
    selectList.value = val;
  }
  function onChange(val) {
    pagination.small = val;
  }

  function onSizeChange(val) {
    param.size = val;
    getPageTagList();
  }

  async function onCurrentChange(val) {
    if (typeof val == "number") {
      loadingConfig.text = `正在加载第${val}页...`;
      param.current = val;
      loading.value = true;
      getPageTagList();
    }
  }
  function editTag(row) {
    dialogVisible.value = true;
    if (row) {
      Object.assign(form, row);
    }
  }
  async function deleteTag(row) {
    const res = await deleteTagList([row.id]);
    console.log(res);

    if (res.code == 0) {
      message(`删除标签${row.tag_name}成功`, { type: "success" });
    } else {
      message(res.message, { type: "error" });
    }
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

  async function getPageTagList() {
    const res = await getTagList(param);
    if (res.code == 0) {
      dataList.value = res.result.list;
      pagination.total = res.result.total;
      loading.value = false;
    } else {
      loading.value = false;
      message("请求失败", { type: "error" });
    }
  }

  onMounted(() => {
    getPageTagList();
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
    resetParam,
    resetForm,
    onChange,
    onSizeChange,
    onCurrentChange,
    editTag,
    deleteTag,
    handleSelectionChange,
    getPageTagList
  };
}
