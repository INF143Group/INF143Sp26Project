import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

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

export async function sendInterviewEmailNotification(toEmail, otherPerson, date, time) {
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

    console.log("Email sent successfully to " + toEmail);
    return true;
}

