import { ref, onMounted, reactive } from "vue";
import { message } from "@/utils/message";
import { useRoute } from "vue-router";

export function useArticle() {
  const dialogVisible = ref(false);
  const articleFormRef = ref();
  const dialogArticleFormRef = ref();
  const route = useRoute();

  const articleForm = reactive({
    id: "",
    articleTitle: "",
    articleCategory: [],
    articleTag: [],
    articleContent: "哈哈哈",
    articleCover: [
      {
        name: "xxx.png",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      }
    ],
    isTop: 1, // 置顶 1 置顶 0 不置顶
    isPublic: 1, // 状态 1 公开 0 私密
    type: 1 // 类型 1 原创 2 翻译 3 转载
  });
  // 校验规则
  const articleFormRules = reactive({
    articleTitle: {
      required: true,
      message: "请输入文章标题",
      trigger: "blur"
    },
    articleContent: {
      required: true,
      message: "请输入文章内容",
      trigger: "blur"
    }
  });
  // 校验规则
  const dialogArticleFormRules = reactive({
    articleCategory: {
      required: true,
      message: "请选择文章分类",
      trigger: ["blur", "change"]
    },
    articleTag: {
      required: true,
      message: "请选择文章标签",
      trigger: ["blur", "change"]
    },
    articleCover: {
      required: true,
      message: "请上传文章封面",
      trigger: ["blur"]
    }
  });

  function closeDialog() {
    resetForm(articleFormRef.value);
    resetForm(dialogArticleFormRef.value);
    dialogVisible.value = false;
  }
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
  };
  async function publish(formEl) {
    if (!formEl) return;
    await formEl.validate(valid => {
      if (valid) {
        dialogVisible.value = true;
      } else {
        message("请按照提示填写信息", { type: "warning" });
      }
    });
  }
  async function submitForm(formEl) {
    if (!formEl) return;
    await formEl.validate(valid => {
      if (valid) {
        console.log(articleForm);
        message("提交成功", { type: "success" });
        dialogVisible.value = false;
      } else {
        message("请按照提示填写信息", { type: "warning" });
      }
    });
  }
  function uploadSuccess(res) {
    console.log(res);
  }
  function uploadRemove(res) {
    console.log(res);
  }
  function uploadPreview(res) {
    console.log(res);
  }
  function uploadError(res) {
    console.log(res);
  }

  onMounted(() => {
    console.log(route.query.articleId);

    if (!route.query.articleId) return;
    // 根据id获取文章信息
    const obj = localStorage.getItem("article");
    Object.assign(articleForm, JSON.parse(obj));
    localStorage.removeItem("article");
  });

  return {
    articleForm,
    dialogVisible,
    articleFormRef,
    articleFormRules,
    dialogArticleFormRef,
    dialogArticleFormRules,
    closeDialog,
    publish,
    submitForm,
    uploadSuccess,
    uploadRemove,
    uploadPreview,
    uploadError
  };
}
