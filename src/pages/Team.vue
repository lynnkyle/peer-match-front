<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/CardList/TeamCardList.vue";
import {onMounted, type Ref, ref} from "vue";
import type {TeamType} from "../models/team";
import {listAllTeams} from "../services/team.ts";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const allTeamList: Ref<TeamType[]> = ref([])

const searchText = ref('')
const onSearch = async (val) => {
  allTeamList.value = await listAllTeams('searchText', val)
}

// 钩子函数
onMounted(async () => {
  allTeamList.value = await listAllTeams()
})
</script>

<template>
  <div id="team">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <TeamCardList :team-list="allTeamList"></TeamCardList>
    <van-empty v-if="!allTeamList || allTeamList.length==0" description="数据为空"/>
    <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        :gap="{ x: 10, y: 60 }"
        @click="doJoinTeam"
    />
  </div>
</template>

<style scoped>
</style>