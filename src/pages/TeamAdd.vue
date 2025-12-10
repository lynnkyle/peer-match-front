<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import instance from "../plugins/axios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {formatDate, modifyDate, datePickerMinMax, formatTime, modifyTime} from "../utils/utils.ts";

const router = useRouter()

// 表单数据
const initFormData = {
  "teamName": "",
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "password": "",
  "teamStatus": "0",
  "userId": 0
}
const addTeamData = ref({...initFormData})

// 日期时间选择器
// 日期选择器
const showDatePicker = ref(false);
const currentDate = computed(() => {
  return formatDate(addTeamData.value.expireTime)
})
const currentDatePicker = ref()
const dateConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = modifyDate(addTeamData.value.expireTime, selectedValues)
  showDatePicker.value = false
}
// 时间选择器
const showTimePicker = ref(false);
const currentTime = computed(() => {
  return formatTime(addTeamData.value.expireTime)
})
const currentTimePicker = ref()
const timeConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = modifyTime(addTeamData.value.expireTime, selectedValues)
  showTimePicker.value = false
}
// 表单请求
const onSubmit = async () => {
  const postData = {
    ...addTeamData,
    teamStatus: Number(addTeamData.value.teamStatus)
  }
  // todo 前端参数校验
  const res = await instance.post('/team/add', postData)
  if (res?.code === 20000 && res.data) {
    showSuccessToast("创建成功")
    router.push({
      path: '/team',
      replace: true
    })
  } else {
    showFailToast(res?.description)
  }
}
</script>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.teamName"
          label="队伍名称"
          placeholder="请输入队伍名称"
          required
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="addTeamData.description"
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
            :min-date="datePickerMinMax().min"
            :max-date="datePickerMinMax().max"
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
      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" min="3" max="10"/>
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="addTeamData.teamStatus==2"
          type="password"
          v-model="addTeamData.password"
          label="队伍密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>