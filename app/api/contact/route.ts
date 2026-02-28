import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { sendContactEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    // Parse body
    const body = await request.json();

    // Validate with Zod (single source of truth)
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      return NextResponse.json(
        {
          error: firstError?.message || "Datos inválidos. Revisá el formulario.",
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Rate limiting: check for duplicate email in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const recentMessage = await db.contactMessage.findFirst({
      where: {
        email: data.email,
        createdAt: {
          gte: fiveMinutesAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (recentMessage) {
      return NextResponse.json(
        {
          error:
            "Ya recibimos un mensaje tuyo hace menos de 5 minutos. Esperá un momento antes de enviar otro.",
        },
        { status: 429 }
      );
    }

    // Save to database
    const contactMessage = await db.contactMessage.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        empresa: data.empresa || null,
        tipoProyecto: data.tipoProyecto,
        mensaje: data.mensaje,
      },
    });

    // Send email via Resend
    try {
      await sendContactEmail({
        nombre: data.nombre,
        email: data.email,
        empresa: data.empresa || undefined,
        tipoProyecto: data.tipoProyecto,
        mensaje: data.mensaje,
      });
    } catch (emailError) {
      // Log the error but don't fail the request — the message is saved in DB
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Mensaje enviado correctamente.",
        id: contactMessage.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API:", error);

    return NextResponse.json(
      {
        error:
          "Ocurrió un error interno. Tu mensaje no pudo ser procesado. Intentá de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}
