const webpush = require('web-push');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const vapidKeys = {
  "publicKey": "BAvDMcexg3uaneVs-6pFGMVFw2PPUkIKEtgj5N4t-bB3Fcednt6kN3qQ4tMy3vNBkZmgxnKhQA5Y6sueaRJyehE",
  "privateKey": "Lr5-idXcQ7OlgTBjN2H1IDgyBWiRrC312Ad-8D8BReQ"
};

webpush.setVapidDetails(
  'mailto:kneefer@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

const allSubscriptions = [];

app.route('/api/subscribe').post(subscribe);
app.route('/api/publish').get(sendNewsletter);
app.listen(3000)

function subscribe(req, res) {
  console.log('Received user\'s subscription');
  allSubscriptions.push(req.body);
  res.status(200).json({
    status: "ok"
  });
}

function sendNewsletter(req, res) {

  console.log('Total subscriptions', allSubscriptions.length);

  const notificationPayload = {
    "notification": {
      "title": "Angular News",
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

  Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload))))
    .then(() => res.status(200).json({
      message: 'Newsletter sent successfully.'
    }))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
}
