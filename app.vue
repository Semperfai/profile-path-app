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
import { THEME_COLORS } from '~~/shared/constants/colors'

const userStore = useUserStore()
const {
  isMobile,
  isPreviewOverlay,
  updatedLinkId,
  addLinkOverlay,
  id,
  colors
} = storeToRefs(userStore)

const route = useRoute()

const show = ref<boolean>(false)
const bgIsGray = ref<boolean>(false)

const setColors = () => {
  return [...THEME_COLORS]
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

onMounted(() => {
  colors.value = setColors()
  updatedLinkId.value = 0
  addLinkOverlay.value = false
  isPreviewOverlay.value = false
  isMobile.value = false

  try {
    if (id.value) {
      userStore.hasSessionExpired()
      userStore.getUser()
      userStore.getAllLinks()
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
