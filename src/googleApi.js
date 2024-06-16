// googleApi.js
import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_KEY
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export const initGoogleApi = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: SCOPES,
    });
  });
};
