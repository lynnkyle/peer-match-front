<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import instance from "../plugins/axios.ts";
import {showToast} from "vant";

const route = useRoute()
const router = useRouter()
const userLoginInfo = reactive({
  userAccount: "",
  userPassword: ""
})
const onSubmit = async () => {
  await instance.post('/user/login', {
    'userAccount': userLoginInfo.userAccount,
    'userPassword': userLoginInfo.userPassword
  }).then((res) => {
    showToast(
        '登录成功'
    )
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  })
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