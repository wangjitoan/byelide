<template>
  <input
    type="text"
    :value="props?.block?.props?.content"
    @input="(ev) => onInput((ev.target as HTMLInputElement).value)"
  />
</template>
<script lang="ts" setup>
import type { textBlock } from '@/types/blocks'
const props = defineProps<{ block: textBlock|null  }>()
const emit = defineEmits<{ (event: 'block-change', value: textBlock): void }>()
function onInput(content: string) {
  if (!props.block) return
  const updatedBlock = { ...props.block, props: { ...props.block.props, content } }
  emit('block-change', updatedBlock)
}
</script>
