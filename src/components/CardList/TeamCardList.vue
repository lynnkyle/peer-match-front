<script setup lang="ts">
import type {TeamType} from "../../models/team";
import {teamStatusEnum} from "../../constants/team.ts";
import dayjs from "dayjs";
import instance from "../../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../../services/user.ts";
import {useRouter} from "vue-router";
import InputDialog from "../InputDialog.vue";
import {joinTeam} from "../../services/team.ts";

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: () => [] as TeamType[]
})

const router = useRouter()

const currentUser = ref({id: 0})

const doJoinTeam = async (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.teamStatus === 0) {
    const data = await joinTeam({"teamId": joinTeamId.value})
    if (data) {
      showSuccessToast("加入队伍成功")
    }
  } else if (team.teamStatus === 2) {
    show.value = true
  }

}
const doUpdateTeam = async (teamId: number | undefined) => {
  router.push({
    path: '/team/update',
    query: {
      id: teamId
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

// InputDialog
const show = ref(false)
const password = ref('')
const joinTeamId = ref()
const doConfirm = async () => {
  const param = {
    "teamId": joinTeamId.value,
    "password": password.value
  }
  const data = await joinTeam(param)
  if (data) {
    showSuccessToast("成功加入队伍")
    show.value = false
    joinTeamId.value = ''
  }
  password.value = ''
}
const doCancel = () => {
  show.value = false
  password.value = ''
  joinTeamId.value = ''
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
          {{ "队伍人数: " + team?.members?.length + " / " + team.maxNum }}
        </div>
      </template>
      <template #bottom>
        <div>
          {{ "发布时间: " + dayjs(team.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div>
          {{ "过期时间: " + dayjs(team.expireTime).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <div style="float:right">
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doJoinTeam(team)"
                      v-if="!team.hasJoin">
            加入队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doUpdateTeam(team.id)"
                      v-if="currentUser?.id===team.userId">
            更新队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doQuitTeam(team.id)"
                      v-if="currentUser?.id!==team.userId&&team.hasJoin"
          >
            退出队伍
          </van-button>
          <van-button size="mini" icon="plus"
                      color="linear-gradient(to right, #ff6034, #ee0a24)"
                      @click="doDeleteTeam(team.id)"
                      v-if="currentUser?.id===team.userId">
            解散队伍
          </van-button>
        </div>
      </template>
    </van-card>
    <InputDialog :show="show" v-model:text="password" title="队伍密码" type="password" label="密码:"
                 @confirm="doConfirm" @cancel="doCancel"></InputDialog>
  </div>
</template>

<style scoped>

</style>