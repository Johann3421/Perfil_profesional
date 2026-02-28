import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  nombre: string;
  email: string;
  empresa?: string;
  tipoProyecto: string;
  mensaje: string;
}

const SUBJECT_MAP: Record<string, string> = {
  saas: "💼 Nuevo contacto — Desarrollo SaaS",
  web: "🌐 Nuevo contacto — Sitio Web",
  pos: "🏪 Nuevo contacto — Sistema POS",
  consultoria: "🧠 Nuevo contacto — Consultoría Técnica",
  otro: "📩 Nuevo contacto — Otro proyecto",
};

export async function sendContactEmail(data: ContactEmailData) {
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!to || !from) {
    throw new Error("Faltan variables CONTACT_EMAIL_TO o CONTACT_EMAIL_FROM");
  }

  const subject = SUBJECT_MAP[data.tipoProyecto] || SUBJECT_MAP["otro"];

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <tr>
      <td style="background:#111;border-radius:12px;padding:32px;border:1px solid #222;">
        <h1 style="color:#fff;font-size:20px;margin:0 0 24px 0;padding-bottom:16px;border-bottom:1px solid #333;">
          ${subject}
        </h1>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:8px 0;">
              <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Nombre</span><br>
              <span style="color:#fff;font-size:15px;">${data.nombre}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;">
              <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br>
              <a href="mailto:${data.email}" style="color:#6d9fff;font-size:15px;text-decoration:none;">${data.email}</a>
            </td>
          </tr>
          ${data.empresa ? `
          <tr>
            <td style="padding:8px 0;">
              <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Empresa</span><br>
              <span style="color:#fff;font-size:15px;">${data.empresa}</span>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding:8px 0;">
              <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Tipo de proyecto</span><br>
              <span style="color:#fff;font-size:15px;">${data.tipoProyecto}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 0 0 0;">
              <span style="color:#888;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</span><br>
              <div style="color:#e0e0e0;font-size:15px;line-height:1.6;margin-top:8px;padding:16px;background:#0a0a0a;border-radius:8px;border:1px solid #222;">
                ${data.mensaje.replace(/\n/g, "<br>")}
              </div>
            </td>
          </tr>
        </table>

        <p style="color:#555;font-size:12px;margin:24px 0 0 0;padding-top:16px;border-top:1px solid #222;">
          Mensaje enviado desde el formulario de contacto del portafolio.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const { data: result, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    html,
  });

  if (error) {
    throw new Error(`Error enviando email: ${error.message}`);
  }

  return result;
}
