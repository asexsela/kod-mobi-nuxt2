<script lang="ts">

export default {
  name: "Response",
  props: ['data']
}
</script>

<template>
  <div class="bg-base-100 p-2 rounded-md w-full">
    <vue-json-pretty
      :data="data"
      :deep="2"
      :showLength="true"
      :showLine="false"
      :showLineNumber="true"
      :showIcon="true"
    ></vue-json-pretty>
  </div>
</template>
