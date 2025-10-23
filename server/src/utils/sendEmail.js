import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });

export async function sendEmail({ to, subject, text, html }) {
  const from = new Sender(process.env.FROM_EMAIL, "Schick & Associates");
  const recipients = [new Recipient(to)];

  const params = new EmailParams()
    .setFrom(from)
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html || (text ? `<pre>${text}</pre>` : ""))
    .setText(text || "");

  await mailerSend.email.send(params);
  console.log("✅ Email sent via MailerSend to:", to);
}
