<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: 'auth',
  computed: {
    phone() {
      return this.$store.getters['auth.store/getPhone']
    }
  }
})
</script>

<template>
  <div class="flex flex-col justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">

    <p class="text-center">{{ phone }}</p>
  </div>
</template>
