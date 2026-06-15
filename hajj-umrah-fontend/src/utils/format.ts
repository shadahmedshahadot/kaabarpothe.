export const formatCurrency = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) =>
  new Date(date).toLocaleDateString('en-US', options ?? { year: 'numeric', month: 'short', day: 'numeric' })

export const formatRelativeDate = (date: string | Date) => {
  const diff = (Date.now() - new Date(date).getTime()) / 1000
  if (diff < 60) return 'এইমাত্র'
  if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘণ্টা আগে`
  if (diff < 604800) return `${Math.floor(diff / 86400)} দিন আগে`
  return formatDate(date)
}

export const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n)
