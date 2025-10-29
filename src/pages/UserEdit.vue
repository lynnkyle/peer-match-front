<script setup lang="ts">
import {useRoute} from "vue-router";
import {reactive} from "vue";

const route = useRoute()
const editInfo = reactive({
  editLabel: route.query.editLabel,
  editKey: route.query.editKey,
  editValue: route.query.editValue
})
const onSubmit = (values) => {
  console.log('submit', values);
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