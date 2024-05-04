<script lang="ts" setup>
import { ref } from "vue";
import { useColumns } from ".";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Add from "@iconify-icons/ep/circle-plus";
import Upload from "@iconify-icons/ep/upload";

const formRef = ref();
const TagFormRef = ref();

const {
  form,
  param,
  rules,
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
  onSizeChange,
  onCurrentChange,
  editTag,
  deleteTag,
  handleSelectionChange
} = useColumns();
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">标签管理</div>
    </template>
    <el-space class="float-right mb-4">
      <el-radio-group v-model="tableSize" size="small">
        <el-radio-button label="large">大</el-radio-button>
        <el-radio-button label="default">中</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
      </el-radio-group>
    </el-space>
    <el-form
      ref="formRef"
      :inline="true"
      :model="param"
      class="bg-bg_color w-[99/100]"
    >
      <el-form-item label="标签名称：" prop="username">
        <el-input
          v-model="param.tagName"
          placeholder="请输入标签名称"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="是否禁用：" prop="mobile">
        <el-select
          v-model="param.isDisabled"
          placeholder="请选择是否禁用"
          clearable
          class="!w-[160px]"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon(Search)"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-space>
      <el-button type="primary" size="small" :icon="useRenderIcon(Upload)"
        >批量导入</el-button
      >
      <el-button type="danger" size="small" :icon="useRenderIcon(Delete)"
        >批量删除</el-button
      >
    </el-space>

    <pure-table
      border
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      :size="tableSize"
      :loading="loading"
      :loading-config="loadingConfig"
      :height="tableSize === 'small' ? 352 : 440"
      :data="
        dataList.slice(
          (pagination.currentPage - 1) * pagination.pageSize,
          pagination.currentPage * pagination.pageSize
        )
      "
      :columns="columns"
      :pagination="pagination"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <template #image="{ row, index }">
        <el-image
          preview-teleported
          loading="lazy"
          :src="row.url"
          :initial-index="index"
          fit="cover"
          class="w-[160px] h-[80px]"
        />
      </template>
      <template #operation="{ row }">
        <el-button
          class="reset-margin"
          link
          type="primary"
          size="small"
          :icon="useRenderIcon(Add)"
          @click="editTag"
          >新增</el-button
        >
        <el-button
          class="reset-margin"
          link
          type="primary"
          size="small"
          @click="editTag(row)"
          :icon="useRenderIcon(EditPen)"
        >
          修改
        </el-button>
        <el-popconfirm title="是否确认删除?">
          <template #reference>
            <el-button
              class="reset-margin"
              link
              type="danger"
              size="small"
              @click="deleteTag(row)"
              :icon="useRenderIcon(Delete)"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </pure-table>
    <el-dialog
      :title="form.id ? '编辑标签' : '新增标签'"
      v-model="dialogVisible"
      :width="480"
      draggable
      :before-close="closeDialog"
    >
      <el-form
        ref="TagFormRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="标签名称" prop="tagName">
          <el-input
            v-model="form.tagName"
            :style="{ width: '380px' }"
            placeholder="请输入标签名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog(TagFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(TagFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
