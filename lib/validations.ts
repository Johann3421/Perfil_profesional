import { z } from "zod";

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),
  email: z
    .string()
    .email("Ingresa un email válido")
    .max(255, "El email no puede superar los 255 caracteres"),
  empresa: z
    .string()
    .max(150, "El nombre de empresa no puede superar los 150 caracteres")
    .optional()
    .or(z.literal("")),
  tipoProyecto: z.enum(["saas", "web", "pos", "consultoria", "otro"], {
    errorMap: () => ({ message: "Selecciona un tipo de proyecto" }),
  }),
  mensaje: z
    .string()
    .min(10, "Describe tu proyecto con al menos 10 caracteres")
    .max(2000, "El mensaje no puede superar los 2000 caracteres"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const PROJECT_TYPES = [
  { value: "saas", label: "Desarrollo SaaS a medida" },
  { value: "web", label: "Sitio web de alto rendimiento" },
  { value: "pos", label: "Sistema POS + Inventarios" },
  { value: "consultoria", label: "Consultoría técnica" },
  { value: "otro", label: "Otro tipo de proyecto" },
] as const;
