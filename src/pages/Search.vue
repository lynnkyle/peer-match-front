<script setup lang="ts">
import {ref} from "vue";
import {showToast} from "vant";

const value = ref('');
const onSearch = (val: any) => showToast(`搜索：${val || '无'}`);
const onCancel = () => showToast('取消');
</script>

<template>
  <van-search
      v-model="value"
      placeholder="请输入要搜索的标签"
      wrap-with-form
      show-action
      @search="onSearch"
      @cancel="onCancel"
  />
</template>

<style scoped>

</style>