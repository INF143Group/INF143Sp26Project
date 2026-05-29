import { createRequire } from 'module';
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'
import calendar from './apis/calendar/calendar.js';
import { initializeSignaling } from './apis/video/signaling-server.js';
import { ExpressPeerServer } from 'peer';


const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.route("/api/calendar")
    .get(async (req, res) => {
        let events = await calendar.getEventsJsonForUser(req.query.userId);
        res.send(events);
    })
    .post((req, res) => {
        calendar.catchNewEventRequest(req, res);
    });

const server = app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

const http = require('http');
const peerServer = ExpressPeerServer(server, {
    path: '/peer'
});

app.use("/peer", peerServer);

peerServer.on("connection", (client) => {
    console.log("Peer connected: " + client.getId());
})