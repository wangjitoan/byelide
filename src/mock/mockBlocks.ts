import type {Block} from '@/types/blocks'

export const mockBlocks: Block[] = [
  {
    id: '1',
    type: 'text',
    props: {
      content: '这是一个文本块',
    },
    actions: {
      onCopy: () => console.log('复制文本块'),
      onEdit: () => console.log('编辑文本块'),
    },
  },
  {
    id: '2',
    type: 'image',
    props: {
      src: 'https://via.placeholder.com/150',
    },
    actions: {
      onEdit: () => console.log('编辑图片块'),
    },
  },
  {
    id: '3',
    type: 'chart',
    props: {
      type: 'bar',
    },
    actions: {
      onFilter: () => console.log('过滤图表数据'),
      onEdit: () => console.log('编辑图表块'),
    },
  },
]
