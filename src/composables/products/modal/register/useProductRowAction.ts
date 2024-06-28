let id: number = 1
export const useProductRowAction = <T>(data: T[]) => {
  const increaseRow = (index: number) => {
    id++
    data.splice(index + 1, 0, { id } as T)
  }

  const decreaseRow = (index: number) => {
    if (data?.length > 1) {
      return data.splice(index, 1)
    }
    data.splice(index, 1, { id } as T)
  }

  return { increaseRow, decreaseRow }
}
