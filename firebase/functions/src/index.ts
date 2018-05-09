import * as webpush from 'web-push';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const vapidKeys = {
  "publicKey": "BAvDMcexg3uaneVs-6pFGMVFw2PPUkIKEtgj5N4t-bB3Fcednt6kN3qQ4tMy3vNBkZmgxnKhQA5Y6sueaRJyehE",
  "privateKey": functions.config().vapidkeys.private
};

admin.initializeApp(functions.config().firebase);

export const subscribeApi = getHttpsFunction(getExpress().post("*", subscribe));
export const sendNewsletterApi = getHttpsFunction(getExpress().get("*", sendNewsletter));

async function subscribe(req, res): Promise<void> {
  console.log('Received user\'s subscription');
  await admin.firestore()
    .collection('subscriptions')
    .add(req.body);
  res.status(200).json({ status: "ok" });
}

async function sendNewsletter(req: express.Request, res: express.Response): Promise<void> {
  const subscriptions = (await admin.firestore().collection('subscriptions').get()).docs;

  console.log('Total subscriptions', subscriptions.length);
  if (subscriptions.length === 0) {
    res.status(200).json({ message: 'No subscriptions' });
    return;
  }

  initializeWebPush();

  const notificationPayload = JSON.stringify(getNotificationPayload());

  const failed: FirebaseFirestore.QueryDocumentSnapshot[] = [];

  await Promise.all(subscriptions.map(sub => {
    return webpush
      .sendNotification(sub.data(), notificationPayload)
      .catch(err => {
        failed.push(sub);
        return err;
      });
  }));

  if (failed.length > 0) {
    await Promise.all(failed.map(sub => {
      return sub.ref.delete();
    }));
  }

  res.status(200).json({ message: `Newsletters (${subscriptions.length - failed.length}/${subscriptions.length}) sent successfully.` });
}

function getNotificationPayload(): any {
  return {
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
}

function getHttpsFunction(app: express.Express): functions.HttpsFunction {
  return functions.https.onRequest((request, response) => {
    if (!request.path) {
      request.url = `/${request.url}`;
    }
    return app(request, response);
  });
}

function initializeWebPush(): void {
  webpush.setVapidDetails(
    'mailto:example@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

function getExpress(): express.Express {
  return express()
    .use(cors({ origin: true }))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());
}