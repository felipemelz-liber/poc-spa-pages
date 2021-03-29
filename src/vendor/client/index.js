import _ from 'lodash';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Fingerprint2 from 'fingerprintjs2';

export const client = callback => {
  const defaultOptions = {
    preprocessor: null,
    audio: {
      timeout: 1000,
      // On iOS 11, audio context can only be used in response to user interaction.
      // We require users to explicitly enable audio fingerprinting on iOS 11.
      // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      excludeIOS11: true,
    },
    fonts: {
      swfContainerId: 'fingerprintjs2',
      swfPath: 'flash/compiled/FontList.swf',
      userDefinedFonts: [],
      extendedJsFonts: false,
    },
    screen: {
      // To ensure consistent fingerprints when users rotate their mobile devices
      detectScreenOrientation: true,
    },
    plugins: {
      sortPluginsFor: [/palemoon/i],
      excludeIE: false,
    },
    extraComponents: [],
    excludes: {
      // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
      enumerateDevices: true,
      // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
      pixelRatio: true,
      // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
      doNotTrack: true,
      // uses js fonts already
      fontsFlash: true,
      // this was causing a lot of inconsistents fingerprints
      language: true,
    },
    NOT_AVAILABLE: 'not available',
    ERROR: 'error',
    EXCLUDED: 'excluded',
  };

  Fingerprint2.get(defaultOptions, components => {
    const fingerprint = Fingerprint2.x64hash128(
      components.map(component => component.value).join(),
      31,
    );
    const keys = {
      platform: null,
      screenResolution: null,
      userAgent: null,
      timezoneOffset: null,
      webglVendorAndRenderer: null,
    };

    const mappedComponents = {};

    components.map(component => {
      mappedComponents[component.key] = component.value;
      return component;
    });
    const filteredComponents = _.pick(mappedComponents, _.keys(keys));

    callback({ fingerprint, components: filteredComponents });
  });
};

export const getFingerprint = () => new Promise(resolve => client(data => resolve(data)));

export const postAction = (data, breadcrumb, resource, params) => dispatch =>
  axios({
    method: 'POST',
    url: '/client_log.json',
    data: {
      authenticity_token: ReactOnRails.authenticityToken(),
      fingerprint: data.fingerprint,
      components: JSON.stringify(data.components),
      breadcrumb,
      resource,
      ...params,
    },
  })
    .then(response =>
      dispatch({
        type: 'CLIENT_LOG/SUCCESSFULL_SUBMIT',
        payload: response.data,
      }),
    )
    .catch(error =>
      dispatch({
        type: 'CLIENT_LOG/FAILED_SUBMIT',
        payload: error.response.data,
      }),
    );

export const postClientLog = (breadcrumb, resource, params) => dispatch =>
  client(data => dispatch(postAction(data, breadcrumb, resource, params)));
