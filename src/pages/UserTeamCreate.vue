<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, type Ref, ref} from "vue";
import type {TeamType} from "../models/team";
import {listCurrentUserCreateTeams} from "../services/team.ts";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}

const teamList: Ref<TeamType[]> = ref([])
const searchText = ref('')


const onSearch = async (val) => {
  teamList.value = await listCurrentUserCreateTeams('searchText', val)
}

// 钩子函数
onMounted(async () => {
  teamList.value = await listCurrentUserCreateTeams()
})
</script>

<template>
  <div id="team">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <TeamCardList :team-list="teamList"></TeamCardList>
    <van-empty v-if="!teamList || teamList.length==0" description="数据为空"/>
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