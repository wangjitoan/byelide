<template>
  <div>{{ props.block.props.type }}</div>
</template>
<script lang="ts" setup>
import type { chartBlock } from '@/types/blocks'
const props= defineProps<{
block:chartBlock
}>()
 
</script>
