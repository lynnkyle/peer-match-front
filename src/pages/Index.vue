<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import type {UserType} from "../models/user";
import UserCardList from "../components/CardList/UserCardList.vue";
import FloatingPopover from "../components/FloatingPopover.vue";
import {recommendUser} from "../services/user.ts";

const userList: Ref<UserType[]> = ref([])
const loading = ref(true)
onMounted(async () => {
  loading.value = true
  const userListPage = await recommendUser()
  const userListData: UserType[] = userListPage.records
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags as unknown as string)
      }
    })
    userList.value = userListData
  }
  loading.value = false
})

//FloatingPopover
const popoverAction = [{index: 0, text: '用户匹配'}]

</script>
<template>
  <div id="index">
    <UserCardList :user-list="userList" :loading="loading"></UserCardList>
    <van-empty v-if="!userList || userList.length==0" description="数据为空"/>
    <FloatingPopover :popover-action="popoverAction"></FloatingPopover>
  </div>
</template>
<style scoped>

</style>