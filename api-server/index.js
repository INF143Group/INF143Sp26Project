import {createRequire} from 'module';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import {ExpressPeerServer} from 'peer';
import {validateToken} from "./utils.js";
import calendar from './apis/calendar/calendar.js';
import mail from "./apis/mail/mail.js";


const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.route("/api/calendar")
    .get(async (req, res) => {
        let events = await calendar.getEventsJsonForUser(validateToken(req), req.query.userId);
        res.send(events);
    })
    .post((req, res) => {
        calendar.catchNewEventRequest(req, res);
    });
app.route("/api/mail/send-interview-email").post(async (req, res) => {
    mail.processInterviewEmailRequest(req, res);
});
app.route("/api/mail/send-help-email").post(async (req, res) => {
    mail.processHelpEmailRequest(req, res);
});

const server = app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

const http = require('http');
const peerServer = ExpressPeerServer(server, {
    path: '/'
});

app.use("/peer", peerServer);

peerServer.on("connection", (client) => {
    console.log("Peer connected: " + client.getId());
})