<template></template>

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
