"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vapidKeys = {
    "publicKey": "BAvDMcexg3uaneVs-6pFGMVFw2PPUkIKEtgj5N4t-bB3Fcednt6kN3qQ4tMy3vNBkZmgxnKhQA5Y6sueaRJyehE",
    "privateKey": "Lr5-idXcQ7OlgTBjN2H1IDgyBWiRrC312Ad-8D8BReQ"
};
admin.initializeApp(functions.config().firebase);
exports.subscribeApi = getHttpsFunction(getExpress()
    .post("*", subscribe));
exports.sendNewsletterApi = getHttpsFunction(getExpress()
    .get("*", sendNewsletter));
function subscribe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Received user\'s subscription');
        yield admin.firestore()
            .collection('subscriptions')
            .add(req.body);
        res.status(200).json({ status: "ok" });
    });
}
function sendNewsletter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptions = (yield admin.firestore().collection('subscriptions').get()).docs;
        console.log('Total subscriptions', subscriptions.length);
        if (subscriptions.length === 0) {
            res.status(200).json({ message: 'No subscriptions' });
            return;
        }
        initializeWebPush();
        const notificationPayload = JSON.stringify(getNotificationPayload());
        const failed = [];
        yield Promise.all(subscriptions.map(sub => {
            return webpush
                .sendNotification(sub.data(), notificationPayload)
                .catch(err => {
                failed.push(sub);
                return err;
            });
        }));
        if (failed.length > 0) {
            yield Promise.all(failed.map(sub => {
                sub.ref.delete();
            }));
        }
        res.status(200).json({ message: `Newsletters (${subscriptions.length - failed.length}/${subscriptions.length}) sent successfully.` });
    });
}
function getNotificationPayload() {
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
function getHttpsFunction(app) {
    return functions.https.onRequest((request, response) => {
        if (!request.path) {
            request.url = `/${request.url}`;
        }
        return app(request, response);
    });
}
function initializeWebPush() {
    webpush.setVapidDetails('mailto:example@example.com', vapidKeys.publicKey, vapidKeys.privateKey);
}
function getExpress() {
    return express()
        .use(cors({ origin: true }))
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bodyParser.json());
}
//# sourceMappingURL=index.js.map