<template>
  <div class="fixed z-50 h-full">
    <div class="fixed inset-0 bg-black bg-opacity-60"></div>
    <div class="fixed inset-0 z-10 overflow-auto h-full">
      <div class="flex flex-col min-h-full justify-center items-center py-2">
        <div
          class="transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all max-w-lg w-full">
          <div class="flex items-center py-4 border-b border-b-gray-300">
            <div class="text-[22px] font-semibold w-full text-center">
              Pick Image
            </div>
            <div
              @click="$emit('close')"
              class="absolute right-3 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer">
              <Icon name="mdi:close" size="25" />
            </div>
          </div>

          <div class="flex items-center bg-white px-4 pb-4">
            <div class="w-full">
              <div v-if="!uploadedImage" class="my-4">
                <label
                  for="file"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2 cursor-pointer">
                  Upload photo
                </label>
                <input
                  type="file"
                  id="file"
                  class="hidden"
                  @change="getUploadedImage" />
              </div>

              <div v-if="!uploadedImage && video && video.paused" class="my-4">
                <button
                  @click="startCamera()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2 cursor-pointer">
                  Open camera
                </button>
              </div>

              <div v-show="isOpenCamera" class="pb-4">
                <video v-show="!isNewPhoto" ref="video" class="aspect-square" />
                <canvas
                  v-show="isNewPhoto"
                  ref="canvas"
                  class="aspect-square" />
              </div>

              <div class="max-w-lg w-full mx-auto">
                <Cropper
                  class="object-cover"
                  ref="cropper"
                  :stencil-props="{
                    movable: true,
                    resizable: true,
                    aspectRatio: 1
                  }"
                  :resize-image="{
                    adjustStencil: false
                  }"
                  image-restriction="stencil"
                  :src="uploadedImage" />
              </div>

              <div class="flex gap-4" :class="uploadedImage ? 'pt-4' : ''">
                <button
                  @click="$emit('close')"
                  type="button"
                  class="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer">
                  Cancel
                </button>
                <button
                  v-if="isOpenCamera"
                  @click="takePhoto()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0">
                  <span v-show="!isTakingPhoto">Take photo</span>
                  <Icon
                    v-show="isTakingPhoto"
                    name="eos-icons:loading"
                    size="25" />
                </button>
                <button
                  v-if="uploadedImage"
                  @click="cropImage()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0">
                  <span v-show="!isCropping">Crop Image</span>
                  <Icon
                    v-show="isCropping"
                    name="eos-icons:loading"
                    size="25" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import { type CropperComponent } from '~~/components/types/cropper-modal'
import 'vue-advanced-cropper/dist/style.css'
import { useUserStore } from '~~/stores/user/user.store'

const supabase = useSupabaseClient()
const userStore = useUserStore()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'data', data: any): void
}>()

const props = defineProps<{
  linkId?: number
}>()

const file = ref<File | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const isNewPhoto = ref<boolean | null>(null)
const isOpenCamera = ref<boolean | null>(null)
const photoData = ref<Url | null>(null)
const cropper = ref<CropperComponent | null>(null)
const uploadedImage = ref<string>('')
const isTakingPhoto = ref<boolean>(false)
const isCropping = ref<boolean>(false)

const getUploadedImage = (e: Event) => {
  const inputElement = e.target as HTMLInputElement
  const selectedFile = inputElement.files?.[0]

  if (selectedFile) {
    file.value = selectedFile
    uploadedImage.value = URL.createObjectURL(selectedFile)
  }
}

const startCamera = async () => {
  isOpenCamera.value = true

  if (navigator.mediaDevices) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { max: 1024 },
          height: { max: 1024 },
          aspectRatio: { ideal: 1 }
        }
      })

      if (video.value) {
        video.value.srcObject = stream
        video.value.play()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }
}

const convertBlobToUrl = async (photoData: string) => {
  const blob = await (await fetch(photoData)).blob()

  file.value = new File([blob], 'NEW_PHOTO.png', { type: blob.type })

  uploadedImage.value = URL.createObjectURL(file.value)

  isOpenCamera.value = false
}

const takePhoto = () => {
  let videoLocal = video.value
  let canvasLocal = canvas.value

  if (canvasLocal && videoLocal) {
    canvasLocal.width = videoLocal.getBoundingClientRect().width
    canvasLocal.height = videoLocal.getBoundingClientRect().height

    let context = canvasLocal.getContext('2d')

    context?.drawImage(videoLocal, 0, 0, canvasLocal.width, canvasLocal.height)

    isNewPhoto.value = true

    photoData.value = canvasLocal.toDataURL()

    convertBlobToUrl(photoData.value)
  }
}

const cropImage = async () => {
  isCropping.value = true
  if (cropper.value) {
    const { coordinates } = cropper.value.getResult()

    if (!file.value) {
      throw new Error('You must select an image to upload.')
    }

    const fileExt = file.value.name.split('.').pop()
    const imgCode = `${Math.random()}`
    const filePath = `avatars/${userStore.id}/${imgCode}.${fileExt}`

    const img = new Image()
    img.src = URL.createObjectURL(file.value)
    await new Promise((resolve) => (img.onload = resolve))

    if (coordinates) {
      const img = new Image()
      img.src = URL.createObjectURL(file.value)
      await new Promise((resolve) => (img.onload = resolve))
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (coordinates.height && coordinates.width) {
        canvas.width = Number(coordinates.width)
        canvas.height = Number(coordinates.height)
      }

      if (ctx) {
        ctx.drawImage(
          img,
          Number(coordinates.left),
          Number(coordinates.top),
          Number(coordinates.width),
          Number(coordinates.height),
          0,
          0,
          Number(coordinates.width),
          Number(coordinates.height)
        )
      }

      const newBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            throw new Error('Failed to create blob')
          }
        }, 'image/png')
      })

      const newFile = new File([newBlob], `${imgCode}.${fileExt}`, {
        type: 'image/png'
      })

      try {
        let { error: uploadError } = await supabase.storage
          .from('users')
          .upload(filePath, newFile, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) throw uploadError
      } catch (e) {
        throw e
      }
    }

    emit('data', {
      filePath
    })

    isCropping.value = true
  }
}
</script>
