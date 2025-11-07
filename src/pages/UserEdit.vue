<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import instance from "../plugins/axios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute()
const router = useRouter()
const editInfo = reactive({
  editLabel: route.query.editLabel,
  editKey: route.query.editKey,
  editValue: route.query.editValue
})

const onSubmit = async () => {
  const currentUser = await getCurrentUserState();
  if (!currentUser) {
    showFailToast("用户未登录")
    return
  }
  const res: any = await instance.post('/user/update', {
    'id': currentUser.id,
    [editInfo.editKey as string]: editInfo.editValue
  })
  if (res.code === 20000 && res.data > 0) {
    showSuccessToast("修改成功")
    router.back()
  } else {
    showFailToast("修改失败")
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editInfo.editValue"
          :name="editInfo.editKey"
          :label="editInfo.editLabel"
          placeholder="请输入"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>