<script setup lang="ts">
import type {UserType} from "../../models/user";

interface UserCardListProps {
  userList: UserType[];
  loading: boolean;
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: () => [] as UserType[],
  loading: () => true as boolean
})
</script>

<template>
  <div id="user-card-list">
    <van-skeleton title avatar :row="4" :loading="props.loading"  v-for="user in props.userList">
      <van-card
          :desc="user.profile"
          :title="user.userName"
          :thumb="user.avatarUrl">
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
          <van-button plain size="mini" type="primary" icon="phone" style="float:right">联系我</van-button>
        </template>
      </van-card>
    </van-skeleton>
  </div>
</template>
<style scoped>

</style>