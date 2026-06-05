import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {validateToken} from "../../utils.js";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: "inf143sp26group@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

async function sendInterviewEmailNotification(toEmail, otherPerson, date, time) {
    console.log("Preparing to send email to " + toEmail + " about interview with " + otherPerson + " on " + date + " at " + time);
    if (!toEmail || !otherPerson || !date || !time) {
        console.error("Missing required parameters for sending email notification.");
        return false;
    }

    try {
        const res = await transporter.sendMail({
            from: `inf143sp26group@gmail.com`,
            to: toEmail,
            subject: "New Interview from PivotStack",
            html: "<p>You have a new interview scheduled with <b>" + otherPerson + "</b> on " + date + " at " + time + ".</p>",
        });
        if (res.rejected.length > 0) {
            console.warn("Some recipients were rejected:", res.rejected);
            return false;
        }
    } catch (err) {
        switch (err.code) {
            case "ECONNECTION":
            case "ETIMEDOUT":
            console.error("Network error - retry later:", err.message);
            break;
            case "EAUTH":
            console.error("Authentication failed:", err.message);
            break;
            case "EENVELOPE":
            console.error("Invalid recipients:", err.rejected);
            break;
            default:
            console.error("Send failed:", err.message);
        }
        return false;
    }

    console.log("Email send success");
    return true;
}

async function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = [];
        let parsedBody = null;
        req.on('data', chunk => { 
            body.push(chunk);
        });
        req.on('end', async () => {
            parsedBody = JSON.parse(Buffer.concat(body).toString());

            let auth = req.headers.authorization;
            if (auth?.split(" ").length !== 2 || auth.split(" ")[0] !== "Bearer"){
                res.status(401).send({
                    success: false,
                    message: "Unauthorized: Invalid or missing token"
                });
                reject("Unauthorized: Invalid or missing token");
            }
            
            let token = validateToken(req);
            if (!token){
                res.status(401).send({
                    success: false,
                    message: "Unauthorized: Invalid or missing token"
                });
                reject("Unauthorized: Invalid or missing token");
            }

            resolve(parsedBody);
        });
        req.on("error", (err) => {
            res.status(401).send({
                success: false,
                message: "Unauthorized: Invalid or missing token"
            });
            reject(err);
        });
    })
}

async function processEmailRequest(req, res) {
    let body = await parseBody(req);
    if (!body) {
        res.status(401).send({
            success: false,
            message: "Unauthorized: Message Body Unable to be parsed."
        });
        return;
    };

    let response = await sendInterviewEmailNotification(body.toEmail, body.otherPerson, body.date, body.time);

    if (response==false){
        res.status(401).send({
            success: false,
            message: "Could not send email, please try again later."
        });
        return;
    };

    res.status(200).send({
        success: true,
        message: "Email sent successfully."
    })
}

export default{processEmailRequest};