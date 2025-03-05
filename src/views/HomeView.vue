<template>
  <div class="py-10 text-center">
    <p>Minesweeper</p>
    <div class="flex justify-center py-4">
      <button 
      class="py-1 px-4 mx-0.5 bg-[#0d9488] text-white rounded hover:bg-[#0f766e]"
      v-for="(item,index) in setting" :key=index>{{ item }}</button>
    </div>
    <div class="flex justify-center gap-10">
      <div class="flex gap-1 items-center">
        <ClockIcon class="text-[#374151] dark:text-white size-7"></ClockIcon>
        <div class="text-2xl font-mono">0</div>
      </div>
      <div class="flex gap-1 items-center">
        <BoltIcon class=" text-[#374151] dark:text-white size-7"></BoltIcon>
        <div class="text-2xl font-mono">10</div>
      </div>
    </div>
    <div class="p-5">
      <div class="flex justify-center gap-0.5">
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
        <button class="min-w-8 min-h-8 border-0.5 bg-gray-500/10 hover:bg-gray-500/20"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ClockIcon, BoltIcon} from '@heroicons/vue/24/outline'
type boxType = {
  value:number,
  tag:boolean,
  cover:boolean
}
const box = ref([])
const setting  = ref(['New Game','Easy','Medium','Hard']) 
// function init() {
  
// }
</script>

<style></style>