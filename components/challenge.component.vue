<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "Challenge",
  data() {
    return {
      id: null,
    }
  },
  computed: {
    token: {
      get() {
        return this.$store.getters['challenge.store/getToken'];
      },
      set(value: string) {
        this.$store.commit('challenge.store/setToken', value);
      }
    },
    action() {
      return this.$store.getters['challenge.store/getAction'];
    },
    siteKey() {
      return this.$store.getters['kod-mobi.store/getTurnstileSiteKey'];
    }
  },
  watch: {
    token(value, old) {
      if (!value) {
        this.reset();
      }
    },
    siteKey(value, old) {
      console.log(value)
      if (value) {
        this.reset();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (!this.siteKey) {
        return;
      }
      window.turnstile.ready(() => {
        this.id = window.turnstile.render('.cf-turnstile', {
          sitekey: this.siteKey,
          action: this.action,
          refreshExpired: this.reset,
          callback: (token: string) => this.token = token,
        });
      })
    },
    reset() {
      if (!this.siteKey) {
        return;
      }
      if (this.id) {
        window.turnstile.remove(this.id);
      }

      this.init();
    }
  }
})
</script>

<template>
  <div class="cf-turnstile"></div>
</template>
