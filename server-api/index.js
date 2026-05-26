import { createRequire } from 'module';
import { createClient } from '@supabase/supabase-js'
import calendar from './apis/calendar/calendar.js';


const require = createRequire(import.meta.url);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());



// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_SECRET_KEY
// )

app.route("/api/calendar")
    .get(async (req, res) => {
        let events = await calendar.getEventsJsonForUser(req.query.userId);
        res.send(events);
    })
    .post((req, res) => {
    calendar.uploadEvent(req.body).then((status) => {
        res.send(status)
        });
    });

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
});