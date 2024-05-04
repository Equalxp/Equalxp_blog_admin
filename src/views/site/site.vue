<script setup lang="ts">
import { ref } from "vue";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

defineOptions({
  name: "site"
});

const isEditSiteInfo = ref(false);
const isEditMyInfo = ref(false);
const dialogVisible = ref(false);
const dialogImageUrl = ref("");
const showUpload = ref(true);
const disabled = ref(false);
function handlePictureCardPreview(file: any) {
  console.log(file);
}
function uploadChange(val) {
  if (val) {
    showUpload.value = false;
  } else {
    showUpload.value = true;
  }
  console.log(showUpload.value);
}

function handleDownload(file: any) {
  console.log(file);
}
function handleRemove(file) {
  console.log(file);
}
function saveSiteInfo() {
  isEditSiteInfo.value = false;
}
function editSiteInfo() {
  isEditSiteInfo.value = true;
}
function saveMyInfo() {
  isEditMyInfo.value = false;
}
function editMyInfo() {
  isEditMyInfo.value = true;
}
</script>

<template>
  <div class="flex_row">
    <el-card class="left-card">
      <template #header>
        <div class="header">
          网站信息管理
          <el-button
            v-if="isEditSiteInfo"
            plain
            type="danger"
            @click="saveSiteInfo"
            >保存</el-button
          >
          <el-button v-else type="primary" plain @click="editSiteInfo"
            >编辑</el-button
          >
        </div>
      </template>
      <el-form label-width="100">
        <el-form-item label="网站头像">
          <el-upload
            v-if="isEditSiteInfo"
            ref="uploadAvatarRef"
            :class="['avatar-uoload', showUpload ? '' : 'hide-upload']"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-change="uploadChange"
          >
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <el-icon><Download /></el-icon>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
          <el-avatar
            v-else
            class="site-avatar"
            :size="80"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          />
        </el-form-item>
        <el-form-item label="网站名称">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="gitee地址">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="qq号">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="bilibili">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
        <el-form-item label="github">
          <el-input v-if="isEditSiteInfo" />
          <span v-else>M</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="right-card">
      <template #header>
        <div class="header">
          个人信息管理
          <el-button v-if="isEditMyInfo" plain type="danger" @click="saveMyInfo"
            >保存</el-button
          >
          <el-button v-else type="primary" plain @click="editMyInfo"
            >编辑</el-button
          >
        </div>
      </template>
      <el-form label-width="80">
        <el-form-item label="个人头像">
          <el-upload />
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input />
        </el-form-item>
        <el-form-item label="账号">
          <el-input />
        </el-form-item>
        <el-form-item label="密码">
          <el-input />
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.flex_row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-card {
  width: 62%;
  height: 82vh;

  .site-avatar {
    margin-left: 80px;
  }

  .avatar-uoload {
    margin-left: 80px;
    height: 80px;
    width: 80px;
  }

  :deep(.el-upload--picture-card) {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }

  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 80px;
    height: 80px;
    border: none;
  }

  .el-upload-list--picture-card .el-upload-list__item-actions {
    border-radius: 50%;
    font-size: 16px;
  }

  .el-upload-list__item-thumbnail {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}

.hide-upload {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}

.right-card {
  width: 35%;
  height: 82vh;
}
</style>
