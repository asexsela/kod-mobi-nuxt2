<script lang="ts">
import Vue from 'vue'
import Response from "~/components/response.component.vue";
import GrommetIconsLinkNext from "~/components/icons/next-link.component.vue";
import GrommetIconsLinkPrevious from "~/components/icons/prev-link.component.vue";
import Endpoint from "~/components/endpoint.component.vue";

export default Vue.extend({
  components: {Endpoint, GrommetIconsLinkPrevious, GrommetIconsLinkNext, Response},
  // methods: {
  //   encryptCode() {
  //     this.$kodmobi
  //       .init()
  //       .encryptCode(
  //       '0000',
  //       'aes-256-cbc'
  //     )
  //   }
  // }
})
</script>

<template>
  <div class="flex flex-col justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">
    <h1 class="text-2xl text-center mb-4">Шифрование своего кода</h1>
    <p class="my-2">Если вы создаете коды на своей стороне, вы можете отправлять их в зашифрованном виде, используя два этих алгоритма:</p>
    <ol class="list-disc ml-4 p-2">
      <li>aes-256-cbc</li>
      <li>camellia-128-cbc</li>
    </ol>
    <p class="my-2">Шифрование выполняется <b class="text-accent">Secret Key</b>, поэтому выполнять его нужно на серверной стороне.</p>
    <p class="my-2">Зашифрованный код можно отправить только в методе <NuxtLink to="/playground/create-session" class="text-accent font-bold link">создании сессии</NuxtLink>.</p>
    <p class="my-2">Пример: <b class="text-xs break-words text-accent"><span class="text-primary">aes_256_cbc_</span><span class="text-secondary">NGw0SEdDd1U4b3ZNRHNEYzJJdGMzZz09OjoQebppjnZOgniYva8rYDX8</span></b></p>
    <p class="my-2">
      <span class="text-primary text-xs">aes_256_cbc_</span>(префикс)
      - название алгоритма с заменой символа <span class="text-accent">"-"</span> на <span class="text-accent">"_"</span> и в конце добавлен символ <span class="text-accent">"_"</span>
    </p>
    <p class="my-2">
      <span class="text-secondary text-xs">NGw0SEdDd1U4b3ZNRHNEYzJJdGMzZz09OjoQebppjnZOgniYva8rYDX8</span>
      - зашифрованное сообщение
    </p>
  </div>
</template>
