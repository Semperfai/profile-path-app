<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl sm:text-3xl text-2xl text-center font-extrabold">
        Log in to your Profile Path
      </h1>

      <form class="mt-12">
        <div>
          <TextInput placeholder="Email: link@gmail.com" inputType="email" />
        </div>

        <div class="mt-4">
          <TextInput placeholder="Password" inputType="password" />
        </div>

        <div class="mt-10">
          <button type="submit" class="rounded-full w-full p-3 font-bold">
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
</script>
