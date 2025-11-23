<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}
</script>

<template>
  <div id="team">
    <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        :gap="{ x: 10, y: 60 }"
        @click="doJoinTeam"
    />
  </div>
</template>

<style scoped>
</style>