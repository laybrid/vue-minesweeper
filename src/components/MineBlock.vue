<template>
    <button 
        :class="getBlockClass(block)" 
        class="flex justify-center items-center min-w-8 min-h-8 border border-gray-400/10">
        <template v-if="block.revealed || dev">
            <div v-if="block.mine">
                <BoltIcon class=" text-[#374151] dark:text-white size-5"></BoltIcon>
            </div>
            <div v-else>{{ block.adjacentMines }}</div>
        </template>
        <template v-else-if="(!block.revealed && block.flagged)">
            <FlagIcon class=" text-[#f87171]  size-5"></FlagIcon>
        </template>
    </button>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { BlockState } from '@/types';

import { BoltIcon, FlagIcon } from '@heroicons/vue/24/solid'
defineProps<{block:BlockState}>()
const dev = false
// 添加数字样式
const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-orange-500',
  'text-purple-500',
  'text-pink-500',
  'text-teal-500',
]
// 添加block的样式
function getBlockClass(block: BlockState) {
  if (block.revealed == false) {
    return 'bg-gray-500/10 hover:bg-gray-500/20'
  }
  return block.mine ? 'bg-red-400' : numberColors[block.adjacentMines as number]
}
</script> 