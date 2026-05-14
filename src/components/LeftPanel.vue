<template>
  <div class="left-panel-wrapper">
    <div class="left-panel-left">
      <div class="btn" :class="{ active: mode === 'page' }" @click="() => handleToggleMode('page')">
        <Page />
      </div>
      <div
        class="btn"
        :class="{ active: mode === 'smartOptimization' }"
        @click="() => handleToggleMode('smartOptimization')"
      >
        <SmartOptimization />
      </div>
    </div>
    <transition name="app-left-panel-drawer">
      <div class="left-panel-content" v-show="mode">
        {{ mode }}
        <smoothDndContainer
          behaviour="copy"
          group-name="block"
          class="block-group"
          tag="div"
          :get-child-payload="getChildPayload"
        >
          <smoothDndDraggable v-for="i in 10" :key="i">
            <div class="block-item">{{ i }}</div>
          </smoothDndDraggable>
        </smoothDndContainer>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { Page, SmartOptimization } from '@icon-park/vue-next'
import { ref } from 'vue'

import { smoothDndContainer } from './smoothDnd/smoothDndContainer'
import { smoothDndDraggable } from './smoothDnd/smoothDndDraggable'
type Mode = 'page' | 'smartOptimization' | null
const mode = ref<Mode>(null)
const handleToggleMode = (newMode: Mode) => {
  if (mode.value === newMode) {
    mode.value = null // Toggle off if the same button is clicked
  } else {
    mode.value = newMode // Set to the new mode
  }
}
const getChildPayload = (index: number) => {
  // 返回要拖动的元素数据
  return index + 1
}
</script>
<style scoped>
.left-panel-wrapper {
  /* Add your sty

  les here */
  /* width: 200px; */
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;

  display: flex;
  flex-direction: row;
}
.left-panel-left {
  /* Add styles for the left section of the panel */
  width: 50px;
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
