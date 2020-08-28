export const oauth2SignInLink = {
  path: 'https://accounts.spotify.com/authorize',
  clientId: `?client_id=${process.env.REACT_APP_CLIENT_ID}&`,
  responseType: '&response_type=code',
  redirectUri: `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
  scopes: '&scope=user-top-read',
};

export const signInRequestBody = {
  path: 'https://accounts.spotify.com/api/token',
  grant_type: 'authorization_code',
  client_id: process.env.REACT_APP_CLIENT_ID || 'defaults',
  client_secret: process.env.REACT_APP_CLIENT_SECRET || 'defaults',
  redirect_uri: process.env.REACT_APP_REDIRECT_URI || 'defaults',
};
