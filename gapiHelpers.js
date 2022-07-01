import {state} from './view.js';

async function getToken(err) {

  if (err.message == 'NULL get_token' ||
      err.response.error.code == 401 ||
      (err.response.error.code == 403) /* &&
      (err.response.error.status == "PERMISSION_DENIED") */
      
     ) {

    // The access token is missing, invalid, or expired, prompt for user consent to obtain one.
    await new Promise((resolve, reject) => {
      try {
        // Settle this promise in the response callback for requestAccessToken()
        tokenClient.callback = (resp) => {
          if (resp.error !== undefined) {
            reject(resp);
          }
          // GIS has automatically updated gapi.client with the newly issued access token.
          console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
          resolve(resp);
        };
        tokenClient.requestAccessToken();
      } catch (err) {
        console.log(err)
      }
    });
  } else {
    // Errors unrelated to authorization: server errors, exceeding quota, bad requests, and so on.
    throw new Error(err);
  }
}

function reqwNULL() {
  // can I run code with a potential TypeError?
  // for REST API reference:
  // https://developers.google.com/calendar/api/v3/reference/events/insert
  try {
      return(m.request({
        method: "POST",
        url: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        headers: {
          Authorization: `Bearer ${gapi.client.getToken().access_token}`
        },
        body: {
          "summary": state.habit,
          "start": {
            "dateTime": new Date(state.entryDate.replace(/-/g, '/') + " " + state.beginTime).toISOString(),
            "timeZone": "Australia/Brisbane"
          },
          "end": {
            "dateTime": new Date(state.entryDate.replace(/-/g, '/') + " " + state.endTime).toISOString(),
            "timeZone": "Australia/Brisbane"
          }
        }
    }));
  }
  catch {
    throw new Error('NULL get_token');
  }
}

function reqWRetry() {
  try {
    reqwNULL()
    .then(calendarAPIResponse => {
      gapiOutput += JSON.stringify(calendarAPIResponse);    
    });
  }
  catch(err) {
    console.log(JSON.stringify(`RECEIVED: ${err.message}`));
    getToken(err)
      .then(x => reqWRetry()); 
   };
}

function revokeToken() {
  let cred = gapi.client.getToken();
  if (cred !== null) {
    google.accounts.oauth2.revoke(cred.access_token, () => {console.log('Revoked: ' + cred.access_token)});
    gapi.client.setToken('');
  }
}

export {reqWRetry};