<template>
  <AdminLayout>
    <div id="ApperancePage" class="flex h-[calc(100%-50px)] pb-4">
      <div
        class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
        <div class="max-w-[750px] mx-auto pb-24">
          <div id="ProfileSection">
            <div
              class="font-semibold pb-4"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
              ">
              Profile
            </div>

            <div class="w-full bg-white rounded-3xl p-6">
              <div class="flex items-center justify-between gap-4">
                <img class="rounded-full w-[90px]" :src="userStore.src" />

                <div class="w-full">
                  <button
                    @click="openCropper = true"
                    class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2">
                    Pick image
                  </button>
                </div>
              </div>

              <div class="mt-4">
                <TextInput
                  placeholder="Profile Title"
                  v-model:input="name"
                  inputType="text"
                  @server-errors-state="handleServerErrorsState"
                  :server-errors="serverErrors"
                  :max="25" />
              </div>

              <textarea
                v-model="bio"
                rows="4"
                maxlength="120"
                placeholder="Bio"
                @focus="isBioFocused = true"
                @blur="isBioFocused = false"
                :class="isBioFocused ? 'border-gray-900' : ''"
                class="w-full mt-4 bg-[#EFF0EB] text-gray-800 border-2 text-sm border-[#EFF0EB] rounded-xl py-3.5 px-3 placeholder-gray-500 resize-none focus:outline-none"></textarea>
              <div
                class="flex items-center justify-end text-[#676B5F] text-[13px]">
                {{ bioLengthComputed }}/120
              </div>
            </div>
          </div>

          <div id="ThemeSection">
            <div
              class="font-semibold pb-4"
              :class="
                userStore.isMobile ? 'mt-8 text-2xl' : 'mt-20 md:mt-8 text-xl'
              ">
              Themes
            </div>

            <div class="w-full bg-white rounded-3xl p-6">
              <div
                class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
                <div v-for="item in userStore.colors" :key="item.id">
                  <div
                    class="border-2 border-gray-500 rounded-lg aspect-[2/3] border-dashed cursor-pointer"
                    :class="
                      userStore.theme_id == item.id
                        ? 'transition-all duration-150 ease-in p-2'
                        : 'transition-all duration-150 ease-out p-0'
                    ">
                    <div
                      @click="($event) => updateTheme(item.id)"
                      class="relative rounded-xl h-full mx-auto">
                      <div
                        class="absolute left-0 top-0 h-full w-full z-0"
                        :class="item.color" />
                      <div class="relative z-10 pt-9">
                        <div
                          class="rounded-full mx-auto w-12 h-12 bg-[#EFF0EA] bg-opacity-70" />

                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-4 bg-[#EFF0EA] bg-opacity-70" />
                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                        <div
                          class="w-[calc(100%-20px)] mx-auto rounded-full h-6 mt-1 bg-[#EFF0EA] bg-opacity-70" />
                      </div>
                    </div>
                  </div>
                  <div class="text-center">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileSectionDisplay />
      <CropperModal
        v-if="openCropper"
        @data="data = $event"
        @close="openCropper = false" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '~~/layouts/AdminLayout.vue'
import { useUserStore } from '~~/stores/user/user.store'
import { type ServerErrors } from '~~/shared/types'
import { type CropperData } from '~~/components/types/cropper-modal'
import { Color } from 'shared/types'

const userStore = useUserStore()

definePageMeta({ middleware: 'is-logged-out' })

const name = ref<string>('')
const bio = ref<string>('')
const data = ref<CropperData | null>(null)
const serverErrors = ref<string>('')
const isBioFocused = ref<boolean>(false)
const openCropper = ref<boolean>(false)

const bioLengthComputed = computed(() => {
  return bio.value?.length
})

const updateTheme = async (themeId: number) => {
  try {
    await userStore.updateUserTheme(themeId)
    await userStore.getUser()
  } catch (error) {
    console.log(error)
  }
}

const updateUserDetails = useDebounce(async () => {
  try {
    await userStore.updateUserDetails(name.value, bio.value)
    await userStore.getUser()
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      const serverError = error as ServerErrors
      serverErrors.value = serverError.response.data.errors
      console.log(error)
    } else {
      console.log(error)
    }
  }
}, 500)

const updateUserImage = async () => {
  try {
    if (!data.value) return
    await userStore.updateUserImage(data.value.filePath)
    await userStore.getUser()
    setTimeout(() => {
      openCropper.value = false
    }, 300)
  } catch (error) {
    openCropper.value = false
    alert(error)
    console.log(error)
  }
}

const handleServerErrorsState = () => {
  serverErrors.value = ''
}
const setColors = () => {
  const THEME_COLORS: Color[] = [
    { id: 1, color: 'bg-white', text: 'text-black', name: 'Air White' },
    { id: 2, color: 'bg-gray-800', text: 'text-white', name: 'Lake Black' },
    {
      id: 3,
      color: 'bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500',
      text: 'text-white',
      name: 'Purple Pie'
    },
    {
      id: 4,
      color: 'bg-gradient-to-t from-gray-500 via-blue-500 to-green-500',
      text: 'text-white',
      name: 'Green Grass'
    },
    {
      id: 5,
      color: 'bg-gradient-to-t from-orange-500 via-green-500 to-red-500',
      text: 'text-white',
      name: 'Traffic Lights'
    },
    {
      id: 6,
      color: 'bg-gradient-to-b from-blue-800 via-blue-500 to-green-500',
      text: 'text-white',
      name: 'Blue Sky'
    },
    {
      id: 7,
      color: 'bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500',
      text: 'text-white',
      name: 'Soft Horizon'
    },
    {
      id: 8,
      color: 'bg-gradient-to-t from-gray-800 to-emerald-500',
      text: 'text-white',
      name: 'Tinted Lake'
    }
  ]

  return THEME_COLORS
}

watch(
  () => name.value,
  async () => await updateUserDetails()
)
watch(
  () => bio.value,
  async () => await updateUserDetails()
)
watch(
  () => data.value,
  async () => await updateUserImage()
)

onMounted(async () => {
  userStore.colors = setColors()
  name.value = userStore.name
  bio.value = userStore.bio
})
</script>
