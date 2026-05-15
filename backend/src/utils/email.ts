import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const emailService = {
  send: async (to: string, subject: string, html: string) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html,
      })
    } catch (error) {
      console.error('Email send error:', error)
      throw error
    }
  },

  sendWelcome: async (email: string, firstName: string) => {
    const html = `
      <h2>Welcome to CRM SaaS Platform, ${firstName}!</h2>
      <p>Your account has been created successfully.</p>
      <p>You can now log in with your email and password.</p>
    `
    return emailService.send(email, 'Welcome to CRM SaaS', html)
  },

  sendPasswordReset: async (email: string, resetToken: string) => {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
    const html = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link expires in 1 hour.</p>
    `
    return emailService.send(email, 'Password Reset', html)
  },

  sendTaskAssignment: async (email: string, taskTitle: string, assignedBy: string) => {
    const html = `
      <h2>New Task Assigned</h2>
      <p><strong>${assignedBy}</strong> assigned you a task:</p>
      <p><strong>${taskTitle}</strong></p>
    `
    return emailService.send(email, 'New Task Assignment', html)
  },
}
