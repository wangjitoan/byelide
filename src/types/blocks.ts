export type baseBlock={
  id: string
  type: string
}
export type imageBlock=baseBlock & {
  type: 'image'
  props:{
    src: string
  }
  actions:{
    onEdit: () => void
  }
}
export type textBlock=baseBlock & {
  type: 'text'
  props:{
    content: string
  }
  actions:{
    onCopy: () => void
    onEdit: () => void
  }
}
export type chartBlock=baseBlock & {
  type: 'chart'
  props:{
    type: string
  },
  actions:{
    onFilter: () => void
    onEdit: () => void
  }
}

export type Block=imageBlock | textBlock | chartBlock
