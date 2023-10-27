export function TokenExists() {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');

  return !!(accessToken || refreshToken);
}

export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}

export function setAccessToken(token: string) {
  sessionStorage.setItem('accessToken', token);
}

export function setRefreshToken(token: string) {
  sessionStorage.setItem('refreshToken', token);
}

export function removeTokens() {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
}
