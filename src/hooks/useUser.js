export function useUser() {
  const cookie = document.cookie
  if (cookie) {
    return {
      id: cookie.match(/userId=(?<id>[^;]+);?$/).groups.id,
      name: cookie.match(/userName=(?<name>[^;]+);?/).groups.name
    }
  }
  return {}
}

export function getUserFromCookie() {
  const cookie = document.cookie
  if (cookie) {
    return {
      id: cookie.match(/userId=(?<id>[^;]+);?$/).groups.id,
      name: cookie.match(/userName=(?<name>[^;]+);?/).groups.name
    }
  }
  return {}
}
