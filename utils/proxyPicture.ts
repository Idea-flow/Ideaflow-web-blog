export function encodeBase64URL(str: string) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function decodeBase64URL(str: string) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

export function proxyPicture(url: string, type: "encodeURIComponent" | "encodeBase64URL" = "encodeURIComponent") {
  const encoded = type === "encodeBase64URL" ? encodeBase64URL(url) : encodeURIComponent(url);
  return `/api/proxy/img.png?type=${type}&url=${encoded}`;
}