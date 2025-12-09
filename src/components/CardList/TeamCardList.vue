<script setup lang="ts">

import type {TeamType} from "../../models/team";
import {teamStatusEnum} from "../../constants/team.ts";
import dayjs from "dayjs";
import instance from "../../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardList {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardList>(), {
  teamList: () => [] as TeamType[]
})

const router = useRouter()

const currentUser = ref({id: 0})

const doJoinTeam = async (teamId: number | undefined) => {
  if (teamId === undefined) {
    showFailToast("请求参数teamId为空")
    return undefined
  }
  const res = await instance.post('/team/join', {
    "teamId": teamId
  })
  if (res.code === 20000 && res.data) {
    showSuccessToast("成功加入队伍")
    console.log(res)
  } else {
    showFailToast(res?.description)
  }
}
const doUpdateTeam = async (id) => {
  router.push({
    path: '/team/update',
    query: {
      id: id
    }
  })
}

const doQuitTeam = async (teamId: number | undefined) => {
  if (teamId === undefined) {
    showFailToast("请求参数teamId为空")
    return undefined
  }
  const res = await instance.post('/team/quit', {
    "teamId": teamId
  })
  if (res.code === 20000 && res.data) {
    showSuccessToast("成功退出队伍")
    console.log(res)
  } else {
    showFailToast(res?.description)
  }
}

const doDeleteTeam = async (teamId: number | undefined) => {
  if (teamId === undefined) {
    showFailToast("请求参数teamId为空")
    return undefined
  }
  const res = await instance.post('/team/delete', {
    "id": teamId
  })
  if (res.code === 20000 && res.data) {
    showSuccessToast("成功解散队伍")
    console.log(res)
  } else {
    showFailToast(res?.description)
  }
}
// 钩子函数
onMounted(async () => {
  currentUser.value = await getCurrentUser()
})
</script>

<template>
  <div id="team-card-list">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="team.teamName"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
      <template #tag>
        <van-tag type="danger">
          {{ teamStatusEnum[team.teamStatus as number] }}
        </van-tag>
      </template>
      <template #tags>
        <van-tag plain type="primary" v-for="tag in team.tags" style="margin:5px 10px 0 0">
          {{ tag }}
        </van-tag>
      </template>
      <template #price>
        <div>
          {{ "最大人数:" + team.maxNum }}
        </div>
      </template>
      <template #bottom>
        <div>
          {{ "发布时间:" + dayjs(team.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div>
          {{ "过期时间:" + dayjs(team.expireTime).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div style="float:right">
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doJoinTeam(team.id)"
                      v-if="currentUser.id!==team.userId">
            加入队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doUpdateTeam(team.id)"
                      v-if="currentUser.id===team.userId">
            更新队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doQuitTeam(team.id)"
          >
            退出队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doDeleteTeam(team.id)"
                      v-if="currentUser.id===team.userId">
            解散队伍
          </van-button>
        </div>
      </template>
    </van-card>
  </div>
</template>

<style scoped>

</style>