<template>
  <div>
    <client-only>
      <input
        :type="inputType"
        :maxlength="max"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        class="w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg p-3 placeholder-gray-500 focus:outline-none hover:bg-slate-100"
        :class="[
          isFocused ? 'border-gray-900' : '',
          error ? 'border-red-500' : ''
        ]"
        v-model="inputComputed"
        autocomplete="off" />
      <span v-if="error" class="text-red-500 text-[14px] font-semibold">
        {{ error }}
      </span>
    </client-only>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:input'])

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
  error: {
    type: String,
    default: null
  },
  max: {
    type: Number,
    default: 255
  }
})

const { input, placeholder, inputType, error, max } = toRefs(props)

const isFocused = ref(false)

const inputComputed = computed({
  get: () => input.value,
  set: (value) => emit('update:input', value)
})
</script>
