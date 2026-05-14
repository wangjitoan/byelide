<template>
  <img :src="props.block.props.src"  :alt="props.block.props.alt">
</template>
<script lang="ts" setup>
import type { imageBlock } from '@/types/blocks'
const props=defineProps<{block:imageBlock}>()
</script>


