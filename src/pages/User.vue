<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  userName: "LinZeyuan",
  userAccount: "LinZeyuan",
  avatarUrl: "https://www.codefather.cn/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75",
  gender: 1,
  phone: "13788809958",
  email: "903586678@qq.com",
  code: "123456",
  tags: ["java", "python"],
  createTime: new Date()
}
const router = useRouter()
const toEdit = (editLabel, editKey, editValue) => {
  router.push({
    path: "/user/edit",
    query: {
      editLabel,
      editKey,
      editValue
    }
  })
}
</script>

<template>
  <van-cell title="昵称" is-link :value="user.userName" @click="toEdit('昵称','gender',user.userName)"/>
  <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('账号','gender',user.userAccount)"/>
  <van-cell title="头像" is-link @click="toEdit('头像','gender',user.avatarUrl)">
    <img :src="user.avatarUrl" alt="" style="height: 48px"/>
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender" @click="toEdit('性别','gender',user.gender)"/>
  <van-cell title="手机号码" is-link :value="user.phone" @click="toEdit('手机号码','gender',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('邮箱','gender',user.email)"/>
  <van-cell title="星球编号" :value="user.code"/>
  <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
</template>

<style scoped>

</style>