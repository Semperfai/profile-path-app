<template>
  <div class="w-full bg-white rounded-3xl">
    <div id="MainLinkBoxSection" class="px-8 py-5">
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center w-full">
          <input
            v-if="true"
            type="text"
            v-model="name"
            maxlength="18"
            class="w-full text-sm font-semibold focus:outline-none" />
          <div v-else class="flex items-center w-full">
            <div
              class="font-semibold mr-2 cursor-pointer"
              :class="isMobile ? 'text-xl' : 'text-sm'">
              TEST
            </div>
            <Icon
              class="cursor-pointer"
              name="octicon:pencil-24"
              :size="isMobile ? '23' : '17'"
              color="#676B5F" />
          </div>
        </div>
        <div class="flex items-center">
          <Icon
            class="cursor-pointer"
            :class="isMobile ? 'min-w-[23px]' : 'min-w-[17px]'"
            name="mdi:bell-outline"
            :size="isMobile ? '25' : '20'"
            color="#676B5F" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
