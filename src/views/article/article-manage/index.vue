<script lang="ts" setup>
import { ref } from "vue";
import { useColumns } from "./article";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useStaticStoreHook } from "@/store/modules/static";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Add from "@iconify-icons/ep/circle-plus";
import Upload from "@iconify-icons/ep/upload";
const articleTab = useStaticStoreHook().articleTab;

const formRef = ref();

const {
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
  onSizeChange,
  onCurrentChange,
  editArticle,
  deleteArticle,
  handleSelectionChange
} = useColumns();
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">文章管理</div>
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
      <el-form-item label="文章标题：" prop="username">
        <el-input
          v-model="param.title"
          placeholder="请输入文章标题"
          clearable
          class="!w-[160px]"
        />
      </el-form-item>
      <el-form-item label="文章分类：" prop="mobile">
        <el-select
          v-model="param.category"
          placeholder="请选择文章分类"
          clearable
          class="!w-[160px]"
        >
          <el-option label="tag1" value="1" />
          <el-option label="tag2" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章标签：" prop="status">
        <el-select
          v-model="param.tag"
          placeholder="请选择文章标签"
          clearable
          class="!w-[160px]"
        >
          <el-option label="tag1" value="1" />
          <el-option label="tag2" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间：" prop="status">
        <el-date-picker
          v-model="param.time"
          type="monthrange"
          placeholder="请选择发布时间段"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
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
      <el-button type="primary" size="small" :icon="useRenderIcon(Add)"
        >新增</el-button
      >
    </el-space>
    <el-tabs @tab-click="tabClick">
      <template v-for="item of articleTab" :key="item.key">
        <el-tab-pane :lazy="true">
          <template #label>
            <el-tooltip :content="item.content" placement="top-end">
              <span>{{ item.title }}</span>
            </el-tooltip>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>

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
          :preview-src-list="tableImageList.map(v => v)"
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
          @click="editArticle(row)"
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
              @click="deleteArticle(row)"
              :icon="useRenderIcon(Delete)"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </pure-table>
  </el-card>
</template>
