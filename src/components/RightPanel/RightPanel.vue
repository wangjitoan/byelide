<template>
  <div class="right-panel-wrapper">
    <div class="right-panel-right">
      <component  :is="blockSetting"  :block="selectedBlock"  @block-change="onBlockChange"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useEditorStore } from '@/stores/editor'
import type { Block } from '@/types/blocks'

import ChartSetting from './ChartSetting.vue'
import ImageSetting from './ImageSetting.vue'
import TextSetting from './TextSetting.vue'
const editorStore = useEditorStore()
const { selectedBlock } = storeToRefs(editorStore)
// let blockSetting: Block|null = null
const blockSetting = computed(() => {
  if (!selectedBlock.value) return null
  switch (selectedBlock.value.type) {
    case 'text':
      return TextSetting
    case 'image':
      return ImageSetting
    case 'chart':
      return ChartSetting
    default:
      return null
  }
})
const onBlockChange = (block: Block) => {
  if (selectedBlock.value) {
    editorStore.toggleUpdateBlock(block)
  }
}
</script>
<style scoped>
.right-panel-wrapper {
  /* Add your styles here */
  width: 280px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;

  display: flex;
  flex-direction: row;
}
.right-panel-right {
  /* Add styles for the left section of the panel */
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
  align-items: center;
}
.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}
.btn.active {
  background-color: rgb(0, 196, 83);
  color: #fff;
}
.left-panel-content {
  /* Add styles for the content section of the panel */
  width: 250px;
  background-color: #f0f0f0;
  color: black;
}
.block-group {
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.block-item {
  height: 40px;
  width: 40px;
  cursor: move;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: background-color 0.3s;
}
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.1s cubic-bezier(0.3, 0.1, 0.3, 1);
  /* transition: opacity 0.3s; */
}
.app-left-panel-drawer-enter-from,
.app-left-panel-drawer-leave-to {
  width: 0;
}
</style>
