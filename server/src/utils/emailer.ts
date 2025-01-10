import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;

export const createTransporter = (): nodemailer.Transporter<SMTPTransport.SentMessageInfo> =>
  nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: SENDER_EMAIL!,
      pass: SENDER_PASSWORD!,
    },
  });

export const sendMail = async (
  transporter: nodemailer.Transporter,
  to: string,
  html: string,
  subject: string,
  cc?: string[]
) => {
  await transporter.sendMail({
    from: SENDER_EMAIL!,
    to: to,
    cc: cc,
    subject: subject,
    html: html,
  });
};
