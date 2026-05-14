export const arrayMove = <T extends any[]>(arr: T, fromIndex: number, toIndex: number) => {
  const newArr = arr.slice()
  newArr.splice(toIndex < 0 ? newArr.length + toIndex : toIndex, 0, newArr.splice(fromIndex, 1)[0])
  return newArr
}
