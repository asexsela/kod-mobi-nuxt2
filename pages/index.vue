<script lang="ts">
import Vue from 'vue'
import GrommetIconsCircleInformation from "~/components/icons/info.component.vue";

export default Vue.extend({
  components: {GrommetIconsCircleInformation},
  computed: {
    missApiUrl() {
      return !this.$store.getters['kod-mobi.store/getUrl'];
    },
    missApiKey() {
      return !this.$store.getters['kod-mobi.store/getApiKey'];
    },
    url: {
      get() {
        return this.$store.getters['kod-mobi.store/getUrl'];
      },
      set(value: string) {
        if (value.endsWith('/')) {
          value = value.slice(0, -1);
        }
        this.$store.commit('kod-mobi.store/setUrl', value);
      }
    },
    apiKey: {
      get() {
        return this.$store.getters['kod-mobi.store/getApiKey'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setApiKey', value);
      }
    },
    secretKey: {
      get() {
        return this.$store.getters['kod-mobi.store/getSecretKey'];
      },
      set(value: string) {
        this.$store.commit('kod-mobi.store/setSecretKey', value);
      }
    }
  },
});
</script>

<template>
    <div class="flex flex-col items-center justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">
      <h1 class="text-2xl">Настройки</h1>

      <div class="alert alert-info my-6">
        <GrommetIconsCircleInformation />
        <span>Для выполнения запросов нужно заполнить поля со звездочкой!</span>
      </div>

      <!--  URL  -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">API URL <span class="text-error">*</span></span>
          <span class="label-text-alt">
            <span class="tooltip tooltip-left hover:tooltip-open" data-tip="Заполните это поле">
              <span v-if="missApiUrl" data-tooltip-target="tooltip-left" data-tooltip-placement="right"
                    class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          </span>
        </label>
        <input v-model="url" type="text" placeholder="https://xxxxxxx.com" class="input input-bordered w-full" />
        <label class="label">
          <span class="label-text-alt">kod.mobi API URL</span>
          <span class="label-text-alt">по умолчанию: https://api.kod.mobi/v1</span>
        </label>
      </div>

      <!--   API Key   -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">API Key <span class="text-error">*</span></span>
          <span class="label-text-alt">
            <span class="tooltip tooltip-left hover:tooltip-open" data-tip="Заполните это поле">
              <span v-if="missApiKey" data-tooltip-target="tooltip-left" data-tooltip-placement="right"
                    class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </span>
          </span>
        </label>
        <input v-model="apiKey" type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" class="input input-bordered w-full" />
        <label class="label">
          <span class="label-text-alt">kod.mobi API Key</span>
          <span class="label-text-alt"></span>
        </label>
      </div>

      <!--   Secret Key   -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Secret Key</span>
          <span class="label-text-alt"></span>
        </label>
        <input v-model="secretKey" type="password" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" class="input input-bordered w-full" />
        <label class="label">
          <span class="label-text-alt">kod.mobi Secret Key</span>
          <span class="label-text-alt"></span>
        </label>
      </div>


      <div class="mt-4">
        <NuxtLink to="/playground" class="btn btn-accent" >
          Playground
        </NuxtLink>
      </div>


    </div>
</template>
