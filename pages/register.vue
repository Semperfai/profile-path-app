<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Create your account
      </h1>

      <form class="mt-12" @submit.prevent="register()">
        <div>
          <TextInput
            placeholder="Username"
            v-model:input="name"
            inputType="text"
            :error="errors && errors.name ? errors.name[0] : ''" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Email: link@gmail.com"
            v-model:input="email"
            inputType="email"
            :error="errors && errors.email ? errors.email[0] : ''" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="password"
            inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Confirm Password"
            v-model:input="confirmPassword"
            inputType="password" />
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="rounded-full w-full p-3 font-bold transition-all duration-300 ease-linear"
            :disabled="submitDisabled"
            :class="submitButtonState">
            Create account
          </button>
        </div>
      </form>

      <div class="text-[14px] text-center pt-12">
        Already have an account?
        <NuxtLink to="/" class="text-[#8228D9] underline"> Log in </NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '~/layouts/AuthLayout.vue'

import { useUserStore } from '~/stores/user/user.store'
const userStore = useUserStore()

const router = useRouter()

const name = ref(null)
const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)
const errors = ref(null)

const submitDisabled = computed(() => {
  return (
    !name.value || !email.value || !password.value || !confirmPassword.value
  )
})

const submitButtonState = computed(() => {
  return {
    'bg-[#EFF0EB] text-[#A7AAA2]': submitDisabled.value,
    'bg-[#8228D9] hover:bg-[#6c21b3] text-white': !submitDisabled.value
  }
})

const register = async () => {
  errors.value = null
}
</script>
