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
        <MineBlock 
        :block="item"
         v-for="item, x in row" :key="x" @click="onClick(item)" @contextmenu.prevent="onRightClick(item)"></MineBlock>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import MineBlock from '@/components/MineBlock.vue';
import { ClockIcon } from '@heroicons/vue/24/outline'
import { BoltIcon} from '@heroicons/vue/24/solid'
import { BlockState } from '@/types';

const WIDTH = 6
const HEIGHT = 6
const state = reactive(Array.from({ length: HEIGHT }, (_, y) => Array.from({ length: WIDTH }, (_, x): BlockState => ({ x, y, adjacentMines: 0, revealed: false,flagged:false }))))
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


// 点击后再生成数据  这样避免第一次点就是雷
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
  checkGameState()
}
function onRightClick(block: BlockState) {
  (!block.revealed) && (block.flagged = !block.flagged)
  checkGameState()
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
function checkGameState() {
  const blocks = state.flat()
  // 胜利的两个条件 对雷与非雷单独判断
  const isWin1 =  blocks.every((block)=> (!block.mine && block.revealed) || block.mine)
  const isWin2 = blocks.every((block)=> (block.mine && block.flagged) || !block.mine)
  if(isWin1 || isWin2) {
    alert('win')
  }
}
</script>

<style></style>