import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {

    const { email, oobCode } = await req.json();

    if (!email || !oobCode) {
      console.warn("Missing email or oobCode");
      return NextResponse.json(
        { error: "Email and oobCode are required" },
        { status: 400 }
      );
    }

    // Create verification link (your custom domain)
    const verifyUrl = `${process.env.APP_URL}/verify?oobCode=${oobCode}`;

    // Configure SMTP (Gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Patvirtinkite savo el. pašto adresą",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
          <h2>Sveiki!</h2>
          <p>Prašome patvirtinti savo el. pašto adresą paspaudę nuorodą žemiau:</p>
          <p>
            <a href="${verifyUrl}" 
               style="
                 display:inline-block;
                 padding:12px 20px;
                 background-color:#008080;
                 color:#fff;
                 border-radius:8px;
                 text-decoration:none;
               ">
              Patvirtinti el. paštą
            </a>
          </p>
          <p>Jei nesikreipėte dėl paskyros kūrimo — ignoruokite šį laišką.</p>
          <p style="margin-top:30px;">Pagarbiai,<br><b>Interjero ir Fasado Dekoratoriai</b></p>
        </div>
      `,
    });


    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error },
      { status: 500 }
    );
  }
}
