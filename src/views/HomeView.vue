<template>
  <div class="py-10 text-center">
    <p>Minesweeper</p>
    <div class="flex justify-center py-4">
      <button class="py-1 px-4 mx-0.5 bg-[#0d9488] text-white rounded hover:bg-[#0f766e]"
        v-for="(item, index) in setting" :key=index>{{ item }}</button>
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
        <button v-for="item, x in row" :key="x" @click="onClick(item)" :class="getBlockClass(item)"
          class="flex justify-center items-center min-w-8 min-h-8 border border-gray-400/10">
          <template v-if="item.revealed || dev">
            <div v-if="item.mine">
              <BoltIcon class=" text-[#374151] dark:text-white size-5"></BoltIcon>
            </div>
            <div v-else>{{ item.adjacentMines }}</div>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ClockIcon } from '@heroicons/vue/24/outline'
import { BoltIcon } from '@heroicons/vue/24/solid'
interface BlockState {
  x: number,
  y: number,
  revealed?: boolean,
  mine?: boolean,
  flagged?: boolean,
  adjacentMines: number
}
const WIDTH = 10
const HEIGHT = 10
const state = reactive(Array.from({ length: HEIGHT }, (_, y) => Array.from({ length: WIDTH }, (_, x): BlockState => ({ x, y, adjacentMines: 0, revealed: false }))))
const setting = ref(['New Game', 'Easy', 'Medium', 'Hard'])
const dirction = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
]
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

// 开发者模式和点击后再生成数据  这样避免第一次点就是雷
const dev = false
let minesgenerated = false
function onClick(block: BlockState) {
  if (!minesgenerated) {
    generateMines(block)
    minesgenerated = true
  }
  block.revealed = true
  if (block.mine) {
    alert('boom')
  }
  expendZero(block)
}
// 生成雷
function generateMines(initblock: BlockState) {
  for (const row of state) {
    for (const block of row) {
      if (Math.abs(initblock.x - block.x) <= 1) {
        continue
      }
      if (Math.abs(initblock.y - block.y) <= 1) {
        continue
      }
      block.mine = Math.random() < 0.2
    }
  }
  updateNumber()
}
// 生成数字
function updateNumber() {
  state.forEach((row) => {
    row.forEach((block) => {
      if (block.mine)
        return
      searchBlock(block).forEach(item => item.mine && block.adjacentMines++);
    })
  })
}

// 找到周围的block 返回满足条件的block数组
function searchBlock(block: BlockState) {
  return dirction.map(([x1, y1]) => {
    const x2 = x1 + block.x
    const y2 = block.y + y1
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
      return undefined;
    }
    return state[y2][x2]
  })
    .filter(Boolean) as BlockState[]
}

// 添加block的样式
function getBlockClass(block: BlockState) {
  if (block.revealed == false) {
    return 'bg-gray-500/10 hover:bg-gray-500/20'
  }
  return block.mine ? 'bg-red-400' : numberColors[block.adjacentMines as number]
}
// 自动化掀开0
function expendZero(block: BlockState) {
  if (block.adjacentMines || block.mine) {
    return
  }
  // 0周围的全部被掀开 tips 0周围不会有雷
  searchBlock(block).forEach(item => {
    if (item.revealed == false) {
      item.revealed = true
      expendZero(item)
    }
  })
}

</script>

<style></style>