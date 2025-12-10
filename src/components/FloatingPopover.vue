<script setup lang="ts">
import {ref} from "vue";
import {type PopoverAction} from "vant";
import UserCardList from "./CardList/UserCardList.vue";
import {matchUser} from "../services/user.ts";
import type {UserType} from "../models/user";


//props
interface Props {
  popoverAction: PopoverAction[]
}

const props = withDefaults(defineProps<Props>(), {
  popoverAction: () => [] as PopoverAction[],
})

const loading = ref(false)

//van-floating-bubble
const doOffSetChange = (offset) => {
  const viewportWidth = window.innerWidth;
  const horizonCenter = viewportWidth / 2;
  const x = offset.x
  if (x > horizonCenter) {
    placement.value = 'left'
  } else {
    placement.value = 'right'
  }
}

//van-overlay
const show = ref(false);
const matchUserList = ref<UserType[]>([])

//van-popover
const showPopover = ref(false);
const placement = ref('left');

const doSelect = async (action) => {
  loading.value = true
  if (action.index === 0) {
    show.value = true
    const userListData: UserType[] = await matchUser()
    if (userListData) {
      userListData.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags as unknown as string)
        }
      })
      matchUserList.value = userListData
    }
  }
  loading.value = false
}

</script>

<template>
  <div id="floating-popover">
    <van-floating-bubble
        axis="xy"
        icon="user-o"
        magnetic="x"
        :gap="{ x: 10, y: 60 }"
        @offset-change="doOffSetChange">
      <van-popover v-model:show="showPopover" :actions="props.popoverAction" :placement="placement" @select="doSelect">
        <template #reference>
          <div style="width: 48px;height: 48px;display: flex;align-items: center;justify-content: center;">
            <van-icon name="user-o" size="28"/>
          </div>
        </template>
      </van-popover>
    </van-floating-bubble>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <UserCardList :user-list="matchUserList" :loading="loading"></UserCardList>
      </div>
    </van-overlay>
  </div>
</template>

<style scoped>

</style>