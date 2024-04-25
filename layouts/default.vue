<script setup lang="ts">
import Header from "~/components/header.component.vue";
import Challenge from "~/components/challenge.component.vue";
</script>

<template>
  <div class="card max-w-screen-sm mx-auto min-h-screen p-2">
    <Header/>
    <Nuxt/>
    <Challenge />
  </div>
</template>
