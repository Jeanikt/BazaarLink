import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "atendimento@gpstech.com.br",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log("Received email:", email);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log("Generated verification code:", verificationCode);

    // Store the verification code in Supabase
    console.log("Storing verification code in Supabase...");
    const { error: supabaseError } = await supabase
      .from("verification_codes")
      .insert({
        email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
      });

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      throw new Error(`Supabase error: ${supabaseError.message}`);
    }

    // Send email
    console.log("Preparing to send email...");
    const mailOptions = {
      from: '"BazaarLink" <atendimento@gpstech.com.br>',
      to: email,
      subject: "Seu código de verificação BazaarLink",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <table style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background-color: #f9f9f9;">
            <tr>
              <td style="text-align: center;">
                <h1 style="color: #007BFF;">Bem-vindo ao BazaarLink!</h1>
                <p style="font-size: 16px; color: #555;">
                  Para verificar sua conta, use o código abaixo.
                </p>
                <div style="display: inline-block; padding: 15px 25px; margin-top: 20px; background-color: #007BFF; color: #fff; font-size: 24px; font-weight: bold; border-radius: 5px;">
                  ${verificationCode}
                </div>
                <p style="font-size: 14px; color: #999; margin-top: 30px;">
                  Este código expira em 15 minutos. Se você não solicitou este email, ignore esta mensagem.
                </p>
                <hr style="border: none; height: 1px; background-color: #ddd; margin: 40px 0;">
                <p style="font-size: 12px; color: #888;">
                  © ${new Date().getFullYear()} BazaarLink. Todos os direitos reservados.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    console.log("Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST handler:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Falha ao enviar o email de verificação: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Falha ao enviar o email de verificação: Erro desconhecido" },
        { status: 500 }
      );
    }
  }
}

// Test the email configuration
export async function GET() {
  try {
    console.log("Testing email configuration...");
    await transporter.verify();
    console.log("Email configuration is correct");
    return NextResponse.json({
      success: true,
      message: "Email configuration is correct",
    });
  } catch (error) {
    console.error("Email configuration error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Email configuration error: ${error.message}` },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Email configuration error: Unknown error" },
        { status: 500 }
      );
    }
  }
}
