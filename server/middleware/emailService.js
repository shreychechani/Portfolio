import nodemailer from 'nodemailer'

const createTransporter = () => {
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

  const notificationEmail = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `📬 New Portfolio Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #f4f4f8;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #f97316, #fb923c);
              padding: 32px 28px;
              color: white;
            }
            .body { padding: 28px; }
            .field {
              margin-bottom: 20px;
              padding: 16px 18px;
              background: #f9fafb;
              border-radius: 8px;
              border-left: 4px solid #f97316;
            }
            .field-label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #9ca3af;
            }
            .field-value {
              font-size: 15px;
              color: #111827;
            }
            .footer {
              padding: 16px 28px;
              background: #f9fafb;
              font-size: 12px;
              color: #9ca3af;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            <div class="body">
              <div class="field">
                <div class="field-label">From</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </div>
          </div>
        </body>
      </html>
    `,
  }

  const autoReplyEmail = {
    from: `"Shrey Chechani" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #f4f4f8;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .header {
              background: #0b1628;
              padding: 32px;
              color: white;
              text-align: center;
            }
            .body { padding: 32px; }
            .text {
              font-size: 15px;
              color: #4b5563;
              line-height: 1.7;
            }
            .footer {
              padding: 16px;
              font-size: 12px;
              text-align: center;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Portfolio</h2>
            </div>
            <div class="body">
              <p class="text">
                Hey ${name}, thanks for reaching out! I’ll get back to you soon.
              </p>
              <p class="text">
                Your message: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"
              </p>
            </div>
            <div class="footer">
              This is an automated reply.
            </div>
          </div>
        </body>
      </html>
    `,
  }

  await Promise.all([
    transporter.sendMail(notificationEmail),
    transporter.sendMail(autoReplyEmail),
  ])

  console.log(`Emails sent to ${process.env.EMAIL_TO} and ${email}`)
}