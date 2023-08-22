<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl sm:text-3xl text-2xl text-center font-extrabold">
        Log in to your Profile Path
      </h1>

      <form class="mt-12" @submit.prevent="($event) => login()">
        <div>
          <TextInput
            v-model:input="email"
            :error="errors && errors.email ? errors.email[0] : null"
            placeholder="Email: link@gmail.com"
            inputType="email" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''" />
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="rounded-full w-full p-3 font-bold transition-all duration-300 ease-linear"
            :disabled="!email || !password"
            :class="
              email && password
                ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                : 'bg-[#EFF0EB] text-[#A7AAA2]'
            ">
            Log in
          </button>
        </div>
      </form>

      <div class="text-[14px] text-center pt-12">
        Don't have an account?
        <NuxtLink to="/register" class="text-[#8228D9] underline">
          Sign up
        </NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'

import { useUserStore } from '~/stores/user/user'
const userStore = useUserStore()

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const errors = ref(null)

const login = async () => {
  errors.value = null
  console.log('login')
}
</script>
