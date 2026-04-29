const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Check if we're in demo mode (using fake email credentials)
    if (process.env.EMAIL_USER === 'test@test.com' || !process.env.EMAIL_USER) {
      console.log(`🌈 DEMO MODE: Welcome email would be sent to ${userEmail}`);
      console.log(`🎮 Welcome to RetroTask, ${userName}!`);
      return; // Don't actually send email in demo mode
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Welcome to RetroTask! 🌈',
      html: `
        <div style="font-family: 'Press Start 2P', 'Courier New', monospace; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 30px; border: 4px solid #ec4899; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed; text-align: center; font-size: 24px; margin-bottom: 20px;">🌈 RETROTASK 🌈</h1>
          <h2 style="color: #ec4899; text-align: center; font-size: 16px; margin-bottom: 20px;">Welcome, ${userName}! 🎮</h2>
          <p style="color: #581c87; line-height: 1.6; font-size: 14px; font-family: 'VT323', monospace;">
            Thank you for joining RetroTask! Your colorful SNES-style task management app is ready to use.
          </p>
          <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); color: #1e40af; padding: 20px; margin: 20px 0; border: 4px solid #3b82f6; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #1e40af; font-size: 16px;">🎯 Features Available:</h3>
            <ul style="margin-bottom: 0; font-family: 'VT323', monospace; font-size: 16px; line-height: 1.8;">
              <li>🎮 Create and manage colorful tasks</li>
              <li>🌈 Organize tasks with SNES-style design</li>
              <li>🔐 Secure authentication</li>
              <li>🎨 Bright, cheerful interface</li>
            </ul>
          </div>
          <p style="color: #dc2626; text-align: center; font-style: italic; font-family: 'VT323', monospace; font-size: 16px;">
            ⚠️ Remember: This is a demo application. Do not enter real personal information.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000" style="background-color: #fbbf24; color: #7c3aed; padding: 15px 30px; text-decoration: none; border: 4px solid #7c3aed; border-radius: 8px; display: inline-block; font-family: 'Press Start 2P', cursive; font-size: 12px; box-shadow: 0 6px 0 #7c3aed;">
              🎮 LAUNCH RETROTASK
            </a>
          </div>
          <p style="color: #7c3aed; text-align: center; margin-top: 30px; font-size: 12px; font-family: 'VT323', monospace;">
            RETROTASK © 2026 | Built with React, Node.js, and Lots of Color! 🌈
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`🌈 Welcome email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Don't throw error in demo mode, just log it
    if (process.env.EMAIL_USER === 'test@test.com' || !process.env.EMAIL_USER) {
      console.log('🎮 Demo mode: Email sending skipped');
    } else {
      throw error;
    }
  }
};

const sendTaskReminderEmail = async (userEmail, userName, taskTitle, dueDate) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Task Reminder - RetroTask',
      html: `
        <div style="font-family: 'Courier New', monospace; background-color: #F5E6D3; padding: 20px; border: 2px solid #2C1810;">
          <h1 style="color: #2C1810; text-align: center;">[RETROTASK]</h1>
          <h2 style="color: #FFB000; text-align: center;">Task Reminder</h2>
          <p style="color: #2C1810; line-height: 1.6;">
            Hello ${userName}, this is a friendly reminder about your upcoming task:
          </p>
          <div style="background-color: #FFB000; color: #2C1810; padding: 15px; margin: 20px 0; border: 2px solid #2C1810;">
            <h3 style="margin-top: 0;">Task: ${taskTitle}</h3>
            <p style="margin-bottom: 0;"><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000/dashboard" style="background-color: #6B8E23; color: #F5E6D3; padding: 10px 20px; text-decoration: none; border: 2px solid #2C1810; display: inline-block;">
              [ VIEW DASHBOARD ]
            </a>
          </div>
          <p style="color: #2C1810; text-align: center; margin-top: 30px; font-size: 12px;">
            [RETROTASK] © 2024 | Built with React, Node.js, and Retro Style
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Task reminder email sent successfully');
  } catch (error) {
    console.error('Error sending task reminder email:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendTaskReminderEmail,
};
