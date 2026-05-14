<template>
  <div class="Layout-Wrapper">
    <LeftPanel />

    <div class="plain">
      <smoothDndContainer
        orientation="vertical"
        behaviour="move"
        group-name="block"
        class="block-group"
        @drop="(e) => editorStore.toggleUpdateBlocks(onDrop(blocks, e))"
        tag="div"
      >
        <smoothDndDraggable v-for="block in blocks" :key="block.id">
          <div
            :data-block-id="block.id"
            :data-block-type="block.type"
            :class="{ 'block-item': true, debug: debug || activeBlockId === block.id }"
            @click="() => editorStore.toggleSelectBlock(block.id)"
          >
            <BlockRenderer :block="block" />
          </div>
        </smoothDndDraggable>
      </smoothDndContainer>
    </div>
    <RightPanel />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { DropResult } from 'smooth-dnd'

import BlockRenderer from '@/blocks/BlockRenderer.vue'
import LeftPanel from '@/components/LeftPanel.vue'
import RightPanel from '@/components/RightPanel/RightPanel.vue'
import { smoothDndContainer } from '@/components/smoothDnd/smoothDndContainer'
import { smoothDndDraggable } from '@/components/smoothDnd/smoothDndDraggable'
import { useDebugStore } from '@/stores/debug'
import { useEditorStore } from '@/stores/editor'
const debugStore = useDebugStore()
const { debug } = storeToRefs(debugStore)
import { arrayMove } from '@/utils/array'
const editorStore = useEditorStore()
const { blocks, activeBlockId } = storeToRefs(editorStore)

const onDrop = <T extends any[]>(arr: T, dragResult: DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  const result = [...arr]
  if (addedIndex === null) return result
  if (removedIndex === null && addedIndex !== null) {
    // 增加新元素
    result.splice(addedIndex, 0, payload)
  }
  if (removedIndex !== null && addedIndex !== null) {
    // 移动元素
    return arrayMove(blocks.value, removedIndex, addedIndex)
  }
  return result
}
</script>
<style scoped>
.Layout-Wrapper {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.plain {
  width: 100%;
  padding: 20px;
}
.block-item {
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 4px;
}
.debug {
  border-color: red;
}
</style>
