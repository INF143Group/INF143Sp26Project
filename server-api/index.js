import { createRequire } from 'module';
import { createClient } from '@supabase/supabase-js'
import { Server } from 'socket.io';
import 'dotenv/config'
import calendar from './apis/calendar/calendar.js';
import { initializeSignaling } from './apis/video/signaling-server.js';


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

const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
initializeSignaling(io);

server.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
});