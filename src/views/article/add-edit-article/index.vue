<script lang="ts" setup>
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import DocumentAdd from "@iconify-icons/ep/document-add";
import DocumentChecked from "@iconify-icons/ep/document-checked";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { UploadFilled } from "@element-plus/icons-vue";

import { useArticle } from "./index";
const {
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
} = useArticle();

const optionTagList = [
  {
    label: "tag1",
    value: "001"
  },
  {
    label: "tag2",
    value: "002"
  },
  {
    label: "tag3",
    value: "003"
  }
];
const optionCategoryList = [
  {
    label: "category1",
    value: "001"
  },
  {
    label: "category2",
    value: "002"
  },
  {
    label: "category3",
    value: "003"
  }
];
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">{{ articleForm.id ? "编辑" : "新增" }}文章</div>
    </template>
    <el-form
      ref="articleFormRef"
      :inline="true"
      :model="articleForm"
      :rules="articleFormRules"
      class="bg-bg_color w-[99/100]"
      label-width="120"
    >
      <el-form-item
        style="width: 65%"
        label-width="80"
        label="文章标题"
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
            @click="publish(articleFormRef)"
            >保存草稿</el-button
          >
          <el-button
            type="danger"
            size="small"
            :icon="useRenderIcon(DocumentChecked)"
            @click="publish(articleFormRef)"
            >发布文章</el-button
          >
        </div>
      </el-form-item>
      <el-form-item style="width: 100%" prop="articleContent">
        <md-editor v-model="articleForm.articleContent" />
      </el-form-item>
    </el-form>
    <el-dialog
      title="发布文章"
      v-model="dialogVisible"
      :width="800"
      draggable
      top="5vh"
      :before-close="closeDialog"
    >
      <el-form
        ref="dialogArticleFormRef"
        :inline="true"
        :model="articleForm"
        :rules="dialogArticleFormRules"
        class="bg-bg_color w-[99/100]"
        label-width="120"
      >
        <el-form-item class="form-item100" label="文章标题" prop="articleTitle">
          {{ articleForm.articleTitle }}
        </el-form-item>
        <el-form-item label="文章分类" prop="articleCategory">
          <el-select
            v-model="articleForm.articleCategory"
            :style="{ width: '380px' }"
            placeholder="请选择分类"
            multiple
            filterable
            clearable
            allow-create
            :multiple-limit="1"
          >
            <el-option
              v-for="item in optionCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="articleTag">
          <el-select
            v-model="articleForm.articleTag"
            :style="{ width: '380px' }"
            placeholder="请选择标签"
            multiple
            filterable
            clearable
            allow-create
            :multiple-limit="3"
          >
            <el-option
              v-for="item in optionTagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item100"
          label="文章缩略图"
          prop="articleCover"
        >
          <el-upload
            v-model:file-list="articleForm.articleCover"
            class="image-upload"
            drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-preview="uploadPreview"
            :on-success="uploadSuccess"
            :on-remove="uploadRemove"
            :on-error="uploadError"
            :limit="1"
          >
            <div>
              <el-icon clas s="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">拖拽 或者 <em>点击上传</em></div>
            </div>
            <el-image
              v-if="articleForm.articleCover.length"
              class="preview-upload"
              :src="articleForm.articleCover[0].url"
            />
          </el-upload>
        </el-form-item>
        <el-form-item class="form-item100" label="置顶">
          <el-switch
            v-model="articleForm.isTop"
            size="small"
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
        <el-form-item class="form-item100" label="状态">
          <el-radio-group v-model="articleForm.isPublic">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="form-item100" label="文章类型">
          <el-radio-group v-model="articleForm.type">
            <el-radio :label="1">原创</el-radio>
            <el-radio :label="2">转载</el-radio>
            <el-radio :label="3">翻译</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button
          size="small"
          type="danger"
          plain
          @click="submitForm(dialogArticleFormRef)"
        >
          保存草稿
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="submitForm(dialogArticleFormRef)"
        >
          发布文章
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

.flex_r {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.form-item {
  &45 {
    width: 45%;
    font-weight: bold;
  }

  &100 {
    width: 100%;
    font-weight: bold;
  }
}

:deep(.el-select-dropdown__item) {
  padding: 0 5px;
}

.image-upload {
  position: relative;
  width: 45%;
  height: 200px;
}

.preview-upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 165px;
  border-radius: 6px;
  z-index: 9999;
  border: 1px dashed var(--el-border-color);
}
</style>
