<script lang="ts">
import Vue from 'vue'
import {AuthStep} from "~/common/enums/auth.enum";

export default Vue.extend({
  data() {
    return {
      step: AuthStep.CREATE_SESSION
    }
  },
  methods: {
    changeStep(step: AuthStep) {
      this.step = step;
    }
  }
})
</script>

<template>
  <div class="flex flex-col justify-start h-full w-full mt-4 p-4 rounded-2xl bg-base-200">

    <!--  phone  -->
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Session ID <span class="text-error">*</span></span>
        <span class="label-text-alt"></span>
      </label>
      <input type="text" placeholder="Номер телефона" class="input input-bordered w-full"/>
      <label class="label">
        <span class="label-text-alt">Идентификатор сессии</span>
        <span class="label-text-alt">Возвращается в запросе создания сессии</span>
      </label>
    </div>

  </div>
</template>

