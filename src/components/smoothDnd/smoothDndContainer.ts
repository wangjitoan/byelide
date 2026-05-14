import { defineComponent, h } from 'vue'
import { getTagProps, validateTagProp } from './utils'
import { dropHandlers, smoothDnD, type SmoothDnD } from 'smooth-dnd'
smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false
type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drag-ready'
const eventEmitMap: Record<EventKey, string> = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  drop: 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drag-ready': 'onDragReady',
}
export const smoothDndContainer = defineComponent({
  name: 'smoothDndContainer',
  setup() {
    return {
      container: null as SmoothDnD | null,
    }
  },
  mounted() {
    const options: any = Object.assign({}, this.$props)
    for (const key in eventEmitMap) {
      const emitKey = key as EventKey
      options[eventEmitMap[emitKey]] = (props: any) => {
        this.$emit(emitKey, props)
      }
    }

    const element = this.$refs.container || this.$el
    this.container = smoothDnD(element, options)
  },
  unmounted() {
    if (this.container) {
      this.container.dispose()
    }
  },
  emits: ['drag-start', 'drag-end', 'drop', 'drag-enter', 'drag-leave', 'drag-ready'],
  props: {
    orientation: {
      type: String,
      default: 'vertical',
    },
    removeOnDropOut: {
      type: Boolean,
      default: false,
    },
    autoScrollEnabled: {
      type: Boolean,
      default: true,
    },
    animationDuration: {
      type: Number,
      default: 250,
    },
    behaviour: { type: String, default: 'copy' },
    groupName: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    dragBeginDelay: Number,
    dragChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    getChildPayload: Function,
    getGhostParent: Function,
    dropPlaceholder: [Object, Boolean],
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render: function () {
    const tag = getTagProps(this)

    return h(
      tag.value,
      Object.assign({}, { ref: 'container' }, tag.props),
      this.$slots?.default?.(),
    )
  },
})
