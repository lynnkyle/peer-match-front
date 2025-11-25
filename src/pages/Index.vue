<script setup lang="ts">
import {onMounted, ref, type Ref} from "vue";
import type {UserType} from "../models/user";
import instance from "../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const userList: Ref<UserType[]> = ref([])
onMounted(async () => {
  const userListData: UserType[] = await instance.get('/user/recommend',
      {
        params: {
          pageNum: 1,
          pageSize: 8
        },
      }
  ).then(res => {
    console.log('/user/recommend succeed', res)
    return res.data.records
  }).catch(error => {
    console.log('/user/recommend failed', error)
    showFailToast("请求失败")
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags as unknown as string)
      }
    })
    userList.value = userListData
  }
})
</script>
<template>
  <div id="index">
    <UserCardList :user-list="userList"></UserCardList>
    <van-empty v-if="!userList || userList.length==0" description="数据为空"/>
  </div>
</template>
<style scoped>

</style>