<template>
  <VitePwaManifest />
  <BaseMask v-if="bgIsGray" />

  <NuxtPage v-if="show" />

  <UpdateLinkOverlay v-if="isMobile && updatedLinkId" />
  <AddLinkOverlay v-if="isMobile && addLinkOverlay" />
  <PreviewOverlay v-if="!isMobile && isPreviewOverlay" />
</template>
<script setup lang="ts">
import BaseMask from '~~/components/UI/BaseMask.vue'
import { useUserStore } from '~~/stores/user/user.store'
import { storeToRefs } from 'pinia'
import { Color } from 'shared/types'

const userStore = useUserStore()
const { isMobile, isPreviewOverlay, updatedLinkId, addLinkOverlay, id } =
  storeToRefs(userStore)

const route = useRoute()

const show = ref<boolean>(false)
const bgIsGray = ref<boolean>(false)

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

const checkPath = (path: string) => {
  if (path == '/' || path == '/register') {
    bgIsGray.value = false
    return
  }
  bgIsGray.value = true
}

watch(
  () => route.fullPath,
  (path) => {
    checkPath(path)
  }
)

watch(
  () => isPreviewOverlay.value,
  (value) => {
    let id = null
    if (route.fullPath === '/admin') {
      id = 'AdminPage'
    } else if (route.fullPath === '/admin/appearance') {
      id = 'AppearancePage'
    } else if (route.fullPath === 'admin/settings') {
      id = 'SettingsPage'
    }

    if (!id) return

    userStore.hidePageOverflow(value, id)
  }
)

onMounted(async () => {
  updatedLinkId.value = 0
  addLinkOverlay.value = false
  isPreviewOverlay.value = false
  isMobile.value = false

  try {
    if (id.value) {
      await userStore.hasSessionExpired()
      await userStore.getUser()
      await userStore.getAllLinks()
    }
  } catch (error) {
    console.log(error)
  }

  checkPath(route.fullPath)

  if ('ontouchstart' in window) {
    isMobile.value = true
  }

  setTimeout(() => {
    show.value = true
  }, 1)
})
</script>
