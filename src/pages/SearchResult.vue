<script setup lang="ts">
import type {UserType} from "../models/user";
import {useRoute} from 'vue-router'
import {onMounted, type Ref, ref} from "vue";
import instance from "../plugins/axios.ts";
import qs from 'qs';

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
    return res.data?.data
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
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.userName"
      :thumb="user.avatarUrl"
  >
    <template #tag>
      <van-tag
          :color="user.gender === 1 ? '#1989fa' : '#ee0a24'"
          text-color="#fff">
        {{ user.gender === 1 ? '&#9794' : '&#9792' }}
      </van-tag>
    </template>
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin:5px 10px 0 0">
        {{ tag }}
      </van-tag>
    </template>
    <template #bottom>
      <van-button size="mini" style="float:right">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length==0" description="无符合搜索条件用户"/>
  <div>

  </div>
</template>

<style scoped>

</style>