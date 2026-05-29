import { createRequire } from 'module';
//import { createClient } from '@supabase/supabase-js'
import calendar from './apis/calendar/calendar.js';
import * as problems from "./apis/problems/problems.ts";
import * as users from "./apis/users/users.ts";


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
        calendar.catchNewEventRequest(req, res);
    });

app.route("/api/problems")
    .get(async (req, res) => {
        const isAdmin = await users.isAdmin(req.query.userId);
        const problems = isAdmin
            ? await problems.getAllProblems()
            : await problems.getApprovedProblems();
        res.send(problems);
    })
    .post(async (req, res) => {
        await problems.submitProblem(req, res);
    });

app.route("/api/problems/:id")
    .get(async (req, res) => {
        const problem = await problems.getProblemById(req.params.id);
        if (!problem) return res.status(404).send({ success: false, msg: "Problem not found"});
        res.send(problem);
    });

app.route("/api/problems/:id/review")
    .patch(async (req, res) => {
        const isAdmin = await users.isAdmin(req.body.userId);
        if (!isAdmin) return res.status(403).send({ success: false, msg: "Forbidden"});
        await problems.reviewProblem(req, res);
    });

app.listen(8080, (req, res) => {
    console.log("Server is running on port 8080");
});