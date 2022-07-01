var gapiLoadOkay = () => {return "OVERRIDE"}; 
var gisLoadOkay = () => {return "OVERRIDE"};    
var gapiLoadFail = () => {return "OVERRIDE"}; 
var gisLoadFail = () => {return "OVERRIDE"};    

var gapiOutput = 'GAPI Output Log:';

// refer to:
// https://stackoverflow.com/questions/26150232/resolve-javascript-promise-outside-the-promise-constructor-scope
// to get an idea of what's happening with
// gapiLoadPromise and gisLoadPromise

const gapiLoadPromise = new Promise((resolve, reject) => {
  // thsi works because JS variables can be declared
  // with var and then become global (not wise)
  // ref: https://www.tutorialsteacher.com/javascript/javascript-variable#:~:text=The%20variables%20declared%20without%20the,overwrite%20an%20existing%20global%20variable.
  gapiLoadOkay = resolve;
  gapiLoadFail = reject;
});
const gisLoadPromise = new Promise((resolve, reject) => {
  gisLoadOkay = resolve;
  gisLoadFail = reject;
});

var tokenClient;
var gapiLog = document.getElementById('gapiLog');   

(async () => {
  // First, load and initialize the gapi.client
  await gapiLoadPromise;
  await new Promise((resolve, reject) => {
    // NOTE: the 'auth2' module is no longer loaded.
    gapi.load('client', {callback: resolve, onerror: reject});
  });
  gapiLog.innerHTML += 'GAPI loaded.<br/>';
  await gapi.client.init({
  })
  .then(function() {  // Load the Calendar API discovery document.
    gapiLog.innerHTML += 'GAPI initiated.<br/>';
    gapi.client.load('calendar', 'v3');
  })
  .then(function() {
    gapiLog.innerHTML += 'Calendar loaded.<br/>';
  });

  // Now load the GIS client
  await gisLoadPromise;
  gapiLog.innerHTML += 'GIS loaded.<br/>';
    await new Promise((resolve, reject) => {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: '868235411176-l4v3i9b81cidonbr1hf8kkhbsbrbdhdj.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/calendar.events.owned',
            callback: '',  // defined at request time in await/promise scope.
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    }).then(function() {
      gapiLog.innerHTML += 'Token Client initiated.<br/>';
    });

  gapiLog.innerHTML += 'Reached end of IIFE.<br/>';
})();