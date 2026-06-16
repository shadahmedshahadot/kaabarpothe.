export interface DecodedUser {
  id: string
  email: string
  role: 'ADMIN' | 'USER'
  name?: string
  iat?: number
  exp?: number
}

export const decodeJwt = (token: string): DecodedUser | null => {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4)
    const json =
      typeof window !== 'undefined'
        ? atob(padded)
        : Buffer.from(padded, 'base64').toString('utf-8')
    return JSON.parse(json) as DecodedUser
  } catch {
    return null
  }
}
