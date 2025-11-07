<script setup lang="ts">
import type {UserType} from "../models/user";

interface UserCardListProps {
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: () => [] as UserType[],
})
</script>

<template>
  <van-card
      v-for="user in props.userList"
      :desc="user.profile"
      :title="user.userName"
      :thumb="user.avatarUrl"
  >
    <template #tag>
      <van-tag
          :color="user.gender === 1 ? '#1989fa' : '#ee0a24'"
          text-color="#fff">
        {{ user.gender === 1 ? '&#9794' : '&#9792' }}
      </van-tag>
    </template>
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin:5px 10px 0 0">
        {{ tag }}
      </van-tag>
    </template>
    <template #bottom>
      <van-button size="mini" style="float:right">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>