<script setup lang="ts">
import {useRoute} from 'vue-router'
import {ref} from "vue";

const route = useRoute()
const tags = route.query.tags
const mockUser = {
  id: 1,
  userName: "LinZeyuan",
  userAccount: "LinZeyuan",
  avatarUrl: "https://www.codefather.cn/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75",
  gender: 0,
  phone: "13788809958",
  email: "903586678@qq.com",
  code: "123456",
  profile: "精神小伙",
  tags: ["java", "python", "牛马"],
  createTime: new Date()
}
const userList = ref([mockUser, mockUser, mockUser])
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
          text-color="#fff" >
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
</template>

<style scoped>

</style>