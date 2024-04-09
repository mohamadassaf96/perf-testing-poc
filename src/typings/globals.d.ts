import { Httpx } from "../core/httpx"

type User = {
  username: string
  password: string
}

declare global {
  var idp: Httpx
  var api: Httpx
  var users: User[]
}
