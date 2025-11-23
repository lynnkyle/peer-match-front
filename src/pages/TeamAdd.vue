<script setup lang="ts">
import {reactive, ref} from "vue";

const initFormData = {
  "teamName": "",
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "password": "",
  "teamStatus": 0,
  "userId": 0
}
const addTeamData = reactive({...initFormData})

// 日期时间选择器
let date = new Date()
addTeamData.expireTime = date.toJSON()
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
// 日期选择器
const showDatePicker = ref(false);
const currentDate = ref()
const currentDatePicker = ref([year.toString(), month.toString(), day.toString()])
const minDate = new Date(year, month, day);
const maxDate = new Date(year + 3, month, day);
const dateConfirm = ({selectedValues}) => {
  currentDate.value = selectedValues.join('-')
  showDatePicker.value = false
  date.setFullYear(selectedValues[0])
  date.setMonth(selectedValues[1])
  date.setDate(selectedValues[2])
  console.log(date)
  addTeamData.expireTime = date.toJSON()
  console.log(addTeamData)
}
// 时间选择器
const showTimePicker = ref(false);
const currentTime = ref()
const currentTimePicker = ref([hour.toString(), minute.toString(), second.toString()])
const timeConfirm = ({selectedValues}) => {
  currentTime.value = selectedValues.join(':')
  showTimePicker.value = false
  date.setHours(selectedValues[0])
  date.setMinutes(selectedValues[1])
  date.setSeconds(selectedValues[2])
  addTeamData.expireTime = date.toJSON()
  console.log(addTeamData)
}
</script>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.teamName"
          label="队伍名称"
          placeholder="请输入队伍名称"
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