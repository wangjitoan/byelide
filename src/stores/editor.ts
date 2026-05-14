import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { mockBlocks } from '@/mock/mockBlocks'
import type {Block} from '@/types/blocks'

export const useEditorStore = defineStore('editor', () => {
  const blocks = ref<Block[]>(mockBlocks)
  const activeBlockId=ref<string|null>(null)
  const selectedBlock=computed(()=>blocks.value.find(block => block.id === activeBlockId.value) || null)
  function toggleAddBlock (value: Block) {
    blocks.value.push(value)
  }
  function toggleUpdateBlocks (value: Block[]) {
   blocks.value=value // blocks.value.push(value)
  }
  function toggleSelectBlock (id: string|null) {
    activeBlockId.value=id
  }
  function toggleUpdateBlock (value: Block) {
    const index = blocks.value.findIndex(block => block.id === value.id)
    blocks.value.splice(index, 1, value)
  }
  return { blocks,activeBlockId, selectedBlock, toggleAddBlock , toggleUpdateBlocks  , toggleSelectBlock, toggleUpdateBlock }
})
