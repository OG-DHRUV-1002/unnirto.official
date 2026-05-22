import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Create SMTP transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail address (sender)
        pass: process.env.SMTP_PASS, // Google App Password
      },
    });

    // Compose the email
    const mailOptions = {
      from: `"Unnitro Engagement" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL, // your personal email (receiver)
      replyTo: email, // so you can reply directly to the enquirer
      subject: `🔔 New Engagement Request — ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F1117; color: #E5E7EB; border: 1px solid #2A2F3A; border-radius: 4px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #9E8A26, #556B2F); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #0F1117; letter-spacing: -0.5px;">
              UNNITRO — New Engagement Request
            </h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #9E8A26; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #E5E7EB; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #9E8A26; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Company</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #E5E7EB; font-size: 14px;">${company || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #9E8A26; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2F3A; color: #E5E7EB; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #B8A030; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
            
            <div style="margin-bottom: 8px; color: #9E8A26; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Project Brief
            </div>
            <div style="background: #1A1D24; border: 1px solid #2A2F3A; border-radius: 4px; padding: 16px; color: #E5E7EB; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #0B0D12; padding: 16px 32px; border-top: 1px solid #2A2F3A;">
            <p style="margin: 0; font-size: 11px; color: #555; font-family: monospace;">
              Sent via Unnitro Engagement Form • ${new Date().toISOString()}
            </p>
          </div>
        </div>
      `,
    };

    // Send
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
