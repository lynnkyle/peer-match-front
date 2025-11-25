<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import instance from "../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";
import type {TeamType} from "../models/team";
import dayjs from "dayjs";

const route = useRoute()
const router = useRouter()
// 表单数据
const updateTeamData = ref<TeamType>({})

// 日期时间选择器
let date = new Date()
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
// 日期选择器
const showDatePicker = ref(false);
// const currentDate = ref()
const currentDate = computed({
  get() {
    return dayjs(updateTeamData.value.expireTime).format("YYYY-MM-DD")
  },
  set(val) {
    console.log("val", val)
    const [year, month, day] = val.split('-').map(Number)
    const now = dayjs(updateTeamData.value.expireTime).year(year).month(month).date(day)
    updateTeamData.value.expireTime = now.toISOString()
  }
})
const currentDatePicker = ref([year.toString(), month.toString(), day.toString()])
const minDate = new Date(year, month, day);
const maxDate = new Date(year + 3, month, day);
const dateConfirm = ({selectedValues}) => {
  console.log("select", selectedValues)
  let [year, month, day] = selectedValues.map(Number)
  date.setFullYear(year)
  date.setMonth(month)
  date.setDate(day)
  console.log("date:", date)
  showDatePicker.value = false
  updateTeamData.value.expireTime = date.toString()
}
// 时间选择器
const showTimePicker = ref(false);
// const currentTime = ref()
const currentTimePicker = ref([hour.toString(), minute.toString(), second.toString()])
const timeConfirm = ({selectedValues}) => {
  currentTime.value = selectedValues.join(':')
  showTimePicker.value = false
  date.setHours(selectedValues[0])
  date.setMinutes(selectedValues[1])
  date.setSeconds(selectedValues[2])
  updateTeamData.value.expireTime = date.toJSON()
  console.log(updateTeamData)
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
    console.log(res)
  } else {
    showFailToast(res?.description)
  }
  updateTeamData.value = {...res.data, teamStatus: res.data.teamStatus.toString()}
  console.log(updateTeamData.value)
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
            :min-date="minDate"
            :max-date="maxDate"
            :columns-type="['year', 'month', 'day']"
            @confirm="dateConfirm"
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