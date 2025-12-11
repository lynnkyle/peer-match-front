<script setup lang="ts">
import {computed, ref} from "vue";
import type {FieldType} from "vant";

interface InputDialogProps {
  show: boolean,
  title: string,
  type: FieldType,
  label: string,
  text: string
}

const props = withDefaults(defineProps<InputDialogProps>(), {
  show: false,
  title: "确认框",
  type: "text",
  label: "文本",
  text: ""
});

const text = computed(() => {
  return props.text
})

const emit = defineEmits<{
  (e: "confirm"): void,
  (e: "cancel"): void,
  (e: 'update:text', value: string): void
}>()
const doConfirm = () => {
  emit("confirm")
}
const doCancel = () => {
  emit("cancel")
}

</script>

<template>
  <van-dialog :show="props.show" :title="props.title" show-cancel-button @confirm="doConfirm" @cancel="doCancel">
    <van-field :type="props.type" :label="props.label" v-model="text" placeholder="请输入队伍密码" size="large"
               @update:model-value="(v) => emit('update:text', v)">

    </van-field>
  </van-dialog>
</template>

<style scoped>

</style>