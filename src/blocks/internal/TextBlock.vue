<template>
  <div>{{ props.block.props.content }}</div>
</template>
<script lang="ts" setup>
import type {textBlock} from '@/types/blocks'
const props=defineProps<{block:textBlock}>()

</script>
