<script setup lang="ts">
import 'vant/es/toast/style'
import {showToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()


const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push("/search")
}
const onChange = (index) => showToast(`标签 ${index}`)
</script>

<template>
  <van-nav-bar
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view></router-view>
  </div>
  <van-tabbar route @change="onChange">
    <van-tabbar-item icon="home-o" name="home" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>