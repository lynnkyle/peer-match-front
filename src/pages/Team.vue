<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/CardList/TeamCardList.vue";
import {onMounted, type Ref, ref} from "vue";
import type {TeamType} from "../models/team";
import {listAllTeams} from "../services/team.ts";

const router = useRouter()
const doAddTeam = () => {
  router.push({
    path: '/team/add'
  })
}

// 搜索栏
const allTeamList: Ref<TeamType[]> = ref([])
const searchText = ref('')
const onSearch = async (val) => {
  allTeamList.value = await listAllTeams({'searchText': val})
}
// 标签栏
const activeName = ref("public")
const doTabChange = async (name="public") => {
  if (name === "public") {
    allTeamList.value = await listAllTeams({'teamStatus': 0})
  } else if (name === "secret") {
    allTeamList.value = await listAllTeams({'teamStatus': 2})
  }
}

// 钩子函数
onMounted(async () => {
  doTabChange()
})
</script>

<template>
  <div id="team">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="activeName" @change="doTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <TeamCardList :team-list="allTeamList"></TeamCardList>
    <van-empty v-if="!allTeamList || allTeamList.length==0" description="数据为空"/>
    <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        :gap="{ x: 10, y: 60 }"
        @click="doAddTeam"
    />
  </div>
</template>

<style scoped>
</style>