<template>
  <div class="fixed z-50 h-full">
    <div class="fixed inset-0 bg-black bg-opacity-60"></div>
    <div class="fixed inset-0 z-10 overflow-auto h-full">
      <div class="flex flex-col min-h-full justify-center items-center py-2">
        <div
          class="transform overflow-hidden rounded-lg bg-white shadow-2xl transition-all max-w-lg w-full"
        >
          <div class="flex items-center py-4 border-b border-b-gray-300">
            <div class="text-[22px] font-semibold w-full text-center">
              Pick Image
            </div>
            <div
              @click="$emit('close')"
              class="absolute right-3 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              <Icon name="mdi:close" size="25" />
            </div>
          </div>

          <div class="flex items-center bg-white px-4 pb-4">
            <div class="w-full">
              <div v-if="!uploadedImage" class="my-4">
                <label
                  for="file"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2 cursor-pointer"
                >
                  Upload photo
                </label>
                <input
                  type="file"
                  id="file"
                  class="hidden"
                  @change="getUploadedImage"
                />
              </div>

              <div v-if="!uploadedImage && video && video.paused" class="my-4">
                <button
                  @click="startCamera()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] mb-2 cursor-pointer"
                >
                  Open camera
                </button>
              </div>

              <div v-show="isOpenCamera" class="pb-4">
                <video v-show="!isNewPhoto" ref="video" class="aspect-square" />
                <canvas
                  v-show="isNewPhoto"
                  ref="canvas"
                  class="aspect-square"
                />
              </div>

              <div class="max-w-lg w-full mx-auto">
                <Cropper
                  class="object-cover"
                  ref="cropper"
                  :stencil-props="{
                    movable: true,
                    resizable: true,
                    aspectRatio: 1,
                  }"
                  :resize-image="{
                    adjustStencil: false,
                  }"
                  image-restriction="stencil"
                  :src="uploadedImage"
                />
              </div>

              <div class="flex gap-4" :class="uploadedImage ? 'pt-4' : ''">
                <button
                  @click="$emit('close')"
                  type="button"
                  class="flex items-center border justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  v-if="isOpenCamera"
                  @click="takePhoto()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0"
                >
                  <span v-show="!isTakingPhoto">Take photo</span>
                  <Icon
                    v-show="isTakingPhoto"
                    name="eos-icons:loading"
                    size="25"
                  />
                </button>
                <button
                  v-if="uploadedImage"
                  @click="cropImage()"
                  class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3] cursor-pointer focus:outline-none focus:ring-0"
                >
                  <span v-show="!isCropping">Crop Image</span>
                  <Icon
                    v-show="isCropping"
                    name="eos-icons:loading"
                    size="25"
                  />
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
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const emit = defineEmits(["close", "data"]);

const props = defineProps<{
  linkId?: number;
}>();
const { linkId } = toRefs(props);

const file = ref(null);
const video = ref(null);
const canvas = ref(null);
const isNewPhoto = ref(null);
const isOpenCamera = ref(null);
const photoData = ref(null);
const cropper = ref(null);
const uploadedImage = ref(null);
const isTakingPhoto = ref<boolean>(false);
const isCropping = ref<boolean>(false);
</script>
