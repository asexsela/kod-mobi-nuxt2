<script lang="ts">
import {defineComponent} from "vue";
import GrommetIconsSettingsOption from "~/components/icons/setting.component.vue";
import GrommetIconsMenu from "~/components/icons/menu.component.vue";

/*
* @dev header component
* */
export default defineComponent({
  name: "Header",
  components: {
    GrommetIconsMenu,
    GrommetIconsSettingsOption,
  },
  computed: {
    missSettings() {
      const url: string = this.$store.getters['kod-mobi.store/getUrl'];
      const apiKey: string = this.$store.getters['kod-mobi.store/getApiKey'];

      return !url || !apiKey;
    }
  }
})
</script>

<template>
  <div class="navbar bg-base-200 sticky rounded-2xl">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <GrommetIconsMenu/>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
          <li><NuxtLink to="/playground">Playground</NuxtLink></li>
          <li><NuxtLink to="/encription">Шифрование</NuxtLink></li>
          <li><NuxtLink to="/examples">Пример</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <div class="normal-case text-xl">kod.mobi</div>
    </div>
    <div class="navbar-end">
      <NuxtLink to="/" class="btn btn-ghost btn-circle hover:animate-spin hover:bg-base-200">
        <GrommetIconsSettingsOption/>
      </NuxtLink>

      <div class="tooltip tooltip-left hover:tooltip-open" data-tip="Заполните все поля">
        <span v-if="missSettings" data-tooltip-target="tooltip-left" data-tooltip-placement="right"
              class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>
    </div>

  </div>
</template>
