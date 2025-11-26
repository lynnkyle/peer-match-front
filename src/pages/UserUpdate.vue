<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {formatDateTime} from "../utils/utils.ts";

const user = ref()

onMounted(async () => {
  user.value = await getCurrentUser()
})
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
  <div v-if="user">
    <van-cell title="昵称" is-link :value="user.userName" @click="toEdit('昵称','userName',user.userName)"/>
    <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('账号','userAccount',user.userAccount)"/>
    <van-cell title="头像" is-link @click="toEdit('头像','gender',user.avatarUrl)">
      <img :src="user.avatarUrl" alt="" style="height: 48px"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('性别','gender',user.gender)"/>
    <van-cell title="手机号码" is-link :value="user.phone" @click="toEdit('手机号码','phone',user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('邮箱','email',user.email)"/>
    <van-cell title="星球编号" :value="user.code"/>
    <van-cell title="注册时间" :value="formatDateTime(user.createTime)"/>
  </div>
  <van-empty v-else description="数据为空"/>
</template>

<style scoped>

</style>