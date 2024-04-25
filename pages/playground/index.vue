<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full mt-4 gap-2">
    <NuxtLink to="/playground/create-session" class="btn w-full">Создание сессии</NuxtLink>
    <NuxtLink to="/playground/send-code" class="btn w-full">Отправка кода</NuxtLink>
    <NuxtLink to="/playground/check-code" class="btn w-full">Проверка кода</NuxtLink>
    <NuxtLink to="/playground/verify-token" class="btn w-full">Проверка токена</NuxtLink>
  </div>
</template>
