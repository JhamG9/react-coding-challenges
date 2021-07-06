import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import config from '../../../config';
import { getCategoriesSpotify, getFeatPlaylistsSpotify, getNewReleasesSpotify, getTokenSpotify } from '../../../actions/discover';
import { getCode, getToken } from '../../../utils/utils';

export default class Discover extends Component {

  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      showButtonAuthorization: true
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get(config.queryParamsApp.code)) {
      localStorage.setItem(config.storageKeys.code, urlParams.get('code'));
    }

    let token = getToken();
    if (token) {
      this.setState({
        showButtonAuthorization: false
      });
      this.loadInformationSpotify();
    } else {
      this.issetCodePermission();
    }
  }

  /**
   * Method show button get permission if don't isset 
   * code spotify in localstorage
   */
  issetCodePermission() {
    if (getCode()) {
      getTokenSpotify();
    }
  }

  /**
   * Method load information for show of spotify
   */
  loadInformationSpotify() {
    // Get new releases
    getNewReleasesSpotify().then((resp) => {
      this.setState({
        newReleases: resp.data.albums.items
      });
    });

    // Get feature playlist of spotify
    getFeatPlaylistsSpotify().then((resp) => {
      this.setState({
        playlists: resp.data.playlists.items
      });
    });

    // Get categories
    getCategoriesSpotify().then((resp) => {
      this.setState({
        categories: resp.data.categories.items
      });
    })

  }

  /**
   * Method return link for permissions of spotify
   * @returns string url
   */
  getLinkPermissionSpotify() {
    return `${config.api.authorize}?client_id=${config.api.clientId}&response_type=code&redirect_uri=${config.app.url}&scope=user-read-private%20user-read-email&state=34fFs29kd09`;
  }

  render() {
    const { newReleases, playlists, categories, showButtonAuthorization } = this.state;

    return (
      <div className="discover">
        {showButtonAuthorization &&
          <button className="discover__btn__permission">
            <a href={this.getLinkPermissionSpotify()}>
              Get permission Spotify
            </a>
          </button>}

        {!showButtonAuthorization &&
          <div>
            <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
            <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
            <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
          </div>
        }
      </div>
    );
  }



}
