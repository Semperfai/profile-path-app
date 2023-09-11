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
            v-model:input="formData.name"
            inputType="text"
            :server-errors="serverErrors"
            @server-errors-state="handleServerErrorsState"
            :validation="v$.name" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Email: link@gmail.com"
            v-model:input="formData.email"
            inputType="email"
            :validation="v$.email"
            @server-errors-state="handleServerErrorsState"
            :server-errors="serverErrors" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="formData.password"
            inputType="password"
            :validation="v$.password"
            @server-errors-state="handleServerErrorsState"
            :server-errors="serverErrors" />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Confirm Password"
            v-model:input="formData.confirmPassword"
            inputType="password"
            @server-errors-state="handleServerErrorsState"
            :server-errors="serverErrors"
            :validation="v$.confirmPassword" />
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

      <div class="text-center pt-12 pb-8 text-xl">
        Already have an account?
        <NuxtLink to="/" class="text-[#8228D9] underline font-bold">
          Log in
        </NuxtLink>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import AuthLayout from '~/layouts/AuthLayout.vue'
import { useUserStore } from '~/stores/user/user.store'
import { mapUser } from '~/entities/user/lib/mapUser'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  sameAs,
  minLength,
  helpers
} from '@vuelidate/validators'

const supabase = useSupabaseClient()
const userStore = useUserStore()
const user = useSupabaseUser()
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('The name field is required', required),
      minLength: minLength(3)
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email)
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(6)
    },
    confirmPassword: {
      required: helpers.withMessage(
        'The password confirmation field is required',
        required
      ),
      sameAs: helpers.withMessage(
        "Passwords don't match",
        sameAs(formData.password)
      )
    }
  }
})

const v$ = useVuelidate(rules, formData)

const serverErrors = ref<string>('')

const submitDisabled = computed(() => {
  v$.value.$validate()
  return (
    !formData.name ||
    !formData.email ||
    !formData.email ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword ||
    v$.value.$error
  )
})

const submitButtonState = computed(() => {
  return {
    'bg-[#EFF0EB] text-[#A7AAA2]': submitDisabled.value,
    'bg-[#8228D9] hover:bg-[#6c21b3] text-white': !submitDisabled.value
  }
})

const handleServerErrorsState = () => {
  serverErrors.value = ''
}

const register = async () => {
  serverErrors.value = ''

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name
        }
      }
    })

    if (user) {
      await userStore.createUser(mapUser(user))
      navigateTo('/admin')
    }

    if (error) {
      serverErrors.value = error.message
      return
    }
  } catch (error) {
    console.log(error)
  }
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
