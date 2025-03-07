import { BlockState } from "@/types";
import { ref } from "vue";
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
export class GamePlay {
    // 点击后再生成数据  这样避免第一次点就是雷
    minesgenerated = false
    state = ref<BlockState[][]>([])
    gameState = ref<'won' | 'play' | 'lost'>('play')
    setting = [{
        title: 'New Game',
        method: this.newGame
    },
    {
        title: 'Easy',
        method: this.easy
    },
    {
        title: 'Medium',
        method: this.medium
    },
    {
        title: 'Hard',
        method: this.hard
    }]

    constructor(public width: number, public height: number, public mines:number) {
        this.reset(width, height,mines)
    }
    reset(w: number, h: number,mines:number) {
        this.gameState.value = 'play'
        this.width = w
        this.height = h
        this.mines = mines
        this.minesgenerated = false
        this.state.value = Array.from({ length: this.height }, (_, y) => Array.from({ length: this.width }, (_, x): BlockState => ({ x, y, adjacentMines: 0, revealed: false, flagged: false })))
    }

    onClick(block: BlockState) {
        if (this.gameState.value !== 'play') {
            return
        }
        if (!this.minesgenerated) {
            this.generateMines(this.state.value, block)
            this.minesgenerated = true
        }
        block.revealed = true
        if (block.mine) {
            this.gameState.value = 'lost'
            alert('boom')
            this.showAllMine()
        }
        this.expendZero(block)
        this.checkGameState()
    }
    onRightClick(block: BlockState) {
        if (this.gameState.value !== 'play') {
            return
        }
        (!block.revealed) && (block.flagged = !block.flagged)
        this.checkGameState()
    }
    // 生成雷
    generateMines(state: BlockState[][], initblock: BlockState) {
        for(let i = 0; i < this.mines;i++) {
            const x = Math.round(Math.random() * (this.width-1))
            const y = Math.round(Math.random() * (this.height-1))
            const block = state[y][x]
            if (Math.abs(initblock.x - block.x) <= 1) {
                i--
                continue
            }
            if (Math.abs(initblock.y - block.y) <= 1) {
                i--
                continue
            } 
            if(block.mine) {
                i-- 
                continue
            }
            state[y][x].mine = true

        }
        this.updateNumber(state)
    }
    // 生成数字
    updateNumber(state: BlockState[][]) {
        state.forEach((row) => {
            row.forEach((block) => {
                if (block.mine)
                    return
                this.searchBlock(block).forEach(item => item.mine && block.adjacentMines++);
            })
        })
    }

    // 找到周围的block 返回满足条件的block数组
    searchBlock(block: BlockState) {
        return dirction.map(([x1, y1]) => {
            const x2 = x1 + block.x
            const y2 = block.y + y1
            if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) {
                return undefined;
            }
            return this.state.value[y2][x2]
        })
            .filter(Boolean) as BlockState[]
    }


    // 自动化掀开0
    expendZero(block: BlockState) {
        if (block.adjacentMines || block.mine) {
            return
        }
        // 0周围的全部被掀开 tips 0周围不会有雷
        this.searchBlock(block).forEach(item => {
            if (item.revealed == false) {
                item.revealed = true
                this.expendZero(item)
            }
        })
    }
    checkGameState() {
        const blocks = this.state.value.flat()
        // 胜利的两个条件 对雷与非雷单独判断
        const isWin = blocks.every((block) => (!block.mine && block.revealed) || block.mine)
        if (isWin) {
            this.gameState.value = 'won'
        }
    }

    //失败之后显示全部的雷
    showAllMine() {
        const blocks = this.state.value.flat()
        blocks.forEach((block) => {
            if(block.mine) {
                block.revealed = true
            }
        })
    }
    // 头部四个按钮的逻辑
    newGame(play: GamePlay) {
        play.reset(9, 9,10)
    }
    easy(play: GamePlay) {
        play.reset(9, 9,10)
    }
    medium(play: GamePlay) {
        play.reset(16, 16,40)
    }
    hard(play: GamePlay) {
        play.reset(16, 30,99)
    }
}