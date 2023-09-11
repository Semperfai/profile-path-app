<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl sm:text-3xl text-2xl text-center font-extrabold">
        Log in to your Profile Path
      </h1>

      <form class="mt-12" @submit.prevent="($event) => login()">
        <div>
          <TextInput
            v-model:input="formData.email"
            inputType="email"
            placeholder="Email: link@gmail.com"
            :validation="v$.email"
            @server-errors-state="handleServerErrorsState"
            :server-errors="serverErrors" />
        </div>

        <div class="mt-4">
          <TextInput
            v-model:input="formData.password"
            inputType="password"
            placeholder="Password"
            :validation="v$.password"
            @server-errors-state="handleServerErrorsState"
            :server-errors="serverErrors" />
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="rounded-full w-full p-3 font-bold transition-all duration-300 ease-linear"
            :disabled="submitLogin"
            :class="
              formData.email && formData.password && !v$.$error
                ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                : 'bg-[#EFF0EB] text-[#A7AAA2]'
            ">
            Log in
          </button>
        </div>
      </form>

      <div class="text-xl text-center pt-12">
        Don't have an account?
        <NuxtLink to="/register" class="text-[#8228D9] underline font-bold">
          Sign up
        </NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useUserStore } from '~/stores/user/user.store'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minLength, email } from '@vuelidate/validators'

const userStore = useUserStore()

const formData = reactive({
  email: '',
  password: ''
})

const serverErrors = ref<string>('')

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email)
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

definePageMeta({
  middleware: 'is-logged-in'
})

const submitLogin = computed(() => {
  v$.value.$validate()
  return !formData.email || !formData.password || v$.value.$error
})

const login = async () => {
  serverErrors.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    //todo await userStore.getAllLinks() we need this? we can implement this in store?

    if (error) {
      serverErrors.value = error.message
      return
    }

    userStore.id = user.value.id

    await userStore.getUser()
  } catch (error) {
    console.log(error)
  }
}

const handleServerErrorsState = () => {
  serverErrors.value = ''
}

watch(
  user,
  () => {
    if (user.value) {
      userStore.id = user.value.id
      router.push('/admin')
    }
  },
  { immediate: true }
)
</script>
