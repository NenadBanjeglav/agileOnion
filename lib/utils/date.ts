export const formatDate = (value?: string) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('sr-Latn-RS', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
