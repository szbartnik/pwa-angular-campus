// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  notificationsPublicKey: 'BAvDMcexg3uaneVs-6pFGMVFw2PPUkIKEtgj5N4t-bB3Fcednt6kN3qQ4tMy3vNBkZmgxnKhQA5Y6sueaRJyehE',
  subscribeEndpoint: 'http://localhost:5000/pwa-angular-campus/us-central1/subscribeApi',
  firebase: {
    apiKey: 'AIzaSyCXRL9U96v8i404SpGkG0Wivi9J0FrXcg8',
    authDomain: 'pwa-angular-campus.firebaseapp.com',
    databaseURL: 'https://pwa-angular-campus.firebaseio.com',
    projectId: 'pwa-angular-campus',
    storageBucket: 'pwa-angular-campus.appspot.com',
    messagingSenderId: '967297410548'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
