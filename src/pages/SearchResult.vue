<script setup lang="ts">
import type {UserType} from "../models/user";
import {useRoute} from 'vue-router'
import {onMounted, type Ref, ref} from "vue";
import instance from "../plugins/axios.ts";
import qs from 'qs';
import UserCardList from "../components/CardList/UserCardList.vue";

const route = useRoute()
const {tags} = route.query
const userList: Ref<UserType[]> = ref([])
onMounted(async () => {
  const userListData: UserType[] = await instance.get('/user/search/tags',
      {
        params: {
          tagNameList: tags
        },
        paramsSerializer: params => {
          return qs.stringify(params, {indices: false})
        }
      }
  ).then(res => {
    console.log('succeed', res)
    return res.data
  }).catch(error => {
    console.log('failed', error)
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
  <user-card-list :user-list="userList"></user-card-list>
  <van-empty v-if="!userList || userList.length==0" description="无符合搜索条件用户"/>
  <div>

  </div>
</template>

<style scoped>

</style>