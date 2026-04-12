import nodemailer from 'nodemailer'

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER or EMAIL_PASS missing from .env file')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export const sendContactEmail = async ({ name, email, message }) => {

  const transporter = createTransporter()

  await transporter.verify()

  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const toYou = {
    from: `"Shrey's Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: `"${name}" <${email}>`,
    subject: `New message from ${name} — Portfolio`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#0b1628 0%,#1e3a5f 100%);padding:32px 28px;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.1em;">Portfolio Contact Form</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;">📬 New Message Received</h1>
    </div>

    <div style="padding:28px;">

      <div style="margin-bottom:16px;padding:16px 18px;background:#f8fafc;border-radius:10px;border-left:4px solid #f97316;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">From</p>
        <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;">${name}</p>
      </div>

      <div style="margin-bottom:16px;padding:16px 18px;background:#f8fafc;border-radius:10px;border-left:4px solid #f97316;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">Email (click to reply)</p>
        <a href="mailto:${email}" style="margin:0;font-size:15px;font-weight:600;color:#f97316;text-decoration:none;">${email}</a>
      </div>

      <div style="margin-bottom:16px;padding:16px 18px;background:#f8fafc;border-radius:10px;border-left:4px solid #f97316;">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">Message</p>
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;white-space:pre-wrap;">${message}</p>
      </div>

      <div style="text-align:center;margin-top:24px;">
        <a href="mailto:${email}?subject=Re: Your message on my portfolio&body=Hi ${name},%0A%0AThanks for reaching out!%0A%0A"
           style="display:inline-block;background:#f97316;color:#ffffff;text-decoration:none;padding:13px 32px;border-radius:10px;font-weight:700;font-size:14px;">
          ↩ Reply to ${name}
        </a>
      </div>

    </div>

    <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        Received ${now} IST • Hit <strong>Reply</strong> to respond directly to ${name}
      </p>
    </div>

  </div>
</body>
</html>
    `,
  }

  const toThem = {
    from: `"Shrey Chechani" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message, ${name}! I'll be in touch soon`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#0b1628 0%,#1e3a5f 100%);padding:36px 28px;text-align:center;">
      <div style="font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
        Portfolio<span style="color:#f97316;">.</span>
      </div>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">Shrey Chechani</p>
    </div>

    <div style="padding:36px 28px;">

      <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0f172a;">
        Hey ${name}!
      </h2>

      <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.75;">
        Thanks for reaching out through my portfolio. I've received your
        message and will get back to you as soon as possible —
        usually within <strong style="color:#0f172a;">24–48 hours</strong>.
      </p>

      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:16px 18px;margin:20px 0;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#c2410c;">Your message</p>
        <p style="margin:0;font-size:14px;color:#9a3412;line-height:1.65;font-style:italic;">
          "${message.length > 120 ? message.substring(0, 120) + '...' : message}"
        </p>
      </div>

      <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.75;">
        While you wait, feel free to check out my work below!
      </p>

      <div style="display:flex;gap:12px;">
        <a href="https://github.com/shreychechani"
           style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:9px;font-weight:600;font-size:13px;margin-right:10px;">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/shrey-chechani-56a28a205/"
           style="display:inline-block;background:#0077b5;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:9px;font-weight:600;font-size:13px;">
          LinkedIn
        </a>
      </div>

    </div>

    <div style="padding:16px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        This is an automated confirmation. Reply to this email or contact me at
        <a href="mailto:shreychechani@gmail.com" style="color:#f97316;text-decoration:none;">shreychechani@gmail.com</a>
      </p>
    </div>

  </div>
</body>
</html>
    `,
  }

  const results = await Promise.all([
    transporter.sendMail(toYou),
    transporter.sendMail(toThem),
  ])

  console.log(`Email sent to you: ${results[0].messageId}`)
  console.log(`Auto-reply sent to ${email}: ${results[1].messageId}`)

  return results
}