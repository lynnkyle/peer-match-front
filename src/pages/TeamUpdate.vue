<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import instance from "../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import type {TeamType} from "../models/team";
import {
  extractDateTimeField,
  formatDate,
  modifyDate,
  formatTime,
  modifyTime,
  datePickerMinMax
} from "../utils/utils.ts";

const route = useRoute()
const router = useRouter()
// 表单数据
const updateTeamData = ref<TeamType>({})

// 日期时间选择器
// 日期选择器
const showDatePicker = ref(false)
const currentDatePicker = ref<string[]>([])
const currentDate = computed(() => {
  return formatDate(updateTeamData.value.expireTime)
})
const dateConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = modifyDate(updateTeamData.value.expireTime, selectedValues)
  showDatePicker.value = false
}
const dateCancel = () => {
  showDatePicker.value = false
}
// 时间选择器
const showTimePicker = ref(false)
const currentTimePicker = ref<string[]>([])
const currentTime = computed(() => {
  return formatTime(updateTeamData.value.expireTime)
})
const timeConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = modifyTime(updateTeamData.value.expireTime, selectedValues)
  showTimePicker.value = false
}
const timeCancel = () => {
  showTimePicker.value = false
}
// 表单请求
const onSubmit = async () => {
  const postData = {
    ...updateTeamData,
    teamStatus: Number(updateTeamData.value.teamStatus)
  }
  // todo 前端参数校验
  const res = await instance.post('/team/update', postData)
  if (res?.code === 20000 && res.data) {
    showSuccessToast("更新成功")
    router.push({
      path: '/team',
      replace: true
    })
  } else {
    showFailToast(res?.description)
  }
}

// 钩子函数
onMounted(async () => {
  const id = route.query.id
  if (id < 0) {
    showFailToast("加载队伍失败")
  }
  const res = await instance.get('/team/get', {
    params: {
      id: id
    }
  })
  if (res.code === 20000 && res.data) {
    showSuccessToast("成功获取队伍")
  } else {
    showFailToast(res?.description)
  }
  updateTeamData.value = {...res.data, teamStatus: res.data.teamStatus.toString()}
  const {year, month, day, hour, minute, second} = extractDateTimeField(updateTeamData.value.expireTime)
  currentDatePicker.value = [year, month, day]
  currentTimePicker.value = [hour, minute, second]
})
computed(() => {
})
</script>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="updateTeamData.teamName"
          label="队伍名称"
          placeholder="请输入队伍名称"
          required
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="updateTeamData.description"
          rows="3"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />
      <van-field
          v-model="currentDate"
          is-link
          readonly
          name="datePicker"
          label="日期选择"
          placeholder="点击选择"
          required
          :rules="[{ required: true, message: '请选择日期' }]"
          @click="showDatePicker = true"
      />
      <van-popup v-model:show="showDatePicker" position="bottom">
        <van-date-picker
            title="选择日期"
            v-model="currentDatePicker"
            :columns-type="['year', 'month', 'day']"
            :min-date="datePickerMinMax().min"
            :max-date="datePickerMinMax().max"
            @confirm="dateConfirm"
            @cancel="dateCancel"
        />
      </van-popup>
      <van-field
          v-model="currentTime"
          is-link
          readonly
          name="datePicker"
          label="时间选择"
          placeholder="点击选择"
          required
          :rules="[{ required: true, message: '请选择日期' }]"
          @click="showTimePicker = true"
      />
      <van-popup v-model:show="showTimePicker" position="bottom">
        <van-time-picker
            title="选择日期"
            v-model="currentTimePicker"
            :columns-type="['hour', 'minute', 'second']"
            @confirm="timeConfirm"
            @cancel="timeCancel"
        />
      </van-popup>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="updateTeamData.teamStatus" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="updateTeamData.teamStatus==2"
          type="password"
          v-model="updateTeamData.password"
          label="队伍密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        修改队伍
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>