<template>
    <div class="flex flex-col items-center justify-center h-96 w-full mt-4 p-4 rounded-2xl bg-base-200">
      <TablerError404 class-name="w-36 text-accent" />
      <p>Oops! Page not found...</p>
    </div>
</template>

<script>
import TablerError404 from "~/components/icons/not-found.component.vue";

export default {
  components: {TablerError404},
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
