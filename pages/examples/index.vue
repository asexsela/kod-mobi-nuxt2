<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full mt-4 gap-2">
    <NuxtLink to="/examples/auth" class="btn w-full">Авторизация</NuxtLink>
    <NuxtLink to="/examples/profile" class="btn w-full">Личный кабинет</NuxtLink>
  </div>
</template>
