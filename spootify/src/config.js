export default{
  api: {
    baseUrl: 'https://api.spotify.com/v1',
    authUrl: 'https://accounts.spotify.com/api/token',
    authorize: 'https://accounts.spotify.com/authorize',
    clientId: '126bd8c5db1042c288301188214dafc1',
    clientSecret: '0b23f78dfda44bbfaaa3faec087b46c4'
  },
  storageKeys: {
    code: 'code',
    accessToken: 'access_token'
  },
  queryParamsApp: {
    code: 'code'
  },
  app: {
    url: 'http://localhost:3000/'
  },
  endpoints: {
    newReleases: '/browse/new-releases',
    featuredPlaylists: '/browse/featured-playlists',
    categories: '/browse/categories'
  }
}
