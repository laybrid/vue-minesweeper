<template>
  <div class="py-10 text-center">
    <p>Minesweeper</p>
    <div class="flex justify-center py-4">
      <button class="py-1 px-4 mx-0.5 bg-[#0d9488] text-white rounded hover:bg-[#0f766e]"
        v-for="(item, index) in play.setting" :key=index
        @click="item.method(play)">{{ item.title }}
      </button>
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
      <div v-for="row, y in state" :key="y" class="flex justify-center gap-0.5 mb-0.5">
        <MineBlock 
        :block="item"
         v-for="item, x in row" :key="x" @click="play.onClick(item)" @contextmenu.prevent="play.onRightClick(item)"></MineBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MineBlock from '@/components/MineBlock.vue';
import { ClockIcon } from '@heroicons/vue/24/outline'
import { BoltIcon} from '@heroicons/vue/24/solid'
import { GamePlay } from '@/assets/utils/logic';

const  play = new GamePlay(9,9)
const state = play.state
</script>

<style></style>