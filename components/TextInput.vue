<template>
  <div>
    <client-only>
      <div class="relative">
        <input
          :type="inputType"
          :maxlength="max"
          :placeholder="placeholder"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg px-7 py-3 placeholder-gray-500 focus:outline-none hover:bg-slate-100"
          :class="{
            'border-gray-900': isFocused,
            'border-red-500': errorState,
            'border-green-500': normalState
          }"
          v-model="inputComputed"
          autocomplete="off" />
        <Icon
          v-if="shouldValidate"
          class="absolute right-2 h-full text-xl text-green-500"
          :class="{
            'text-green-500': normalState,
            'text-yellow-500': errorState
          }"
          :name="`heroicons-solid:${
            !errorState ? 'check-circle' : 'exclamation'
          }`" />
      </div>
      <span v-if="errorState" class="text-red-500 text-[14px] font-semibold">
        {{ validation?.$errors[0]?.$message || serverErrors }}
      </span>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:input', 'server-errors-state'])

const props = defineProps({
  input: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  inputType: {
    type: String,
    default: 'text'
  },
  validation: {
    type: Object,
    default: null
  },
  serverErrors: {
    type: String,
    default: ''
  },
  max: {
    type: Number,
    default: 255
  }
})

const { input, placeholder, inputType, serverErrors, max, validation } =
  toRefs(props)

const isFocused = ref<boolean>(false)
const shouldValidate = ref<boolean>(false)

const errorState = computed(() => {
  return (
    (validation?.value?.$error || serverErrors.value) && shouldValidate.value
  )
})

const normalState = computed(() => {
  return (
    !validation?.value?.$error && !serverErrors.value && shouldValidate.value
  )
})

const inputComputed = computed({
  get: () => input.value,
  set: (value) => {
    shouldValidate.value = true
    emit('server-errors-state')
    emit('update:input', value)
  }
})
</script>
