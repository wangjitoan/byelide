<template>
  <input
    type="text"
    :value="props?.block?.props?.src"
    @input="(ev) => onInput((ev.target as HTMLInputElement).value)"
  />
</template>
<script lang="ts" setup>
import type { imageBlock } from '@/types/blocks'
const props = defineProps<{ block: imageBlock|null  }>()
const emit = defineEmits<{ (event: 'block-change', value: imageBlock): void }>()
function onInput(src: string) {
  if (!props.block) return
  const updatedBlock = { ...props.block, props: { ...props.block.props, src } }
  emit('block-change', updatedBlock)
}
</script>
