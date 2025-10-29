<script setup lang="ts">
import {ref} from "vue"

// van-tree-select
const activeIds = ref([]);
const activeIndex = ref(0);
const originTagsList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '无', id: '无', disabled: true},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '高三', id: '高三'},
      {text: '大三', id: '大三'},
      {text: '初三', id: '初三'},
      {text: '初三', id: '初三a'},
      {text: '初三', id: '初三b'},
      {text: '初三', id: '初三c'},
    ],
  }
];
const tagsList = ref(originTagsList)
// van-search
const searchText = ref('')
const onSearch = (val) => {
  tagsList.value = originTagsList.map((parentTag, index) => {
    const copyTagsList = {...parentTag}
    copyTagsList.children = parentTag.children.filter(item => {
      if (item.text.includes(val)) {
        activeIndex.value = index
        return true
      }
      return false
    })
    return copyTagsList
  })
}
const onCancel = () => {
  activeIds.value = []
  tagsList.value = originTagsList
}
// van-tag
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => item !== tag)
}
</script>

<template>
  <van-search
      v-model="searchText"
      placeholder="请输入要搜索的标签"
      wrap-with-form
      show-action
      @search="onSearch"
      @cancel="onCancel"
  />
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <van-row gutter="20">
    <van-col v-for="tag in activeIds" style="padding: 10px">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagsList"
  />
</template>
<style scoped>

</style>