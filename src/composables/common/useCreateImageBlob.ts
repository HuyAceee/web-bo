export const useCreateImageBlob = () => {
  const createImageFromBlob = (data: { type?: string }) => {
    if (!data) return
    const blob = new Blob([data as any], { type: data?.type ?? 'image/png' })
    const imageUrl = URL.createObjectURL(blob)
    return imageUrl
  }

  return {
    createImageFromBlob
  }
}
