<template>
  <input
    type="text"
    :value="props?.block?.props?.type"
    @input="(ev) => onInput((ev.target as HTMLInputElement).value)"
  />
</template>
<script lang="ts" setup>
import type { chartBlock } from '@/types/blocks'
const props = defineProps<{ block: chartBlock|null  }>()
const emit = defineEmits<{ (event: 'block-change', value: chartBlock): void }>()
function onInput(type: string) {
  if (!props.block) return
  const updatedBlock = { ...props.block, props: { ...props.block.props, type } }
  emit('block-change', updatedBlock)
}
</script>
