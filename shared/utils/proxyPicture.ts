export function encodeBase64URL(str: string) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export function decodeBase64URL(str: string) {
  let formatted = str.replace(/-/g, '+').replace(/_/g, '/')
  while (formatted.length % 4) {
    formatted += '='
  }
  return atob(formatted)
}

export function proxyPicture(url: string, type: "encodeURIComponent" | "encodeBase64URL" = "encodeURIComponent") {
  const encoded = type === "encodeBase64URL" ? encodeBase64URL(url) : encodeURIComponent(url)
  return `/api/proxy/img.png?type=${type}&url=${encoded}`
}
