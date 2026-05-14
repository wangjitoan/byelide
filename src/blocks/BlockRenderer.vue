<template>
  <div>
    <component :is="blockMaterial"  :block="block"/>
  </div>
</template>
<script lang="ts" setup>

import { computed } from 'vue'

import type { Block } from '@/types/blocks'

import ChartBlock from './internal/ChartBlock.vue'
import FailbackBlock from './internal/FailbackBlock.vue'
import ImageBlock from './internal/ImageBlock.vue'
import TextBlock from './internal/TextBlock.vue'
// type BlockType = 'ChartBlock' | 'ImageBlock' | 'TextBlock';
const props = defineProps<{
  block: Block
}>()

const blockMaterial=computed(() => {

switch (props.block.type) {
  case 'chart':
    return ChartBlock
  case 'image':
    return ImageBlock
  case 'text':
    return TextBlock
  default:
    return FailbackBlock
}})
</script>
