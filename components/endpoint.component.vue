<script lang="ts">
import Vue from 'vue'
import {RestMethod} from "~/common/enums/rest.enum";

export default Vue.extend({
  name: "Endpoint",
  props: ['method', 'path'],
  computed: {
    getMethodColour() {
      switch (this.method) {
        case RestMethod.POST:
          return 'text-amber-500';
        case RestMethod.GET:
          return 'text-success';
        default:
          return '';
      }
    },
    apiUrl() {
      return this.$store.getters['kod-mobi.store/getUrl'];
    }
  }
})
</script>

<template>
  <div class="my-6 p-2 bg-base-100 rounded-md">
    <span :class="`font-extrabold ${getMethodColour}`">{{ method }}</span>
    <span>{{ apiUrl }}{{ path }}</span>
  </div>
</template>

