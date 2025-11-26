<script setup lang="ts">

import {getCurrentUser} from "../services/user.ts";
import {ref, onMounted} from "vue";

const currentUser = ref()
onMounted(async () => {
  currentUser.value = await getCurrentUser()
})
</script>

<template>
  <van-cell title="个人信息页" :value="currentUser?.userName" is-link to="/user/update"/>
  <van-cell title="创建的队伍" is-link to="/user/team/create"/>
  <van-cell title="加入的队伍" is-link to="/user/team/join"/>
</template>

<style scoped>

</style>