const webpush = require('web-push');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase)

const vapidKeys = {
  "publicKey": "BAvDMcexg3uaneVs-6pFGMVFw2PPUkIKEtgj5N4t-bB3Fcednt6kN3qQ4tMy3vNBkZmgxnKhQA5Y6sueaRJyehE",
  "privateKey": "Lr5-idXcQ7OlgTBjN2H1IDgyBWiRrC312Ad-8D8BReQ"
};

webpush.setVapidDetails(
  'mailto:kneefer@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscribeApp = getExpress();
subscribeApp.post("*", subscribe);

const sendNewsletterApp = getExpress();
sendNewsletterApp.get("*", sendNewsletter)

const subscribeApi = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return subscribeApp(request, response)
})

const sendNewsletterApi = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return sendNewsletterApp(request, response)
})

function getExpress() {
  const app = express()
  app.use(cors({
    origin: true
  }))
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json())
  return app;
}

function subscribe(req, res) {
  console.log('Received user\'s subscription');
  admin.firestore().collection('subscriptions').add(req.body).then(x => {
    res.status(200).json({
      status: "ok"
    });
  });
}

function sendNewsletter(req, res) {
  admin.firestore().collection('subscriptions').get().then(x => {
    const allSubscriptions = x.docs.map(y => y.data());
    console.log('Total subscriptions', allSubscriptions.length);

    const notificationPayload = {
      "notification": {
        "title": "Card Collector",
        "body": "Newsletter Available!",
        "icon": "assets/icons/icon-144x144.png",
        "vibrate": [100, 50, 100],
        "data": {
          "dateOfArrival": Date.now(),
          "primaryKey": 1
        },
        "actions": [{
          "action": "explore",
          "title": "Go to the site"
        }]
      }
    };

    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))))
      .then(() => res.status(200).json({
        message: 'Newsletter sent successfully.'
      }))
      .catch(err => {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
      });
  });
}

module.exports = {
  subscribeApi,
  sendNewsletterApi
}
