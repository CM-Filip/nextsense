export type User = {
  id: number
  username: string
}
export type Session = SessionData | null
export type SessionData = {
  user: User
  token: string
}
export type TokenData = {
  sub: number
  user: string
  iat: number
}