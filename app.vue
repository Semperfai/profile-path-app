<template>
  <VitePwaManifest />
  <NuxtPage />
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user/user'
import { storeToRefs } from 'pinia'
import { type Color } from '~/shared/types'

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

const setColors = (): Color[] => {
  return [
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
}

onMounted(() => {
  colors.value = setColors()
  updatedLinkId.value = 0
  addLinkOverlay.value = false
  isPreviewOverlay.value = false
  isMobile.value = false

  if ('ontouchstart' in window) {
    isMobile.value = true
  }
})
</script>
