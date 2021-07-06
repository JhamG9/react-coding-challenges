import http from "../api/api";
import config from "../config";

/**
 * Method get token of spotify and save in storage
 */
export const getTokenSpotify = () => {
    const details = {
        'grant_type': 'authorization_code',
        'code': localStorage.getItem(config.storageKeys.code),
        'redirect_uri': config.app.url,
        'client_secret': config.api.clientSecret,
        'client_id': config.api.clientId
    };

    const data = new URLSearchParams(details);
    http.post(config.api.authUrl, data).then((resp) => {
        localStorage.setItem(config.storageKeys.accessToken, resp.data.access_token);
        window.location.replace('/');
    });
}

/**
 * Method return promise of new-releases
 * @returns promise
 */
export const getNewReleasesSpotify = () => {
    return http.get(`${config.api.baseUrl}${config.endpoints.newReleases}`);
}

/**
 * Method return promise of feature-playlist
 * @returns promise
 */
export const getFeatPlaylistsSpotify = () => {
    return http.get(`${config.api.baseUrl}${config.endpoints.featuredPlaylists}`);
}

/**
 * Method return promise categories
 * @returns promise
 */
export const getCategoriesSpotify = () => {
    return http.get(`${config.api.baseUrl}${config.endpoints.categories}`);
}
