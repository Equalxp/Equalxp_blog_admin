<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import DocumentAdd from "@iconify-icons/ep/document-add";
import DocumentChecked from "@iconify-icons/ep/document-checked";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { message } from "@/utils/message";

const route = useRoute();
const articleForm = reactive({
  id: "",
  articleTitle: "",
  tagList: [],
  category: "",
  text: "jjjjjjjjjhhhhhhhh",
  url: "",
  isTop: "", // 置顶
  status: "" // 状态
});
const articleFormRules = {};
const dialogVisible = ref(false);
const articleFormRef = ref();

function closeDialog() {
  resetForm(articleFormRef.value);
  dialogVisible.value = false;
}
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};
function publish() {
  dialogVisible.value = true;
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
  if (!route.query.id) return;
  // 根据id获取文章信息
  const obj = {
    id: 1
  };
  Object.assign(articleForm, obj);
});
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">{{ articleForm.id ? "编辑" : "新增" }}文章</div>
    </template>
    <el-form
      ref="formRef"
      :inline="true"
      :model="articleForm"
      class="bg-bg_color w-[99/100]"
    >
      <el-form-item
        style="width: 65%"
        label="文章标题"
        label-width="70"
        prop="articleTitle"
      >
        <el-input
          v-model="articleForm.articleTitle"
          placeholder="请输入文章标题"
          clearable
          maxlength="20"
        />
      </el-form-item>
      <el-form-item style="width: 25%">
        <div class="publish-btn">
          <el-button
            type="danger"
            size="small"
            plain
            :icon="useRenderIcon(DocumentAdd)"
            >保存草稿</el-button
          >
          <el-button
            type="danger"
            size="small"
            :icon="useRenderIcon(DocumentChecked)"
            @click="publish()"
            >发布文章</el-button
          >
        </div>
      </el-form-item>
      <el-form-item style="width: 100%" prop="articleText">
        <md-editor v-model="articleForm.text" />
      </el-form-item>
    </el-form>
    <el-dialog
      title="发布文章"
      v-model="dialogVisible"
      :width="480"
      draggable
      :before-close="closeDialog"
    >
      <el-form
        ref="articleFormRef"
        :model="articleForm"
        :rules="articleFormRules"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="articleTitle">
          {{ articleForm.articleTitle }}
        </el-form-item>
        <el-form-item label="文章分类" prop="categoryName">
          <el-select
            v-model="articleForm.category"
            :style="{ width: '380px' }"
            placeholder="请选择分类"
          >
            <el-option label="分类1" value="1" />
            <el-option label="分类2" value="2" />
            <el-option label="分类3" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="tagName">
          <el-select
            v-model="articleForm.tagList"
            multiple
            :style="{ width: '380px' }"
            placeholder="请选择标签"
          >
            <el-option label="标签1" value="1" />
            <el-option label="标签2" value="2" />
            <el-option label="标签3" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="submitForm(articleFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
<style lang="scss" scoped>
.publish-btn {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
