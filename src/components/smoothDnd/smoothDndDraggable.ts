import { constants } from 'smooth-dnd'
import { defineComponent, h } from 'vue'
import { getTagProps, validateTagProp } from './utils'
export const smoothDndDraggable = defineComponent({
  name: 'smoothDndDraggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render: function () {
    const tag = getTagProps(this, constants.wrapperClass)
    return h(tag.value, Object.assign({}, tag.props), this.$slots?.default?.())
  },
})
