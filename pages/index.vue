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
            :validation="v$.email"
            placeholder="Email: link@gmail.com"
            inputType="email"
          />
        </div>

        <div class="mt-4">
          <TextInput
            placeholder="Password"
            v-model:input="formData.password"
            inputType="password"
            :validation="v$.password"
          />
        </div>

        <div class="mt-10">
          <button
            type="submit"
            class="rounded-full w-full p-3 font-bold transition-all duration-300 ease-linear"
            :disabled="!formData.email || !formData.password"
            :class="
              formData.email && formData.password
                ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                : 'bg-[#EFF0EB] text-[#A7AAA2]'
            "
          >
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
import AuthLayout from "~/layouts/AuthLayout.vue";
import { useUserStore } from "~/stores/user/user.store";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, email } from "@vuelidate/validators";

const userStore = useUserStore();

const formData = reactive({
  email: "",
  password: "",
});

const error = ref<string>("");

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("The name field is required", required),
      minLength: minLength(3),
    },
    password: {
      required: helpers.withMessage("The password field is required", required),
      minLength: minLength(6),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

definePageMeta({
  middleware: "is-logged-in",
});

const login = async () => {
  error.value = "";
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    //todo await userStore.getAllLinks() we need this? we can implement this in store?

    if (error) {
      throw error;
      return;
    }

    await userStore.getUser(user.value.id);
  } catch (error) {
    console.log(error);
  }
};

watch(
  user,
  () => {
    if (user.value) {
      userStore.id = user.value.id;
      router.push("/admin");
    }
  },
  { immediate: true }
);
</script>
