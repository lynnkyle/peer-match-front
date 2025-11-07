<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import instance from "../plugins/axios.ts";
import {showToast} from "vant";

const router = useRouter()
const userLoginInfo = reactive({
  userAccount: "",
  userPassword: ""
})
const onSubmit = async () => {
  const res = await instance.post('/user/login', {
    'userAccount': userLoginInfo.userAccount,
    'userPassword': userLoginInfo.userPassword
  }).then((res) => {
    showToast(
        '登录成功'
    )
    router.replace("/")
    return res.data
  })
  console.log('res', res)
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userLoginInfo.userAccount"
          name="userAccount"
          label="用户账号"
          placeholder="请输入用户账号"
          :rules="[{ required: true, message: '请填写用户账号' }]"
      />
      <van-field
          v-model="userLoginInfo.userPassword"
          type="password"
          name="userPassword"
          label="用户密码"
          placeholder="请输入用户密码"
          :rules="[{ required: true, message: '请填写用户密码' }]"
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